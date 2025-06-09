// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// const categories = [
//   "Food",
//   "Transportation",
//   "Entertainment",
//   "Utilities",
//   "Others",
// ];

// const BudgetForm = ({ onBudgetSaved, editingBudget }) => {
//   const { user, logout } = useAuth();
//   const [formData, setFormData] = useState({
//     category: "",
//     limit: "",
//     period: "monthly",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const token = user?.token;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   useEffect(() => {
//     if (editingBudget) {
//       setFormData({
//         category: editingBudget.category,
//         limit: editingBudget.limit,
//         period: editingBudget.period,
//       });
//     }
//   }, [editingBudget]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!formData.category || !formData.limit) {
//       setError("Category and limit are required");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (!token) return logout();

//       const baseUrl = `${import.meta.env.VITE_API_BASE_URL}budgets`;
//       const url = editingBudget ? `${baseUrl}/${editingBudget._id}` : baseUrl;
//       const method = editingBudget ? "put" : "post";

//       await axios[method](url, formData, config);

//       onBudgetSaved(); // refresh list
//       setFormData({ category: "", limit: "", period: "monthly" });
//     } catch (err) {
//       setError("Failed to save budget");
//       if (err.response?.status === 401) logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mb-6">
//       <h2 className="text-xl font-semibold mb-4">
//         {editingBudget ? "Edit Budget" : "Add Budget"}
//       </h2>
//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <label className="block mb-2">
//         Category
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mt-1"
//           required
//           disabled={!!editingBudget}
//         >
//           <option value="">Select category</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="block mb-2">
//         Limit ($)
//         <input
//           type="number"
//           name="limit"
//           value={formData.limit}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mt-1"
//           min="1"
//           required
//         />
//       </label>

//       <label className="block mb-4">
//         Period
//         <select
//           name="period"
//           value={formData.period}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mt-1"
//         >
//           <option value="monthly">Monthly</option>
//           <option value="weekly">Weekly</option>
//         </select>
//       </label>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Saving..." : editingBudget ? "Update Budget" : "Add Budget"}
//       </button>
//     </form>
//   );
// };

// export default BudgetForm;

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Others",
];

const BudgetForm = ({ onBudgetSaved, editingBudget }) => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    period: "monthly",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = user?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (editingBudget) {
      setFormData({
        category: editingBudget.category,
        limit: editingBudget.limit,
        period: editingBudget.period,
      });
      setError(null);
    }
  }, [editingBudget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.category || !formData.limit) {
      setError("Category and limit are required");
      setLoading(false);
      return;
    }

    try {
      if (!token) return logout();

      const baseUrl = `${import.meta.env.VITE_API_BASE_URL}budgets`;
      const url = editingBudget ? `${baseUrl}/${editingBudget._id}` : baseUrl;
      const method = editingBudget ? "put" : "post";

      await axios[method](url, formData, config);
      toast.success(editingBudget ? "Budget updated" : "Budget added");

      onBudgetSaved(); // refresh list
      setFormData({ category: "", limit: "", period: "monthly" });
    } catch (err) {
      setError("Failed to save budget");
      toast.error("Failed to save budget");
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      category: "",
      limit: "",
      period: "monthly",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] p-6 space-y-6 border border-[#E0E0E0] rounded-lg"
      >
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={!!editingBudget}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Limit */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Limit (₹)
            </label>
            <input
              type="text"
              name="limitFormatted"
              inputMode="numeric"
              value={
                formData.limit
                  ? new Intl.NumberFormat("en-IN").format(
                      Number(formData.limit)
                    )
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(rawValue)) {
                  setFormData((prev) => ({ ...prev, limit: rawValue }));
                }
              }}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
              placeholder="Enter limit"
              required
            />
          </div>

          {/* Period */}
          <div>
            <label className="block text-[#003366] font-semibold mb-2">
              Period
            </label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full p-3 border rounded-md text-[#242C34] focus:ring-2 focus:ring-[#66A3FF]"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex gap-4">
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
            {editingBudget
              ? loading
                ? "Updating..."
                : "Update"
              : loading
              ? "Saving..."
              : "Add"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-[#242C34] font-medium py-3 px-6 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default BudgetForm;
