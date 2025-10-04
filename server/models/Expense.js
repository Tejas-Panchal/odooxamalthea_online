const mongoose = require('mongoose');

const ApproverSchema = new mongoose.Schema({
  approverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  comment: {
    type: String,
    trim: true,
  },
}, { _id: false }); // _id is not needed for this sub-document

const ExpenseSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
  },
  date: {
    type: Date,
    required: true,
  },
  amount: { // Amount in company's default currency
    type: Number,
    required: [true, 'Please add an amount'],
  },
  originalAmount: { // Amount in the original currency of the expense
    type: Number,
    required: true,
  },
  originalCurrency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  approvalChain: [ApproverSchema],
  currentApproverIndex: {
    type: Number,
    default: 0,
  },
  receiptImageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Expense', ExpenseSchema);