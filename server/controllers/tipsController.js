// controllers/tipController.js
const Tips = require("../models/tipsModel");

// Get all tips (public)
exports.getTips = async (req, res) => {
  try {
    const tips = await Tips.find().sort({ createdAt: -1 });
    res.json({ success: true, tips });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tips." });
  }
};

// Create a tip (admin only)
exports.createTip = async (req, res) => {
  try {
    const { tip, link } = req.body;
    if (!tip) {
      return res
        .status(400)
        .json({ success: false, message: "Tip text is required." });
    }
    const newTip = new Tips({ tip, link });
    await newTip.save();
    res.status(201).json({ success: true, tip: newTip });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create tip." });
  }
};

// Update a tip
exports.updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { tip, link } = req.body;
    const updatedTip = await Tips.findByIdAndUpdate(
      id,
      { tip, link },
      { new: true, runValidators: true }
    );
    if (!updatedTip) {
      return res
        .status(404)
        .json({ success: false, message: "Tip not found." });
    }
    res.json({ success: true, tip: updatedTip });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update tip." });
  }
};

// Delete a tip
exports.deleteTip = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTip = await Tips.findByIdAndDelete(id);
    if (!deletedTip) {
      return res
        .status(404)
        .json({ success: false, message: "Tip not found." });
    }
    res.json({ success: true, message: "Tip deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete tip." });
  }
};
