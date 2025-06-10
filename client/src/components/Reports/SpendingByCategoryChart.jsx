import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie, FaRegSmileWink } from "react-icons/fa";
const COLORS = [
  "#003366",
  "#007ACC",
  "#66A3FF",
  "#4A6572",
  "#16A34A",
  "#DC2626",
];

const SpendingByCategoryChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center gap-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
        <FaChartPie className="text-5xl text-blue-400" />
        <h3 className="text-xl font-semibold text-blue-700">
          No transaction data yet!
        </h3>
        <p className="text-sm text-gray-600 max-w-md">
          Start tracking your expenses and watch your financial story take
          shape. Every rupee counts!
        </p>
      </div>
    );
  }

  const data = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const found = acc.find((item) => item.name === tx.category);
      if (found) found.value += tx.amount;
      else acc.push({ name: tx.category, value: tx.amount });
      return acc;
    }, []);

  if (data.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center gap-4 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm">
        <FaRegSmileWink className="text-5xl text-yellow-500" />
        <h3 className="text-xl font-semibold text-yellow-700">
          You're doing great!
        </h3>
        <p className="text-sm text-gray-600 max-w-md">
          No expenses recorded yet. Stay consistent and start logging your
          spending to get personalized insights here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-5 xs:p-4 w-full max-w-3xl mx-auto">
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
              paddingAngle={3}
              labelLine={false}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `₹${value.toLocaleString("en-IN")}`,
                `${name}`,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value, entry) => {
                const total = data.reduce((a, b) => a + b.value, 0);
                const percent = ((entry.payload.value / total) * 100).toFixed(
                  1
                );
                return (
                  <span className="text-[#003366] font-semibold">
                    {value} ({percent}%)
                  </span>
                );
              }}
              wrapperStyle={{
                fontSize: "0.9rem",
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                textAlign: "center",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .recharts-legend-wrapper {
            font-size: 0.8rem !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpendingByCategoryChart;
