import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
      <p className="text-[#7E909A] italic text-center py-8">
        No transaction data for chart.
      </p>
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
      <p className="text-[#7E909A] italic text-center py-8">
        No expense data to display.
      </p>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 mx-auto
                    max-w-lg
                    w-full
                    sm:max-w-md
                    xs:max-w-full
                    sm:p-4
                    xs:p-3
                    "
    >
      <ResponsiveContainer width="100%" height={350} minWidth={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
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
              const percent = (
                (entry.payload.value / data.reduce((a, b) => a + b.value, 0)) *
                100
              ).toFixed(1);
              return (
                <span className="text-[#003366] font-semibold">
                  {value} ({percent}%)
                </span>
              );
            }}
            wrapperStyle={{
              fontSize: 14,
              color: "#4A6572",
              marginTop: 20,
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <style>{`
        @media (max-width: 640px) {
          .recharts-legend-wrapper {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpendingByCategoryChart;
