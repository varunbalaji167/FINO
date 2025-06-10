import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const seededRandom = (seed) => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const stringToRandomDarkColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }

  const hue = Math.floor(seededRandom(hash) * 360);
  const saturation = 60 + Math.floor(seededRandom(hash + 1) * 20); // 60-80%
  const lightness = 25 + Math.floor(seededRandom(hash + 2) * 20); // 25-45%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const SpendingBarChart = ({ data }) => {
  const labels = data.map((cat) => cat._id);
  const amounts = data.map((cat) => cat.total);

  const colors = labels.map((label) => stringToRandomDarkColor(label));

  const barData = {
    labels,
    datasets: [
      {
        label: "Spending Amount",
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      {/* Responsive height container */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <Bar data={barData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default SpendingBarChart;
