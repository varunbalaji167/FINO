import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import ExportTransactions from "./ExportTransactions";
import SpendingByCategoryChart from "./SpendingByCategoryChart";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Reports = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);

  const token = user?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return logout();

    setLoadingTransactions(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}transactions`, config)
      .then((res) => {
        setTransactions(res.data.transactions);
        setLoadingTransactions(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) logout();
        else console.error(err);
        setLoadingTransactions(false);
      });

    setLoadingGoals(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}goals`, config)
      .then((res) => {
        setGoals(res.data.goals);
        setLoadingGoals(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) logout();
        else console.error(err);
        setLoadingGoals(false);
      });
  }, [token]);

  // Inline circle spinner component
  const InlineSpinner = () => (
    <div
      style={{
        display: "inline-block",
        border: "3px solid #e0e0e0",
        borderTop: "3px solid #007ACC",
        borderRadius: "50%",
        width: 20,
        height: 20,
        animation: "spin 1s linear infinite",
        verticalAlign: "middle",
        marginLeft: 8,
      }}
      aria-label="Loading"
    />
  );

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 flex-grow">
        <h2 className="text-3xl font-bold text-[#003366] mb-6 text-center select-none">
          Reports & Export
        </h2>

        <section className="mb-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#003366] mb-4 border-b border-[#E0E0E0] pb-2 flex items-center">
            Export Your Data
            {(loadingTransactions || loadingGoals) && <InlineSpinner />}
          </h3>
          {!loadingTransactions && !loadingGoals ? (
            <ExportTransactions transactions={transactions} goals={goals} />
          ) : (
            <p className="text-center text-gray-500 py-6">
              Loading data for export...
            </p>
          )}
        </section>

        <section className="mb-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold text-[#003366] mb-4 border-b border-[#E0E0E0] pb-2 flex items-center">
            Spending by Category
            {loadingTransactions && <InlineSpinner />}
          </h3>
          {!loadingTransactions ? (
            <SpendingByCategoryChart transactions={transactions} />
          ) : (
            <p className="text-center text-gray-500 py-6">
              Loading transaction data...
            </p>
          )}
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Reports;
