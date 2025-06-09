const Goal = require("../models/goalModel");
const Transaction = require("../models/transactionModel");

exports.createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, user: req.user._id });
    res.status(201).json({ goal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create goal", error: error.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json({ goals });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch goals", error: error.message });
  }
};

exports.updateGoalProgress = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });

    const updates = await Promise.all(
      goals.map(async (goal) => {
        const spent = await Transaction.aggregate([
          {
            $match: {
              user: req.user._id,
              type: "income",
              goal: goal._id,
              date: { $lte: new Date() },
            },
          },
          {
            $group: { _id: null, total: { $sum: "$goalContributionAmount" } },
          },
        ]);

        const currentAmount = spent[0]?.total || 0;
        goal.currentAmount = currentAmount;
        await goal.save();
        return goal;
      })
    );

    res.status(200).json({ goals: updates });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update progress", error: error.message });
  }
};

exports.deleteGoalById = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({ _id: id, user: req.user._id });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete goal", error: error.message });
  }
};
