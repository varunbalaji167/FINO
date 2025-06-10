import { useState, useEffect } from "react";

const expenseCategories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Others",
];
const incomeCategories = [
  "Salary",
  "Investment",
  "Freelance",
  "Gift",
  "Others",
];

const getLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60 * 1000);
  return localTime.toISOString().slice(0, 16);
};

const TransactionForm = ({ goals, onAdd, loading }) => {
  const [formData, setFormData] = useState({
    amount: "",
    displayAmount: "",
    type: "expense",
    category: "",
    description: "",
    date: getLocalDateTime(),
  });

  const [selectedGoal, setSelectedGoal] = useState("");
  const [contributionPercent, setContributionPercent] = useState("");
  const [errors, setErrors] = useState({});

  const categories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (formData.type === "expense") {
      setSelectedGoal("");
      setContributionPercent("");
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  }, [formData.type]);

  const formatIndianCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const handleInpISThange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const rawValue = value.replace(/,/g, "");
      const numeric = parseFloat(rawValue);
      const formatted = isNaN(numeric) ? "" : formatIndianCurrency(rawValue);
      setFormData((prev) => ({
        ...prev,
        amount: rawValue,
        displayAmount: formatted,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleContributionPercentChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) <= 100)) {
      setContributionPercent(value);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.amount) errs.amount = "Amount is required";
    if (!formData.category) errs.category = "Category is required";
    if (!formData.date) errs.date = "Date is required";
    if (
      formData.type === "income" &&
      selectedGoal &&
      (!contributionPercent || Number(contributionPercent) <= 0)
    ) {
      errs.contributionPercent = "Enter a valid goal contribution %";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dateISO = new Date(formData.date).toISOString();
    const amountNum = parseFloat(formData.amount);
    let goalContributionAmount = 0;

    if (formData.type === "income" && selectedGoal) {
      goalContributionAmount = (amountNum * Number(contributionPercent)) / 100;
    }

    const payload = {
      ...formData,
      amount: String(formData.amount),
      date: dateISO,
      ...(formData.type === "income" && selectedGoal
        ? { goalId: selectedGoal, goalContributionAmount, contributionPercent }
        : {}),
    };

    try {
      onAdd(payload);
      handleReset();
    } catch (err) {}
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      displayAmount: "",
      type: "expense",
      category: "",
      description: "",
      date: getLocalDateTime(),
    });
    setSelectedGoal("");
    setContributionPercent("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FFFFFF] p-6 space-y-6 border border-[#E0E0E0] rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#003366] font-semibold mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">₹</span>
            <input
              type="text"
              name="amount"
              placeholder="Enter amount"
              value={formData.displayAmount}
              onChange={handleInpISThange}
              className="pl-7 p-3 w-full border rounded-md text-[#242C34] placeholder-[#B0B0B0] focus:ring-2 focus:ring-[#66A3FF]"
            />
          </div>
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-[#003366] font-semibold mb-2">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInpISThange}
            className="p-3 w-full border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-[#003366] font-semibold mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInpISThange}
            className="p-3 w-full border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-[#003366] font-semibold mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInpISThange}
            className="p-3 w-full border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>
      </div>

      {formData.type === "income" && (
        <>
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Goal (optional)
            </label>
            <select
              name="goalId"
              value={selectedGoal}
              onChange={(e) => {
                setSelectedGoal(e.target.value);
                setContributionPercent("");
                setErrors((prev) => ({ ...prev, contributionPercent: "" }));
              }}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
            >
              <option value="">-- Select Goal --</option>
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.title} (Target: ₹{goal.targetAmount})
                </option>
              ))}
            </select>
          </div>

          {selectedGoal && (
            <div>
              <label className="block text-[#003366] font-semibold mb-2">
                Contribution % to Goal
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={contributionPercent}
                onChange={handleContributionPercentChange}
                placeholder="Contribution %"
                className="w-full p-3 border rounded-md text-[#242C34] placeholder-[#B0B0B0] focus:ring-2 focus:ring-[#66A3FF]"
              />
              {errors.contributionPercent && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contributionPercent}
                </p>
              )}
            </div>
          )}
        </>
      )}

      <div>
        <label className="block text-[#003366] font-semibold mb-2">
          Description (optional)
        </label>
        <textarea
          name="description"
          placeholder="Write a short note (optional)"
          value={formData.description}
          onChange={handleInpISThange}
          className="w-full p-3 border rounded-md text-[#242C34] placeholder-[#B0B0B0] resize-y focus:ring-2 focus:ring-[#66A3FF]"
          rows={3}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 font-semibold rounded-md shadow-md transition-all duration-300 ${
            loading
              ? "bg-[#003366] opacity-60 cursor-not-allowed"
              : "bg-[#003366] hover:bg-[#007ACC] text-white"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? "Saving..." : "Add"}
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto bg-gray-300 text-[#242C34] font-medium py-3 px-6 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
