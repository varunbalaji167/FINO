// import { Trash2 } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const TRANSACTIONS_PER_PAGE = 5;

// const TransactionList = ({ transactions, goals, onDelete, loading }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
//   const paginatedTransactions = transactions.slice(
//     (currentPage - 1) * TRANSACTIONS_PER_PAGE,
//     currentPage * TRANSACTIONS_PER_PAGE
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   // Show confirmation toast before deleting
//   const confirmDelete = (id) => {
//     toast(
//       (t) => (
//         <div className="flex flex-col gap-2">
//           <span>Are you sure you want to delete this transaction?</span>
//           <div className="flex justify-end gap-2">
//             <button
//               className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               onClick={() => {
//                 onDelete(id);
//                 toast.dismiss(t.id);
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         duration: Infinity,
//         position: "top-center",
//       }
//     );
//   };

//   return (
//     <div className="relative">
//       {loading && (
//         <div className="absolute top-0 left-0 w-full h-1 bg-[#66A3FF] overflow-hidden">
//           <div className="h-1 bg-[#007ACC] animate-[loadingBar_2s_linear_infinite]" />
//           <style>{`
//             @keyframes loadingBar {
//               0% { transform: translateX(-100%); }
//               100% { transform: translateX(100%); }
//             }
//           `}</style>
//         </div>
//       )}

//       <div className={`${loading ? "pt-2" : ""} space-y-4`}>
//         {transactions.length === 0 ? (
//           <p className="text-[#7E909A] text-center italic">
//             No transactions yet.
//           </p>
//         ) : (
//           paginatedTransactions.map((tx) => {
//             // Find the goal by tx.goal (or adjust field as needed)
//             const goalObj = goals.find((g) => g._id === tx.goal);

//             // Calculate contribution percent if data available
//             const contribPercent =
//               tx.goalContributionAmount && tx.amount
//                 ? ((tx.goalContributionAmount / tx.amount) * 100).toFixed(2)
//                 : null;

//             return (
//               <div
//                 key={tx._id}
//                 className="flex justify-between items-center bg-[#FFFFFF] p-5 rounded-lg shadow-md border border-[#E0E0E0] hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="max-w-[75%]">
//                   <p className="text-[#003366] font-semibold text-lg mb-1">
//                     ₹{tx.amount.toLocaleString("en-IN")}{" "}
//                     <span
//                       className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
//                         tx.type === "expense"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
//                     </span>
//                   </p>
//                   <p className="text-[#4A6572] text-sm font-medium">
//                     {tx.category}
//                   </p>
//                   {tx.description && (
//                     <p className="text-[#7E909A] text-sm mt-1 truncate">
//                       {tx.description}
//                     </p>
//                   )}
//                   <p className="text-[#7E909A] text-xs mt-1">
//                     {new Date(tx.date).toLocaleString("en-IN")}
//                   </p>

//                   {contribPercent && goalObj && (
//                     <p className="text-[#007ACC] text-xs font-semibold mt-2">
//                       Goal contribution: {contribPercent}% to{" "}
//                       <em>{goalObj.title}</em>
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => confirmDelete(tx._id)}
//                   className="text-red-600 hover:text-red-800 transition-colors duration-200"
//                   title="Delete transaction"
//                   aria-label={`Delete transaction of ${tx.amount} ${tx.category}`}
//                 >
//                   <Trash2 className="w-6 h-6" />
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination controls */}
//       {transactions.length > TRANSACTIONS_PER_PAGE && (
//         <div className="mt-4 flex justify-center items-center gap-4 text-sm text-[#4A6572]">
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span>
//             Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;

import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const TRANSACTIONS_PER_PAGE = 5;

const TransactionList = ({ transactions, goals, onDelete, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Show confirmation toast before deleting
  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this transaction?</span>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => {
                onDelete(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-[#66A3FF] overflow-hidden">
          <div className="h-1 bg-[#007ACC] animate-[loadingBar_2s_linear_infinite]" />
          <style>{`
            @keyframes loadingBar {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      <div className={`${loading ? "pt-2" : ""} space-y-4`}>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <svg
              className="text-pink-500 w-12 h-12 mb-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.418 0-8-2.686-8-6V7a2 2 0 012-2h12a2 2 0 012 2v8c0 3.314-3.582 6-8 6z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              No transactions yet.
            </h2>
            <p className="text-sm text-gray-500">
              Add your first transaction above.
            </p>
          </div>
        ) : (
          paginatedTransactions.map((tx) => {
            // Find the goal by tx.goal (or adjust field as needed)
            const goalObj = goals.find((g) => g._id === tx.goal);

            // Calculate contribution percent if data available
            const contribPercent =
              tx.goalContributionAmount && tx.amount
                ? ((tx.goalContributionAmount / tx.amount) * 100).toFixed(2)
                : null;

            return (
              <div
                key={tx._id}
                className="flex justify-between items-center bg-[#FFFFFF] p-5 rounded-lg shadow-md border border-[#E0E0E0] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="max-w-[75%]">
                  <p className="text-[#003366] font-semibold text-lg mb-1">
                    ₹{tx.amount.toLocaleString("en-IN")}{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        tx.type === "expense"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </p>
                  <p className="text-[#4A6572] text-sm font-medium">
                    {tx.category}
                  </p>
                  {tx.description && (
                    <p className="text-[#7E909A] text-sm mt-1 truncate">
                      {tx.description}
                    </p>
                  )}
                  <p className="text-[#7E909A] text-xs mt-1">
                    {new Date(tx.date).toLocaleString("en-IN")}
                  </p>

                  {contribPercent && goalObj && (
                    <p className="text-[#007ACC] text-xs font-semibold mt-2">
                      Goal contribution: {contribPercent}% to{" "}
                      <em>{goalObj.title}</em>
                    </p>
                  )}
                </div>

                <button
                  onClick={() => confirmDelete(tx._id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  title="Delete transaction"
                  aria-label={`Delete transaction of ${tx.amount} ${tx.category}`}
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination controls */}
      {transactions.length > TRANSACTIONS_PER_PAGE && (
        <div className="mt-4 flex justify-center items-center gap-4 text-sm text-[#4A6572]">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
