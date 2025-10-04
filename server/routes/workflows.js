const express = require('express');
const router = express.Router();
const {
  createWorkflow,
  getWorkflows,
  updateWorkflow,
  deleteWorkflow,
} = require('../controllers/workflowController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all workflow routes: authenticated Admins only
router.use(protect);
router.use(authorize('Admin'));

router.post('/', createWorkflow);
router.get('/', getWorkflows);
router.put('/:id', updateWorkflow);
router.delete('/:id', deleteWorkflow);

module.exports = router;