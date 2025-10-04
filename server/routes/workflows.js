const express = require('express');
const router = express.Router();
const {
  createWorkflow,
  getWorkflows,
  updateWorkflow,
  deleteWorkflow,
} = require('../controllers/workflowController');

router.post('/', createWorkflow);
router.get('/', getWorkflows);
router.put('/:id', updateWorkflow);
router.delete('/:id', deleteWorkflow);

module.exports = router;