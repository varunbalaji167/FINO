const express = require("express");
const router = express.Router();
const { createGoal, getGoals, updateGoalProgress, deleteGoalById } = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createGoal);
router.get("/", authMiddleware, getGoals);
router.put("/progress", authMiddleware, updateGoalProgress);
router.delete("/:id", authMiddleware, deleteGoalById);

module.exports = router;