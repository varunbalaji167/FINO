import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingPieChart = ({ spendingByCategory }) => {
  if (!spendingByCategory.length) {
    return <p>No expense data available to display.</p>;
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
