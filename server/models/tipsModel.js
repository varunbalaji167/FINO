// models/Tip.js
const mongoose = require("mongoose");

const tipsSchema = new mongoose.Schema({
  tip: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tips", tipsSchema);
