// import  { useEffect } from "react";

// const GoalList = ({ goals }) => {
//   useEffect(() => {
//     // Show toast alerts for any completed goals
//     goals.forEach((goal) => {
//       if (goal.currentAmount >= goal.targetAmount) {
//        // toast.success(`🎉 Goal "${goal.title}" accomplished!`);
//       }
//     });
//   }, [goals]);

//   const getProgressColor = (percentage) => {
//     if (percentage >= 100) return "bg-green-600";
//     if (percentage >= 75) return "bg-yellow-400";
//     if (percentage >= 40) return "bg-blue-500";
//     return "bg-red-500";
//   };

//   return (
//     <div className="space-y-6">
//       {goals.length === 0 && (
//         <p className="text-gray-500 italic text-center">No goals found.</p>
//       )}

//       {goals.map((goal) => {
//         const percentage = Math.min(
//           (goal.currentAmount / goal.targetAmount) * 100,
//           100
//         );

//         const isCompleted = percentage >= 100;

//         return (
//           <div
//             key={goal._id}
//             className={`p-6 border rounded shadow bg-white transition-transform duration-300 ${
//               isCompleted ? "ring-4 ring-green-400 scale-105" : "hover:scale-105"
//             }`}
//             role="listitem"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4
//                 className={`font-semibold text-lg ${
//                   isCompleted ? "text-green-700" : ""
//                 }`}
//               >
//                 {goal.title}
//               </h4>
//               {isCompleted && (
//                 <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded-full select-none">
//                   🎉 Completed
//                 </span>
//               )}
//             </div>
//             <p className="text-sm text-gray-600 mb-2">
//               Target: ${goal.targetAmount.toLocaleString("en-IN")}, Saved: $
//               {goal.currentAmount.toLocaleString("en-IN")}
//             </p>
//             <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//               <div
//                 className={`${getProgressColor(
//                   percentage
//                 )} h-4 rounded transition-all duration-500 ease-in-out`}
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>
//             <p
//               className={`text-sm text-right mt-1 ${
//                 isCompleted ? "text-green-700 font-semibold" : "text-gray-500"
//               }`}
//             >
//               {Math.round(percentage)}%
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GoalList;

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

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
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              disabled={loading}
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="border px-3 py-1 rounded text-sm"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No deadline";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative" role="list">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-[#66A3FF] overflow-hidden rounded-t">
          <div className="h-1 bg-[#007ACC] animate-[loadingBar_2s_linear_infinite]" />
          <style>{`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        </div>
      )}

      <div className={`${loading ? "pt-2" : ""} space-y-6`}>
        {goals.length === 0 && (
          <p className="text-[#7E909A] italic text-center">No goals found.</p>
        )}

        {goals.map((goal) => {
          const percentage = Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100
          );
          const isCompleted = percentage >= 100;

          const progressColor = isCompleted
            ? "#16A34A"
            : `rgba(0, 122, 204, ${percentage / 100})`;

          return (
            <div
              key={goal._id}
              className={`relative p-6 border rounded shadow bg-white transition-transform duration-300 ${
                isCompleted
                  ? "ring-2 ring-green-400 scale-105"
                  : "hover:scale-105"
              }`}
              role="listitem"
            >
              <button
                onClick={() => confirmDelete(goal)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Goal"
                disabled={loading}
              >
                <Trash2 size={18} />
              </button>

              <div className="flex items-center justify-between mb-1 pr-6">
                <h4
                  className={`font-semibold text-lg ${
                    isCompleted ? "text-green-700" : "text-[#003366]"
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

              <p className="text-sm text-[#4A6572] mb-1">
                Deadline:{" "}
                <span className="font-medium text-[#003366]">
                  {formatDate(goal.deadline)}
                </span>
              </p>

              <p className="text-sm text-[#4A6572] mb-2">
                Target: ₹{goal.targetAmount.toLocaleString("en-IN")}, Saved: ₹
                {goal.currentAmount.toLocaleString("en-IN")}
              </p>

              <div className="w-full bg-[#E6F0FF] rounded h-5 overflow-hidden">
                <div
                  className="h-5 rounded transition-all duration-700 ease-in-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: progressColor,
                  }}
                />
              </div>
              <p
                className={`text-sm text-right mt-1 ${
                  isCompleted
                    ? "text-green-700 font-semibold"
                    : "text-[#7E909A]"
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
