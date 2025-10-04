const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Apply the middleware to all routes in this file.
// This ensures that only authenticated Admins can access these endpoints.
router.use(protect);
router.use(authorize('Admin'));

// Chained routes for cleaner code
router.route('/')
  .post(createUser)
  .get(getUsers);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;