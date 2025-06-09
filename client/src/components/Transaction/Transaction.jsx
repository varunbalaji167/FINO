// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const expenseCategories = [
//   "Food",
//   "Transportation",
//   "Entertainment",
//   "Utilities",
//   "Healthcare",
//   "Others",
// ];

// const incomeCategories = [
//   "Salary",
//   "Investment",
//   "Freelance",
//   "Gift",
//   "Others",
// ];

// const Transaction = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [transactions, setTransactions] = useState([]);
//   const [goals, setGoals] = useState([]);
//   const [selectedGoal, setSelectedGoal] = useState("");
//   const [contributionPercent, setContributionPercent] = useState(""); // new state for contribution percent

//   const [formData, setFormData] = useState({
//     amount: "",
//     type: "expense",
//     category: "",
//     description: "",
//     date: "",
//   });

//   const token = user?.token;
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // Fetch transactions + budget usage warnings
//   const fetchTransactions = async () => {
//     if (!token) return logout();

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}transactions`,
//         config
//       );
//       setTransactions(response.data.transactions);

//       response.data.budgetsUsage?.forEach((budget) => {
//         if (budget.spent / budget.limit >= 0.85) {
//           toast.info(
//             `ℹ️ You have used ${Math.round(
//               (budget.spent / budget.limit) * 100
//             )}% of your "${budget.category}" budget.`
//           );
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       if (error.response?.status === 401) logout();
//     }
//   };

//   // Fetch user goals
//   const fetchGoals = async () => {
//     if (!token) return logout();

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         config
//       );
//       setGoals(res.data.goals);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//       toast.error("Failed to fetch goals");
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//     fetchGoals();
//   }, []);

//   // Handle input changes
//   const handleInpISThange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear selectedGoal and contribution percent if type changes to expense
//     if (name === "type" && value === "expense") {
//       setSelectedGoal("");
//       setContributionPercent("");
//       setFormData((prev) => ({ ...prev, category: "" }));
//     }
//     // Clear selectedGoal and contribution percent if category changes and type is expense
//     if (name === "category" && formData.type === "expense") {
//       setSelectedGoal("");
//       setContributionPercent("");
//     }
//   };

//   // Handle contribution percent change
//   const handleContributionPercentChange = (e) => {
//     const value = e.target.value;
//     // Allow only numbers between 0 and 100 or empty string
//     if (
//       value === "" ||
//       (Number(value) >= 0 && Number(value) <= 100 && /^\d*\.?\d*$/.test(value))
//     ) {
//       setContributionPercent(value);
//     }
//   };

//   // Add new transaction
//   const handleAddTransaction = async (e) => {
//     e.preventDefault();
//     if (!token) return logout();

//     if (!formData.amount || !formData.category || !formData.date) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     // Validate contributionPercent if goal is selected
//     if (formData.type === "income" && selectedGoal) {
//       if (!contributionPercent || Number(contributionPercent) <= 0) {
//         toast.error("Please enter a valid contribution percentage for the goal.");
//         return;
//       }
//     }

//     const dateISO = formData.date
//       ? new Date(formData.date).toISOString()
//       : new Date().toISOString();

//     try {
//       // Calculate actual contribution amount to goal
//       const amountNum = parseFloat(formData.amount);
//       let goalContributionAmount = 0;
//       if (formData.type === "income" && selectedGoal) {
//         goalContributionAmount = (amountNum * Number(contributionPercent)) / 100;
//       }

//       const payload = {
//         ...formData,
//         date: dateISO,
//         // send goalId and contributionAmount if applicable
//         ...(formData.type === "income" && selectedGoal
//           ? { goalId: selectedGoal, goalContributionAmount }
//           : {}),
//       };

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}transactions`,
//         payload,
//         config
//       );

//       setFormData({
//         amount: "",
//         type: "expense",
//         category: "",
//         description: "",
//         date: "",
//       });
//       setSelectedGoal("");
//       setContributionPercent("");
//       setTransactions((prev) => [response.data.transaction, ...prev]);

//       if (response.data.budgetWarning) {
//         toast.info(response.data.budgetWarning);
//       } else {
//         toast.success("Transaction added successfully");
//       }

//       // Refresh goals (to update progress)
//       fetchGoals();
//     } catch (error) {
//       if (
//         error.response?.status === 400 &&
//         error.response.data.message.includes("Budget limit exceeded")
//       ) {
//         toast.error(error.response.data.message);
//         setTimeout(() => {
//           navigate("/budgets");
//         }, 2000);
//       } else {
//         toast.error("Failed to add transaction");
//       }
//     }
//   };

//   // Delete transaction
//   const handleDelete = async (id) => {
//     if (!token) return logout();

//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}transactions/${id}`,
//         config
//       );
//       setTransactions((prev) => prev.filter((tx) => tx._id !== id));
//       toast.success("Transaction deleted");
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//       toast.error("Failed to delete transaction");
//     }
//   };

//   // Categories list based on type
//   const categories = formData.type === "income" ? incomeCategories : expenseCategories;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Transactions</h2>

//       <form
//         onSubmit={handleAddTransaction}
//         className="bg-white p-4 shadow rounded mb-6 space-y-4"
//       >
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={formData.amount}
//             onChange={handleInpISThange}
//             required
//             className="p-2 border rounded"
//             min="0.01"
//             step="0.01"
//           />
//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleInpISThange}
//             className="p-2 border rounded"
//           >
//             <option value="expense">Expense</option>
//             <option value="income">Income</option>
//           </select>

//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInpISThange}
//             required
//             className="p-2 border rounded"
//           >
//             <option value="">Select category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           <input
//             type="datetime-local"
//             name="date"
//             value={formData.date}
//             onChange={handleInpISThange}
//             required
//             className="p-2 border rounded"
//           />
//         </div>

//         {formData.type === "income" && (
//           <>
//             <select
//               name="goalId"
//               value={selectedGoal}
//               onChange={(e) => {
//                 setSelectedGoal(e.target.value);
//                 setContributionPercent(""); // reset contribution percent on goal change
//               }}
//               className="p-2 border rounded"
//             >
//               <option value="">-- Select Goal (optional) --</option>
//               {goals.map((goal) => (
//                 <option key={goal._id} value={goal._id}>
//                   {goal.title} (Target: ${goal.targetAmount})
//                 </option>
//               ))}
//             </select>
//             {selectedGoal && (
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 step="0.01"
//                 value={contributionPercent}
//                 onChange={handleContributionPercentChange}
//                 placeholder="Contribution % to goal"
//                 className="p-2 border rounded w-full"
//                 required
//               />
//             )}
//           </>
//         )}

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleInpISThange}
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           Add Transaction
//         </button>
//       </form>

