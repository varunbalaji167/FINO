import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { FaPiggyBank } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SpendingPieChart = ({ spendingByCategory }) => {
  const navigate = useNavigate();

  if (!spendingByCategory.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md text-center">
        <FaPiggyBank className="text-pink-500 text-5xl mb-4 animate-bounce" />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          No spending data yet!
        </h2>
        <p className="text-sm text-gray-500">
          Start tracking your expenses to see your spending habits visualized
          here.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition duration-200"
          onClick={() => navigate("/transactions")}
        >
          Add your first expense
        </button>
      </div>
    );
  }

  const pieData = {
    labels: spendingByCategory.map((cat) => cat._id),
    datasets: [
      {
        label: "Spending by Category",
        data: spendingByCategory.map((cat) => cat.total),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#8B5CF6",
          "#EC4899",
          "#F97316",
        ],
        hoverOffset: 20,
      },
    ],
  };

  return (
    <div className="bg-white p-4">
      <Pie data={pieData} />
    </div>
  );
};

export default SpendingPieChart;
