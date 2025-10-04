const express = require("express");
const multer = require('multer');
const router = express.Router();
const {
  submitExpense,
  getMyExpenses,
  getPendingApprovals,
  getCompanyExpenses,
  approveExpense,
  rejectExpense,
  scanReceipt,
} = require("../controllers/expenseController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = multer({ dest: 'uploads/' });

router.use(protect);

// Debug endpoint to check current user
router.get('/debug/user', (req, res) => {
  res.json({
    user: req.user,
    userId: req.user.id,
    userRole: req.user.role
  });
});

router.route("/").post(submitExpense);
router.route("/my-expenses").get(authorize("Manager", "Admin"), getMyExpenses);
router.route("/pending-approval").get(authorize("Manager", "Admin"), getPendingApprovals);
router.route("/company").get(authorize("Manager", "Admin"), getCompanyExpenses);
router.route("/:id/approve").put(authorize("Manager", "Admin"), approveExpense);
router.route("/:id/reject").put(authorize("Manager", "Admin"), rejectExpense);
router.post('/scan-receipt', upload.single('receipt'), scanReceipt);

module.exports = router;