//       <div className="space-y-4">
//         {transactions.length === 0 && (
//           <p className="text-gray-500">No transactions found.</p>
//         )}

// {transactions.map((tx) => {
//   const contribPercent =
//     tx.goalContributionAmount && tx.amount
//       ? ((tx.goalContributionAmount / tx.amount) * 100).toFixed(2)
//       : null;

//   const goalObj = goals.find((g) => g._id === tx.goal);

//   return (
//     <div
//       key={tx._id}
//       className="flex justify-between items-center bg-white p-4 rounded shadow mb-3"
//     >
//       <div>
//         <p>
//           <strong>${tx.amount.toFixed(2)}</strong> - {tx.category} ({tx.type})
//         </p>
//         {tx.description && (
//           <p className="text-sm text-gray-600">{tx.description}</p>
//         )}
//         <p className="text-xs text-gray-500">
//           {new Date(tx.date).toLocaleString("en-IN")}
//         </p>

//         {contribPercent && goalObj && (
//           <p className="text-xs text-green-700 font-semibold">
//             Goal contribution: {contribPercent}% to <em>{goalObj.title}</em>
//           </p>
//         )}
//       </div>
//       <button
//         onClick={() => handleDelete(tx._id)}
//         className="text-red-600 hover:text-red-800 font-bold"
//         title="Delete transaction"
//       >
//         &times;
//       </button>
//     </div>
//   );
// })}
//       </div>
//     </div>
//   );
// };

// export default Transaction;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import TransactionList from "./TransactionList";
// import Footer from "../Footer";
// import Navbar from "../Navbar";
// import TransactionForm from "./TransactionForm";

