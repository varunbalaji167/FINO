// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import toast from "react-hot-toast";
// import { Trash2 } from "lucide-react";

// const BudgetList = ({ onEdit }) => {
//   const { user, logout } = useAuth();
//   const [budgets, setBudgets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = user?.token;
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const fetchBudgets = async () => {
//     if (!token) return logout();

//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}budgets`,
//         config
//       );
//       setBudgets(res.data.budgets);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch budgets");
//       toast.error("Failed to fetch budgets");
//       if (err.response?.status === 401) logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBudgets();
//   }, []);

//   const handleDelete = (budgetId) => {
//     toast(
//       (t) => (
//         <span className="flex flex-col gap-2 text-sm">
//           <span>Are you sure you want to delete this budget?</span>
//           <div className="flex justify-end gap-3 mt-2">
//             <button
//               onClick={() => {
//                 toast.dismiss(t.id); // close toast
//               }}
//               className="px-3 py-1 rounded text-gray-600 hover:text-black"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={async () => {
//                 toast.dismiss(t.id); // close confirmation toast
//                 const deletingId = toast.loading("Deleting budget...");
//                 try {
//                   await axios.delete(
//                     `${import.meta.env.VITE_API_BASE_URL}budgets/${budgetId}`,
//                     config
//                   );
//                   setBudgets((prev) => prev.filter((b) => b._id !== budgetId));
//                   toast.success("Budget deleted", { id: deletingId });
//                 } catch (err) {
//                   toast.error("Failed to delete budget", { id: deletingId });
//                   if (err.response?.status === 401) logout();
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         </span>
//       ),
//       { duration: Infinity, }
//     );
//   };

//   const getProgressPercent = (spent, limit) =>
//     limit ? Math.min(100, Math.round((spent / limit) * 100)) : 0;

//   const getProgressColor = (percent) => {
//     if (percent >= 100) return "#D32D41"; // red
//     if (percent >= 75) return "#FF7043"; // orange
//     return "#2E865F"; // green
//   };

//   if (loading)
//     return (
//       <div className="flex flex-col items-center justify-center mt-10">
//         <svg
//           className="animate-spin h-10 w-10 text-[#007ACC]"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//           ></path>
//         </svg>
//         <p className="mt-4 text-[#003366] font-semibold text-lg">
//           Loading budgets...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <p className="text-center mt-10 text-[#D32D41] font-semibold text-lg">
//         {error}
//       </p>
//     );

//   if (!budgets.length)
//     return (
//       <p className="text-center mt-10 text-[#7E909A] italic font-semibold text-lg">
//         No budgets set yet.
//       </p>
//     );

//   return (
//     <div className="w-full max-w-full space-y-8">
//       {budgets.map((budget) => {
//         const percent = getProgressPercent(budget.spent, budget.limit);
//         const progressColor = getProgressColor(percent);
//         const isOver = percent >= 100;

//         return (
//           <div
//             key={budget._id}
//             className={`p-6 rounded-lg shadow-md border ${
//               isOver
//                 ? "border-[#D32D41] bg-[#FDECEA]"
//                 : "border-[#E0E0E0] bg-[#FFFFFF]"
//             }`}
//           >
//             <div className="flex justify-between items-center mb-5">
//               <h3 className="text-[#003366] text-2xl font-bold">
//                 {budget.category}
//               </h3>
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => {
//                     onEdit(budget);
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }}
//                   className="text-[#007ACC] hover:text-[#66A3FF] font-semibold text-lg transition-colors"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(budget._id)}
//                   className="text-[#D32D41] hover:text-red-500 transition-colors"
//                   title="Delete Budget"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex-1 bg-[#E6F0FF] rounded h-8 overflow-hidden border border-[#B0C4DE]">
//                 <div
//                   className="h-8 rounded"
//                   style={{
//                     width: `${percent}%`,
//                     backgroundColor: progressColor,
//                     transition: "width 0.4s ease",
//                   }}
//                 />
//               </div>
//               <span
//                 className={`text-lg font-semibold ${
//                   isOver
//                     ? "text-[#D32D41]"
//                     : percent >= 75
//                     ? "text-[#FF7043]"
//                     : "text-[#2E865F]"
//                 }`}
//               >
//                 {percent}% (₹
//                 {new Intl.NumberFormat("en-IN").format(budget.spent)} / ₹
//                 {new Intl.NumberFormat("en-IN").format(budget.limit)})
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BudgetList;

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { FaRegLightbulb } from "react-icons/fa";

