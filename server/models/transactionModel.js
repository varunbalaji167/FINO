// models/transactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      // renamed from note to description
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    goal: {
      // optional reference to Goal
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
    goalContributionAmount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
