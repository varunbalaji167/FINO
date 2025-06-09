const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  setBudget,
  getBudgetsWithUsage,
  updateBudgetById,
  deleteBudgetById,
} = require("../controllers/budgetController");
router.use(authMiddleware);

router.post("/", authMiddleware, setBudget);
router.put("/:id", authMiddleware, updateBudgetById);
router.get("/", authMiddleware, getBudgetsWithUsage);
router.delete("/:id", authMiddleware, deleteBudgetById);

module.exports = router;
