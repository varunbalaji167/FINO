// import React from "react";

// const GoalForm = ({ formData, setFormData, onCreate, loading }) => {
//   const handleInpISThange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <form
//       onSubmit={onCreate}
//       className="space-y-4 mb-6 bg-white p-4 rounded shadow"
//     >
//       <input
//         name="title"
//         placeholder="Goal title"
//         value={formData.title}
//         onChange={handleInpISThange}
//         className="w-full p-2 border rounded"
//         required
//       />
//       <input
//         name="targetAmount"
//         type="number"
//         placeholder="Target amount"
//         value={formData.targetAmount}
//         onChange={handleInpISThange}
//         className="w-full p-2 border rounded"
//         required
//         min="0"
//         step="0.01"
//       />
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleInpISThange}
//         className="w-full p-2 border rounded"
//       >
//         <option value="Savings">Savings</option>
//         <option value="Investment">Investment</option>
//         <option value="Others">Others</option>
//       </select>
//       <input
//         name="deadline"
//         type="date"
//         value={formData.deadline}
//         onChange={handleInpISThange}
//         className="w-full p-2 border rounded"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white py-2 px-4 rounded"
//         disabled={loading}
//       >
//         {loading ? "Creating..." : "Create Goal"}
//       </button>
//     </form>
//   );
// };

// export default GoalForm;

// GoalForm.jsx
import { useEffect, useState } from "react";

const GoalForm = ({
  formData,
  setFormData,
  onCreate,
  loading,
  error,
  onCancel,
}) => {
  const handleInpISThange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTargetAmountChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!isNaN(raw)) {
      setFormData((prev) => ({
        ...prev,
        targetAmount: raw,
      }));
    }
  };
  return (
    <>
      <form
        onSubmit={onCreate}
        className="bg-white p-6 space-y-6 border border-[#E0E0E0] rounded-lg "
      >
        {/* Error message */}
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-[#003366] font-semibold mb-2">
              Title
            </label>
            <input
              name="title"
              placeholder="House"
              value={formData.title}
              onChange={handleInpISThange}
              required
              disabled={loading}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Target Amount (₹)
            </label>
            <input
              name="targetAmount"
              type="text"
              placeholder="5,00,000"
              value={new Intl.NumberFormat("en-IN").format(
                formData.targetAmount || 0
              )}
              onChange={handleTargetAmountChange}
              required
              disabled={loading}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInpISThange}
              required
              disabled={loading}
              className="w-full p-3 border rounded-md text-[#242C34] bg-white focus:ring-2 focus:ring-[#66A3FF]"
            >
              <option value="">Select category</option>
              <option value="Savings">Savings</option>
              <option value="Investment">Investment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Deadline
            </label>
            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleInpISThange}
              disabled={loading}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#003366] text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-[#007ACC] disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Creating" : "Create"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="bg-gray-300 text-[#242C34] font-medium py-3 px-6 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default GoalForm;
