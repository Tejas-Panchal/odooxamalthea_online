const mongoose = require('mongoose');

const ApprovalWorkflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the workflow'],
    trim: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  // The sequence of approvers (e.g., [managerId, financeId, directorId])
  approverSequence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isManagerApprovalRequired: {
    type: Boolean,
    default: false,
  },
  // For Conditional Rules
  ruleType: {
    type: String,
    enum: ['None', 'Percentage', 'Specific', 'Hybrid'],
    default: 'None',
  },
  percentageRequired: { // e.g., 60 for 60%
    type: Number,
    min: 1,
    max: 100,
  },
  specificApprover: { // The specific user whose approval is key
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ApprovalWorkflow', ApprovalWorkflowSchema);