const BudgetList = ({ onEdit }) => {
  const { user, logout } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = user?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBudgets = async () => {
    if (!token) return logout();

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}budgets`,
        config
      );
      setBudgets(res.data.budgets);
      setError(null);
    } catch (err) {
      setError("Failed to fetch budgets");
      toast.error("Failed to fetch budgets");
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleDelete = (budgetId) => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2 text-sm">
          <span>Are you sure you want to delete this budget?</span>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id); // close toast
              }}
              className="px-3 py-1 rounded text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // close confirmation toast
                const deletingId = toast.loading("Deleting budget...");
                try {
                  await axios.delete(
                    `${import.meta.env.VITE_API_BASE_URL}budgets/${budgetId}`,
                    config
                  );
                  setBudgets((prev) => prev.filter((b) => b._id !== budgetId));
                  toast.success("Budget deleted", { id: deletingId });
                } catch (err) {
                  toast.error("Failed to delete budget", { id: deletingId });
                  if (err.response?.status === 401) logout();
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </span>
      ),
      { duration: Infinity }
    );
  };

  const getProgressPercent = (spent, limit) =>
    limit ? Math.min(100, Math.round((spent / limit) * 100)) : 0;

  const getProgressColor = (percent) => {
    if (percent >= 100) return "#D32D41"; // red
    if (percent >= 75) return "#FF7043"; // orange
    return "#2E865F"; // green
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <svg
          className="animate-spin h-10 w-10 text-[#007ACC]"
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
        <p className="mt-4 text-[#003366] font-semibold text-lg">
          Loading budgets...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-[#D32D41] font-semibold text-lg">
        {error}
      </p>
    );

  if (!budgets.length)
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md text-center mt-10">
        <FaRegLightbulb className="text-yellow-400 text-5xl mb-4 animate-bounce" />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          No budgets set yet!
        </h2>
        <p className="text-sm text-gray-500">
          Budgets help you stay on track.
          <br />
          Set your first budget to start managing your money smarter!
        </p>
      </div>
    );

  return (
    <div className="w-full max-w-full space-y-8">
      {budgets.map((budget) => {
        const percent = getProgressPercent(budget.spent, budget.limit);
        const progressColor = getProgressColor(percent);
        const isOver = percent >= 100;

        return (
          <div
            key={budget._id}
            className={`p-6 rounded-lg shadow-md border ${
              isOver
                ? "border-[#D32D41] bg-[#FDECEA]"
                : "border-[#E0E0E0] bg-[#FFFFFF]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-5">
              <h3 className="text-[#003366] text-2xl font-bold break-words">
                {budget.category}
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    onEdit(budget);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[#007ACC] hover:text-[#66A3FF] font-semibold text-base sm:text-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(budget._id)}
                  className="text-[#D32D41] hover:text-red-500 transition-colors"
                  title="Delete Budget"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="w-full bg-[#F1F5F9] rounded-full h-4 border border-[#CBD5E1] overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: progressColor,
                  }}
                />
              </div>
              <span
                className={`text-sm sm:text-base font-medium sm:font-semibold ${
                  isOver
                    ? "text-[#D32D41]"
                    : percent >= 75
                    ? "text-[#FB923C]"
                    : "text-[#16A34A]"
                }`}
              >
                {percent}% (₹
                {new Intl.NumberFormat("en-IN").format(budget.spent)} / ₹
                {new Intl.NumberFormat("en-IN").format(budget.limit)})
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;
