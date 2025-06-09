import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import SummaryCards from "./SummaryCards";
import SpendingPieChart from "./SpendingPieChart";
import SpendingBarChart from "./SpendingBarChart";
import RecentTransactions from "./RecentTransactions";
import IncomeExpenseGraph from "./IncomeExpenseGraph";
import DayGraph from "./DayGraph";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = user?.token;

  const fetchStats = async () => {
    if (!token) return logout();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}transactions/dashboard/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(res.data);
    } catch (err) {
      if (err.response?.status === 401) logout();
      else setError("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-[#003366] rounded-full animate-spin" />
          <p className="text-[#003366] text-lg font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5] flex flex-col text-center overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 md:py-12">
        {/* Header */}
        <header className="mb-10 max-w-xl mx-auto text-center">
          <h1 className="text-[#003366] text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Dashboard
          </h1>
          <p className="text-[#4A6572] text-base sm:text-lg mt-3 px-4 sm:px-0">
            Overview of your finances, spending habits, and recent activities.
          </p>
        </header>

        {/* Summary Cards */}
        <section className="mb-12">
          <SummaryCards
            totalIncome={stats.totalIncome}
            totalExpense={stats.totalExpense}
            balance={stats.balance}
          />
        </section>

        {/* Spending Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E0E0E0] overflow-hidden">
            <h3 className="text-[#003366] text-xl sm:text-2xl font-semibold mb-4">
              Spending by Category (Pie Chart)
            </h3>
            <SpendingPieChart spendingByCategory={stats.spendingByCategory} />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E0E0E0] overflow-hidden">
            <h3 className="text-[#003366] text-xl sm:text-2xl font-semibold mb-4">
              Spending by Category (Bar Chart)
            </h3>
            <SpendingBarChart data={stats.spendingByCategory} />
          </div>
        </section>

        {/* Graphs */}
        <section className="grid grid-cols-1 gap-6 lg:gap-8 mb-12">
          <div className="bg-[#E6F0FF] border border-[#B3D9FF] rounded-2xl p-6 shadow-md">
            <h2 className="text-[#003366] text-xl sm:text-2xl font-semibold mb-4">
              Income vs Expense
            </h2>
            <div className="w-full min-h-[250px]">
              <IncomeExpenseGraph />
            </div>
          </div>
          <div className="bg-[#E6F0FF] border border-[#B3D9FF] rounded-2xl p-6 shadow-md">
            <h2 className="text-[#003366] text-xl sm:text-2xl font-semibold mb-4">
              Daily Income vs Expense
            </h2>
            <div className="w-full min-h-[250px]">
              <DayGraph />
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="bg-white rounded-2xl p-4 shadow-lg border border-[#E0E0E0] overflow-x-auto mb-12">
          <h2 className="text-[#003366] text-2xl sm:text-3xl font-bold mb-">
            Recent Transactions
          </h2>
          <RecentTransactions token={token} logout={logout} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
