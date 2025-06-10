// import { useEffect, useRef } from "react";
// import toast from "react-hot-toast";
// import { Trash2 } from "lucide-react";

// const GoalList = ({ goals, onDelete, loading }) => {
//   const alertedGoals = useRef(new Set());

//   useEffect(() => {
//     for (const goal of goals) {
//       const isCompleted = goal.currentAmount >= goal.targetAmount;
//       const alreadyAlerted = alertedGoals.current.has(goal._id);

//       if (isCompleted && !alreadyAlerted) {
//         alertedGoals.current.add(goal._id);
//         toast.success(`🎉 Goal "${goal.title}" accomplished!`, {
//           id: `goal-${goal._id}`,
//         });
//       }
//     }
//   }, [goals]);

//   const confirmDelete = (goal) => {
//     toast(
//       (t) => (
//         <span className="flex flex-col gap-2">
//           <span>
//             Are you sure you want to delete "<b>{goal.title}</b>"?
//           </span>
//           <div className="flex gap-2 justify-end">
//             <button
//               onClick={() => {
//                 onDelete(goal._id);
//                 toast.dismiss(t.id);
//               }}
//               className="bg-red-600 text-white px-4 py-2 rounded text-sm"
//               disabled={loading}
//             >
//               Confirm
//             </button>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="border px-4 py-2 rounded text-sm"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//           </div>
//         </span>
//       ),
//       { duration: Infinity }
//     );
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "No deadline";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateStr).toLocaleDateString(undefined, options);
//   };

//   const getProgressColor = (percent) => {
//     if (percent >= 100) {
//       return "linear-gradient(90deg, #22c55e, #16a34a)"; // Completed - Green
//     } else if (percent >= 75) {
//       return "linear-gradient(90deg, #facc15, #f59e0b)"; // Amber/Gold
//     } else if (percent >= 50) {
//       return "linear-gradient(90deg, #0ea5e9, #0284c7)"; // Sky Blue
//     } else if (percent >= 25) {
//       return "linear-gradient(90deg, #38bdf8, #60a5fa)"; // Light Blue
//     } else {
//       return "linear-gradient(90deg, #cbd5e1, #94a3b8)"; // Soft Gray/Blue
//     }
//   };

//   return (
//     <div className="relative" role="list">
//       {loading && (
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 overflow-hidden rounded-t">
//           <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 animate-[loadingBar_2s_linear_infinite]" />
//           <style>{`
//             @keyframes loadingBar {
//               0% { transform: translateX(-100%); }
//               100% { transform: translateX(100%); }
//             }
//           `}</style>
//         </div>
//       )}

//       <div className={`${loading ? "pt-2" : ""} space-y-6`}>
//         {goals.length === 0 && (
//           <p className="text-gray-500 italic text-center">No goals found.</p>
//         )}

//         {goals.map((goal) => {
//           const percentage = Math.min(
//             (goal.currentAmount / goal.targetAmount) * 100,
//             100
//           );
//           const isCompleted = percentage >= 100;
//           const progressColor = getProgressColor(percentage);

//           return (
//             <div
//               key={goal._id}
//               className={`relative p-6 border rounded-lg shadow-lg bg-white transition-transform duration-300 ${
//                 isCompleted
//                   ? "ring-2 ring-green-500 scale-105"
//                   : "hover:scale-105"
//               }`}
//               role="listitem"
//             >
//               {/* Delete Button */}
//               <button
//                 onClick={() => confirmDelete(goal)}
//                 className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Delete Goal"
//                 disabled={loading}
//               >
//                 <Trash2 size={18} />
//               </button>

//               {/* Goal Title and Status */}
//               <div className="flex items-center justify-between mb-1 pr-6">
//                 <h4
//                   className={`font-semibold text-lg ${
//                     isCompleted ? "text-green-700" : "text-blue-800"
//                   }`}
//                 >
//                   {goal.title}
//                 </h4>
//                 {isCompleted && (
//                   <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded-full select-none">
//                     🎉 Completed
//                   </span>
//                 )}
//               </div>

//               {/* Deadline and Amounts */}
//               <p className="text-sm text-gray-600 mb-1">
//                 Deadline:{" "}
//                 <span className="font-medium text-blue-800">
//                   {formatDate(goal.deadline)}
//                 </span>
//               </p>

//               <p className="text-sm text-gray-600 mb-2">
//                 Target: ₹{goal.targetAmount.toLocaleString("en-IN")}, Saved: ₹
//                 {goal.currentAmount.toLocaleString("en-IN")}
//               </p>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 rounded-xl h-6 overflow-hidden">
//                 <div
//                   className="h-6 rounded-xl transition-all duration-700 ease-in-out"
//                   style={{
//                     width: `${percentage}%`,
//                     background: progressColor,
//                   }}
//                 />
//               </div>

