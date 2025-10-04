const Expense = require('../models/Expense');
const User = require('../models/User');
const ApprovalWorkflow = require('../models/ApprovalWorkflow');
const Company = require('../models/Company');
const { convertCurrency } = require('../utils/currencyUtils');
const { parseReceipt } = require('../utils/ocrService');

// @desc    Submit a new expense claim
// @route   POST /api/expenses
// @access  Private/Employee
exports.submitExpense = async (req, res) => {
  const { description, category, date, originalAmount, originalCurrency } = req.body;
  const submittedBy = req.user.id;

  try {
    const user = await User.findById(submittedBy).populate('company');
    if (!user || !user.company) {
      return res.status(404).json({ msg: 'User or company not found' });
    }
    
    const companyDefaultCurrency = user.company.defaultCurrency;
    let amountInDefaultCurrency;

    // --- Currency Conversion Logic ---
    if (originalCurrency.toUpperCase() !== companyDefaultCurrency.toUpperCase()) {
      // If currencies are different, perform conversion
      amountInDefaultCurrency = await convertCurrency(originalCurrency, companyDefaultCurrency, originalAmount);
    } else {
      // If currencies are the same, no conversion needed
      amountInDefaultCurrency = originalAmount;
    }

    // --- Build Approval Chain (as before) ---
    console.log('Building approval chain for user:', user.name, 'Manager ID:', user.manager);
    const approvalChain = [];
    if (user.manager) {
      approvalChain.push({ approverId: user.manager });
      console.log('Added manager to approval chain:', user.manager);
    } else {
      console.log('No manager found for user, approval chain will be empty');
      // For testing: if no manager, add the current user as approver (self-approval)
      // Remove this in production!
      if (user.role === 'Manager' || user.role === 'Admin') {
        approvalChain.push({ approverId: user._id });
        console.log('Added self as approver for testing:', user._id);
      }
    }
    
    console.log('Final approval chain:', approvalChain);
    console.log('Current approver index will be:', approvalChain.length > 0 ? 0 : -1);
    
    const newExpense = new Expense({
      submittedBy,
      company: user.company._id,
      description,
      category,
      date,
      amount: amountInDefaultCurrency, // Use the converted amount
      originalAmount,
      originalCurrency,
      approvalChain,
      currentApproverIndex: approvalChain.length > 0 ? 0 : -1,
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all expenses submitted by the logged-in user
// @route   GET /api/expenses/my-expenses
// @access  Private/Employee
exports.getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ submittedBy: req.user.id })
      .populate('approvalChain.approverId', 'name')
      .sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get expenses pending approval for the logged-in manager
// @route   GET /api/expenses/pending-approval
// @access  Private/Manager
exports.getPendingApprovals = async (req, res) => {
    try {
        console.log('Getting pending approvals for user:', req.user.id);
        console.log('User role:', req.user.role);
        
        // Find all pending expenses first for debugging
        const allPendingExpenses = await Expense.find({ status: 'Pending' })
            .populate('submittedBy', 'name email')
            .populate('approvalChain.approverId', 'name email role');
        
        console.log('Total pending expenses found:', allPendingExpenses.length);
        
        // Filter expenses where the current user is the designated current approver
        const expenses = allPendingExpenses.filter(expense => {
            console.log(`Checking expense ${expense._id}:`);
            console.log(`  - Current approver index: ${expense.currentApproverIndex}`);
            console.log(`  - Approval chain length: ${expense.approvalChain.length}`);
            
            if (expense.currentApproverIndex >= 0 && expense.currentApproverIndex < expense.approvalChain.length) {
                const currentApprover = expense.approvalChain[expense.currentApproverIndex];
                console.log(`  - Current approver ID: ${currentApprover.approverId._id}`);
                console.log(`  - Logged in user ID: ${req.user.id}`);
                
                const isMatch = currentApprover.approverId._id.toString() === req.user.id.toString();
                console.log(`  - Is match: ${isMatch}`);
                return isMatch;
            } else {
                console.log(`  - No valid current approver (index: ${expense.currentApproverIndex})`);
                return false;
            }
        });
        
        console.log(`Found ${expenses.length} expenses pending approval for this user`);
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error in getPendingApprovals:', error);
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all company expenses
// @route   GET /api/expenses/company
// @access  Private/Admin
exports.getCompanyExpenses = async (req, res) => {
    try {
        const admin = await User.findById(req.user.id);
        const expenses = await Expense.find({ company: admin.company })
            .populate('submittedBy', 'name email')
            .populate('approvalChain.approverId', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// @desc    Approve an expense claim
// @route   PUT /api/expenses/:id/approve
// @access  Private/Manager or Admin
exports.approveExpense = async (req, res) => {
    await updateExpenseStatus(req, res, 'Approved');
};

// @desc    Reject an expense claim
// @route   PUT /api/expenses/:id/reject
// @access  Private/Manager or Admin
exports.rejectExpense = async (req, res) => {
    await updateExpenseStatus(req, res, 'Rejected');
};

// --- Helper function to avoid code duplication for approve/reject ---
const updateExpenseStatus = async (req, res, newStatus) => {
    const { comment } = req.body;
    
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        if (expense.status !== 'Pending') {
            return res.status(400).json({ msg: `Expense is already ${expense.status}` });
        }

        const approverIndex = expense.currentApproverIndex;
        const currentApprover = expense.approvalChain[approverIndex];

        // Verify if the logged-in user is the current approver
        if (currentApprover.approverId.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to action this expense' });
        }

        // Update the current approver's action
        currentApprover.status = newStatus;
        currentApprover.comment = comment;

        if (newStatus === 'Rejected') {
            // If rejected, the entire expense is rejected immediately
            expense.status = 'Rejected';
        } else { // newStatus is 'Approved'
            const nextIndex = approverIndex + 1;
            if (nextIndex < expense.approvalChain.length) {
                // Move to the next approver
                expense.currentApproverIndex = nextIndex;
            } else {
                // This was the final approver, so the expense is fully approved
                expense.status = 'Approved';
            }
        }

        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Scan a receipt and return extracted data
// @route   POST /api/expenses/scan-receipt
exports.scanReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a file' });
    }
    // The file path is available from multer
    const filePath = req.file.path;

    const extractedData = await parseReceipt(filePath);

    // You might want to delete the file from the server after parsing
    // const fs = require('fs');
    // fs.unlinkSync(filePath);

    res.status(200).json(extractedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};