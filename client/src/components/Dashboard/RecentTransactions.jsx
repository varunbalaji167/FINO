// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TRANSACTIONS_PER_PAGE = 5;

// const RecentTransactions = ({ token, logout }) => {
//   const [allTransactions, setAllTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}transactions`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setAllTransactions(res.data.transactions || []);
//         setCurrentPage(1); // reset page on new data
//       } catch (err) {
//         if (err.response?.status === 401) logout();
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();
//   }, [token, logout]);

//   const totalPages = Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE);

//   const paginatedTransactions = allTransactions.slice(
//     (currentPage - 1) * TRANSACTIONS_PER_PAGE,
//     currentPage * TRANSACTIONS_PER_PAGE
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((p) => p + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((p) => p - 1);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-4 overflow-x-auto">
//       {loading && (
//         <div className="flex justify-center items-center py-6">
//           <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
//           <span className="ml-2 text-sm text-[#4A6572]">Loading...</span>
//         </div>
//       )}

//       {!loading && paginatedTransactions.length === 0 ? (
//         <p className="text-[#7E909A] italic text-center py-6">
//           No transactions found.
//         </p>
//       ) : (
//         <div className="w-full overflow-x-auto">
//           <table className="w-full min-w-[500px] border-collapse border border-[#E0E0E0]">
//             <thead className="bg-[#E6F0FF] text-[#003366] text-sm">
//               <tr>
//                 <th className="border border-[#E0E0E0] px-4 py-2 text-left">
//                   Category (Type)
//                 </th>
//                 <th className="border border-[#E0E0E0] px-4 py-2 text-right">
//                   Amount (₹)
//                 </th>
//                 <th className="border border-[#E0E0E0] px-4 py-2 text-left">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedTransactions.map((t) => (
//                 <tr
//                   key={t._id}
//                   className="hover:bg-[#d4e9fe] transition-colors"
//                 >
//                   <td className="border border-[#E0E0E0] px-4 py-2 text-[#242C34] text-sm">
//                     {t.category} ({t.type})
//                   </td>
//                   <td
//                     className={`border border-[#E0E0E0] px-4 py-2 text-right font-semibold text-sm ${
//                       t.type === "income"
//                         ? "text-green-600"
//                         : t.type === "expense"
//                         ? "text-red-600"
//                         : "text-gray-600"
//                     }`}
//                   >
//                     {t.amount.toLocaleString("en-IN", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </td>
//                   <td className="border border-[#E0E0E0] px-4 py-2 text-[#4A6572] text-sm">
//                     {new Date(t.date).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       {!loading && allTransactions.length > TRANSACTIONS_PER_PAGE && (
//         <div className="mt-6 flex justify-center items-center gap-4 text-sm text-[#4A6572]">
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="px-4 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <span>
//             Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentTransactions;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPiggyBank } from "react-icons/fa";

const TRANSACTIONS_PER_PAGE = 5;

const RecentTransactions = ({ token, logout }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}transactions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllTransactions(res.data.transactions || []);
        setCurrentPage(1); // reset page on new data
      } catch (err) {
        if (err.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [token, logout]);

  const totalPages = Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE);

  const paginatedTransactions = allTransactions.slice(
    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-4 overflow-x-auto">
      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
          <span className="ml-2 text-sm text-[#4A6572]">Loading...</span>
        </div>
      )}

      {!loading && paginatedTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md text-center">
          <FaPiggyBank className="text-pink-500 text-5xl mb-4 animate-bounce" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Nothing here yet!
          </h2>
          <p className="text-sm text-gray-500">
            It looks like you haven’t recorded any transactions. Start building
            your financial story by adding your first one now.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition duration-200"
            onClick={() => navigate("/transactions")}
          >
            Add Transaction
          </button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse border border-[#E0E0E0]">
            <thead className="bg-[#E6F0FF] text-[#003366] text-sm">
              <tr>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">
                  Category (Type)
                </th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-right">
                  Amount (₹)
                </th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-[#d4e9fe] transition-colors"
                >
                  <td className="border border-[#E0E0E0] px-4 py-2 text-[#242C34] text-sm">
                    {t.category} ({t.type})
                  </td>
                  <td
                    className={`border border-[#E0E0E0] px-4 py-2 text-right font-semibold text-sm ${
                      t.type === "income"
                        ? "text-green-600"
                        : t.type === "expense"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {t.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-[#E0E0E0] px-4 py-2 text-[#4A6572] text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && allTransactions.length > TRANSACTIONS_PER_PAGE && (
        <div className="mt-6 flex justify-center items-center gap-4 text-sm text-[#4A6572]">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-1 border border-[#E0E0E0] rounded hover:bg-[#E6F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
