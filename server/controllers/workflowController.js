const ApprovalWorkflow = require('../models/ApprovalWorkflow');
const User = require('../models/User');

// @desc    Create a new approval workflow
// @route   POST /api/workflows
// @access  Private/Admin
exports.createWorkflow = async (req, res) => {
  const {
    name,
    approverSequence, // Expecting an array of User IDs
    isManagerApprovalRequired,
    ruleType,
    percentageRequired,
    specificApprover,
  } = req.body;

  // Assumes req.user is populated by auth middleware (Step 5)
  const adminId = req.user.id;

  try {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'Admin') {
      return res.status(403).json({ msg: 'User not authorized to perform this action' });
    }

    const newWorkflow = new ApprovalWorkflow({
      name,
      company: admin.company, // Associate workflow with the Admin's company
      approverSequence,
      isManagerApprovalRequired,
      ruleType,
      percentageRequired: ruleType === 'Percentage' || ruleType === 'Hybrid' ? percentageRequired : null,
      specificApprover: ruleType === 'Specific' || ruleType === 'Hybrid' ? specificApprover : null,
    });

    const workflow = await newWorkflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all approval workflows for the company
// @route   GET /api/workflows
// @access  Private/Admin
exports.getWorkflows = async (req, res) => {
  const adminId = req.user.id; // From auth middleware

  try {
    const admin = await User.findById(adminId);
    const workflows = await ApprovalWorkflow.find({ company: admin.company }).populate('approverSequence specificApprover', 'name email');
    
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update an approval workflow
// @route   PUT /api/workflows/:id
// @access  Private/Admin
exports.updateWorkflow = async (req, res) => {
  const workflowId = req.params.id;
  const adminId = req.user.id; // From auth middleware

  try {
    const admin = await User.findById(adminId);
    let workflow = await ApprovalWorkflow.findById(workflowId);

    if (!workflow) {
      return res.status(404).json({ msg: 'Workflow not found' });
    }

    // Ensure the admin belongs to the same company as the workflow
    if (workflow.company.toString() !== admin.company.toString()) {
      return res.status(403).json({ msg: 'Not authorized to update this workflow' });
    }

    // Update the workflow with new data from req.body
    workflow = await ApprovalWorkflow.findByIdAndUpdate(workflowId, req.body, {
      new: true, // Return the updated document
      runValidators: true,
    });

    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete an approval workflow
// @route   DELETE /api/workflows/:id
// @access  Private/Admin
exports.deleteWorkflow = async (req, res) => {
  const workflowId = req.params.id;
  const adminId = req.user.id; // From auth middleware

  try {
    const admin = await User.findById(adminId);
    const workflow = await ApprovalWorkflow.findById(workflowId);

    if (!workflow) {
      return res.status(404).json({ msg: 'Workflow not found' });
    }

    // Ensure the admin belongs to the same company as the workflow
    if (workflow.company.toString() !== admin.company.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this workflow' });
    }
    
    await workflow.remove();

    res.status(200).json({ msg: 'Workflow removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};