// const Transaction = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [transactions, setTransactions] = useState([]);
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = user?.token;
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const fetchTransactions = async () => {
//     if (!token) return logout();

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}transactions`,
//         config
//       );
//       setTransactions(response.data.transactions);

//       response.data.budgetsUsage?.forEach((budget) => {
//         if (budget.spent / budget.limit >= 0.85) {
//           toast(
//             `ℹ️ You have used ${Math.round(
//               (budget.spent / budget.limit) * 100
//             )}% of your "${budget.category}" budget.`,
//             { icon: "⚠️" }
//           );
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       if (error.response?.status === 401) logout();
//     }
//   };

//   const fetchGoals = async () => {
//     if (!token) return logout();

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         config
//       );
//       setGoals(res.data.goals);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//       toast.error("Failed to fetch goals");
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//     fetchGoals();
//   }, []);

//   const handleAddTransaction = async (payload) => {
//     if (!token) return logout();

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}transactions`,
//         payload,
//         config
//       );

//       setTransactions((prev) => [response.data.transaction, ...prev]);

//       // Combine success and budget warning message
//       let message = "Transaction added successfully!";
//       if (response.data.budgetWarning) {
//         message += ` But ${response.data.budgetWarning}`;
//       }

//       toast.success(message);

//       fetchGoals();
//     } catch (error) {
//       if (
//         error.response?.status === 400 &&
//         error.response.data.message.includes("Budget limit exceeded")
//       ) {
//         toast.error(error.response.data.message);
//         setTimeout(() => {
//           navigate("/budgets");
//         }, 2000);
//       } else {
//         toast.error("Failed to add transaction");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!token) return logout();

//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}transactions/${id}`,
//         config
//       );
//       setTransactions((prev) => prev.filter((tx) => tx._id !== id));
//       toast.success("Transaction deleted");
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//       toast.error("Failed to delete transaction");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl text-center font-bold text-[#003366] mb-6 select-none">
//           Transactions
//         </h2>

//         {/* Transaction Form */}
//         <section className="bg-white p-6 rounded-xl shadow-md mb-8">
//           <h3 className="text-2xl font-semibold text-[#003366] mb-4">
//             Add New Transaction
//           </h3>
//           <TransactionForm
//             goals={goals}
//             onAdd={handleAddTransaction}
//             loading={loading}
//           />
//         </section>

//         {/* Transaction List */}
//         <section className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-2xl font-semibold text-[#003366] mb-4">
//             Transaction History
//           </h3>
//           <TransactionList
//             transactions={transactions}
//             goals={goals}
//             onDelete={handleDelete}
//           />
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Transaction;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TransactionList from "./TransactionList";
import Footer from "../Footer";
import Navbar from "../Navbar";
import TransactionForm from "./TransactionForm";

const Transaction = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const token = user?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTransactions = async () => {
    if (!token) return logout();

    setLoadingTransactions(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}transactions`,
        config
      );
      setTransactions(response.data.transactions);

      response.data.budgetsUsage?.forEach((budget) => {
        if (budget.spent / budget.limit >= 0.85) {
          toast(
            `ℹ️ You have used ${Math.round(
              (budget.spent / budget.limit) * 100
            )}% of your "${budget.category}" budget.`,
            { icon: "⚠️" }
          );
        }
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response?.status === 401) logout();
    } finally {
      setLoadingTransactions(false);
    }
  };

  const fetchGoals = async () => {
    if (!token) return logout();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}goals`,
        config
      );
      setGoals(res.data.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to fetch goals");
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchGoals();
  }, []);

  const handleAddTransaction = async (payload) => {
    if (!token) return logout();

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}transactions`,
        payload,
        config
      );

      setTransactions((prev) => [response.data.transaction, ...prev]);

      let message = "Transaction added successfully!";
      if (response.data.budgetWarning) {
        message += ` But ${response.data.budgetWarning}`;
      }

      toast.success(message);

      fetchGoals();
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response.data.message.includes("Budget limit exceeded")
      ) {
        toast.error(error.response.data.message);
        setTimeout(() => {
          navigate("/budgets");
        }, 2000);
      } else {
        toast.error("Failed to add transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2 text-sm">
          <span>Are you sure you want to delete this transaction?</span>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const deleting = toast.loading("Deleting...");
                try {
                  await axios.delete(
                    `${import.meta.env.VITE_API_BASE_URL}transactions/${id}`,
                    config
                  );
                  setTransactions((prev) => prev.filter((tx) => tx._id !== id));
                  toast.success("Transaction deleted", { id: deleting });
                } catch (error) {
                  console.error("Error deleting transaction:", error);
                  toast.error("Failed to delete transaction", { id: deleting });
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl text-center font-bold text-[#003366] mb-6 select-none">
          Transactions
        </h2>

        {/* Transaction Form */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-[#003366] mb-4">
            Add New Transaction
          </h3>
          <TransactionForm
            goals={goals}
            onAdd={handleAddTransaction}
            loading={loading}
          />
        </section>

        {/* Loading */}
        {loadingTransactions ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
            }}
            aria-label="Loading transactions"
          >
            <div
              style={{
                border: "4px solid #e0e0e0",
                borderTop: "4px solid #007ACC",
                borderRadius: "50%",
                width: 40,
                height: 40,
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
          </div>
        ) : (
          // Transaction List
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-[#003366] mb-4">
              Transaction History
            </h3>
            <TransactionList
              transactions={transactions}
              goals={goals}
              onDelete={handleDelete}
            />
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Transaction;
