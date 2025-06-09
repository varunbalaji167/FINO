// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getDashboardStats,
  getIncomeExpenseByPeriod,
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);
// new dashboard stats route
router.get("/dashboard/stats", authMiddleware, getDashboardStats);
// New route for income-expense by period
router.get(
  "/dashboard/income-expense",
  authMiddleware,
  getIncomeExpenseByPeriod
);

module.exports = router;
