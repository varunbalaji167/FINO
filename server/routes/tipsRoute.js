// routes/tipRoutes.js
const express = require("express");
const router = express.Router();
const {
  getTips,
  createTip,
  updateTip,
  deleteTip,
} = require("../controllers/tipsController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route to fetch tips
router.get("/", getTips);

// Admin routes
router.post("/", authMiddleware, createTip);
router.put("/:id", authMiddleware, updateTip);
router.delete("/:id", authMiddleware, deleteTip);

module.exports = router;
