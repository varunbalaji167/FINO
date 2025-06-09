const Budget = require("../models/budgetModel");
const Transaction = require("../models/transactionModel");

exports.setBudget = async (req, res) => {
  try {
    const { category, limit, period } = req.body;

    const existing = await Budget.findOne({ user: req.user._id, category });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Budget for this category already exists." });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
      period,
    });

    res.status(201).json({ message: "Budget created", budget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create budget", error: error.message });
  }
};

exports.updateBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit, period } = req.body;

    const budget = await Budget.findOne({ _id: id, user: req.user._id });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    budget.limit = limit;
    budget.period = period;

    const updated = await budget.save();
    res.status(200).json({ message: "Budget updated", budget: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update budget", error: error.message });
  }
};

exports.getBudgetsWithUsage = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });

    const data = await Promise.all(
      budgets.map(async (budget) => {
        const start = new Date();
        if (budget.period === "monthly") start.setDate(1); // first of the month
        else if (budget.period === "weekly")
          start.setDate(start.getDate() - start.getDay());

        const totalSpent = await Transaction.aggregate([
          {
            $match: {
              user: req.user._id,
              type: "expense",
              category: budget.category,
              date: { $gte: start },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        return {
          ...budget.toObject(),
          spent: totalSpent[0]?.total || 0,
        };
      })
    );

    res.status(200).json({ budgets: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch budgets", error: error.message });
  }
};

exports.deleteBudgetById = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete budget", error: error.message });
  }
};