//               {/* Percentage */}
//               <p
//                 className={`text-sm text-right mt-2 font-medium ${
//                   isCompleted ? "text-green-700" : "text-gray-600"
//                 }`}
//               >
//                 {Math.round(percentage)}%
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GoalList;

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { FaBullseye } from "react-icons/fa";

const GoalList = ({ goals, onDelete, loading }) => {
  const alertedGoals = useRef(new Set());

  useEffect(() => {
    for (const goal of goals) {
      const isCompleted = goal.currentAmount >= goal.targetAmount;
      const alreadyAlerted = alertedGoals.current.has(goal._id);

      if (isCompleted && !alreadyAlerted) {
        alertedGoals.current.add(goal._id);
        toast.success(`🎉 Goal "${goal.title}" accomplished!`, {
          id: `goal-${goal._id}`,
        });
      }
    }
  }, [goals]);

  const confirmDelete = (goal) => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          <span>
            Are you sure you want to delete "<b>{goal.title}</b>"?
          </span>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                onDelete(goal._id);
                toast.dismiss(t.id);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm"
              disabled={loading}
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="border px-4 py-2 rounded text-sm"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: Infinity }
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No deadline";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getProgressColor = (percent) => {
    if (percent >= 100) {
      return "linear-gradient(90deg, #22c55e, #16a34a)"; // Completed - Green
    } else if (percent >= 75) {
      return "linear-gradient(90deg, #facc15, #f59e0b)"; // Amber/Gold
    } else if (percent >= 50) {
      return "linear-gradient(90deg, #0ea5e9, #0284c7)"; // Sky Blue
    } else if (percent >= 25) {
      return "linear-gradient(90deg, #38bdf8, #60a5fa)"; // Light Blue
    } else {
      return "linear-gradient(90deg, #cbd5e1, #94a3b8)"; // Soft Gray/Blue
    }
  };

  return (
    <div className="relative" role="list">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 overflow-hidden rounded-t">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 animate-[loadingBar_2s_linear_infinite]" />
          <style>{`
            @keyframes loadingBar {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      <div className={`${loading ? "pt-2" : ""} space-y-6`}>
        {goals.length === 0 && !loading && (
          <div className="text-center flex flex-col items-center gap-4 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <FaBullseye className="text-5xl text-blue-500" />
            <h2 className="text-xl font-semibold text-blue-700">
              Set your first goal!
            </h2>
            <p className="text-sm text-gray-600 max-w-md">
              Every journey starts with a single step. Start tracking your goals
              today and take control of your financial future.
            </p>
          </div>
        )}

        {goals.map((goal) => {
          const percentage = Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100
          );
          const isCompleted = percentage >= 100;
          const progressColor = getProgressColor(percentage);

          return (
            <div
              key={goal._id}
              className={`relative p-6 border rounded-lg shadow-lg bg-white transition-transform duration-300 ${
                isCompleted
                  ? "ring-2 ring-green-500 scale-105"
                  : "hover:scale-105"
              }`}
              role="listitem"
            >
              {/* Delete Button */}
              <button
                onClick={() => confirmDelete(goal)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Goal"
                disabled={loading}
              >
                <Trash2 size={18} />
              </button>

              {/* Goal Title and Status */}
              <div className="flex items-center justify-between mb-1 pr-6">
                <h4
                  className={`font-semibold text-lg ${
                    isCompleted ? "text-green-700" : "text-blue-800"
                  }`}
                >
                  {goal.title}
                </h4>
                {isCompleted && (
                  <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded-full select-none">
                    🎉 Completed
                  </span>
                )}
              </div>

              {/* Deadline and Amounts */}
              <p className="text-sm text-gray-600 mb-1">
                Deadline:{" "}
                <span className="font-medium text-blue-800">
                  {formatDate(goal.deadline)}
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-2">
                Target: ₹{goal.targetAmount.toLocaleString("en-IN")}, Saved: ₹
                {goal.currentAmount.toLocaleString("en-IN")}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-xl h-6 overflow-hidden">
                <div
                  className="h-6 rounded-xl transition-all duration-700 ease-in-out"
                  style={{
                    width: `${percentage}%`,
                    background: progressColor,
                  }}
                />
              </div>

              {/* Percentage */}
              <p
                className={`text-sm text-right mt-2 font-medium ${
                  isCompleted ? "text-green-700" : "text-gray-600"
                }`}
              >
                {Math.round(percentage)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalList;
