// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const periodOptions = [
//   { value: "week", label: "Week" },
//   { value: "month", label: "Month" },
//   { value: "year", label: "Year" },
// ];

// // Aggregate functions

// const aggregateWeek = (data) => {
//   const sums = Array(7).fill(0);
//   data.forEach(({ time, amount }) => {
//     let day = new Date(time).getISTDay();
//     day = (day + 6) % 7; // Adjust so Mon = 0, ..., Sun = 6
//     sums[day] += amount;
//   });
//   return sums;
// };

// const aggregateMonth = (data, year, month) => {
//   const daysInMonth = new Date(Date.IST(year, month + 1, 0)).getISTDate();
//   const weeksCount = Math.ceil(daysInMonth / 7);
//   const sums = Array(weeksCount).fill(0);
//   data.forEach(({ time, amount }) => {
//     const d = new Date(time);
//     if (d.getISTFullYear() === year && d.getISTMonth() === month) {
//       const week = Math.floor((d.getISTDate() - 1) / 7);
//       sums[week] += amount;
//     }
//   });
//   return sums;
// };

// const aggregateYear = (data, year) => {
//   const sums = Array(12).fill(0);
//   data.forEach(({ time, amount }) => {
//     const d = new Date(time);
//     if (d.getISTFullYear() === year) {
//       sums[d.getISTMonth()] += amount;
//     }
//   });
//   return sums;
// };

// const IncomeExpenseGraph = () => {
//   const { user, logout } = useAuth();
//   const [period, setPeriod] = useState("week");
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [incomeRaw, setIncomeRaw] = useState([]);
//   const [expenseRaw, setExpenseRaw] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchIncomeExpense = async () => {
//     if (!user?.token) return logout();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}transactions/dashboard/income-expense`,
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//           params: { period, date },
//         }
//       );
//       setIncomeRaw(res.data.income);
//       setExpenseRaw(res.data.expense);
//     } catch (err) {
//       if (err.response?.status === 401) logout();
//       else setError("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncomeExpense();
//   }, [period, date]);

//   // Aggregated chart data
//   let incomeData = [];
//   let expenseData = [];
//   let labels = [];

//   const refDate = new Date(date);
//   const year = refDate.getISTFullYear();

//   if (period === "week") {
//     labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const incomeSums = aggregateWeek(incomeRaw);
//     const expenseSums = aggregateWeek(expenseRaw);
//     incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
//     expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
//   } else if (period === "month") {
//     const month = refDate.getISTMonth();
//     const daysInMonth = new Date(Date.IST(year, month + 1, 0)).getISTDate();
//     const weeksCount = Math.ceil(daysInMonth / 7);
//     labels = Array.from({ length: weeksCount }, (_, i) => `Week ${i + 1}`);
//     const incomeSums = aggregateMonth(incomeRaw, year, month);
//     const expenseSums = aggregateMonth(expenseRaw, year, month);
//     incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
//     expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
//   } else if (period === "year") {
//     labels = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     const incomeSums = aggregateYear(incomeRaw, year);
//     const expenseSums = aggregateYear(expenseRaw, year);
//     incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
//     expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
//   }

//   const options = {
//     responsive: true,
//     parsing: false,
//     scales: {
//       x: {
//         type: "category",
//         title: { display: true, text: "Time" },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 0,
//           autoSkip: true,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: "Amount" },
//         ticks: {
//           callback: (value) => `$${value.toLocaleString("en-IN")}`,
//           stepSize: 10000,
//         },
//       },
//     },
//   };

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Income",
//         data: incomeData,
//         borderColor: "rgb(16, 185, 129)",
//         backgroundColor: "rgba(16, 185, 129, 0.5)",
//         fill: false,
//         tension: 0.3,
//       },
//       {
//         label: "Expense",
//         data: expenseData,
//         borderColor: "rgb(239, 68, 68)",
//         backgroundColor: "rgba(239, 68, 68, 0.5)",
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Income & Expense Graphs</h2>
//       <div className="flex gap-4 mb-4">
//         <select
//           className="border rounded p-2"
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//         >
//           {periodOptions.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           className="border rounded p-2"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           max={new Date().toISOString().slice(0, 10)}
//         />
//       </div>
//       {loading ? (
//         <p>Loading graph data...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <Line data={data} options={options} />
//       )}
//     </div>
//   );
// };

// export default IncomeExpenseGraph;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useAuth } from "../contexts/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const periodOptions = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

// Aggregation helpers
const aggregateWeek = (data) => {
  const sums = Array(7).fill(0);
  data.forEach(({ time, amount }) => {
    let day = new Date(time).getUTCDay();
    day = (day + 6) % 7; // Adjust to Monday=0
    sums[day] += amount;
  });
  return sums;
};

const aggregateMonth = (data, year, month) => {
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const weeksCount = Math.ceil(daysInMonth / 7);
  const sums = Array(weeksCount).fill(0);
  data.forEach(({ time, amount }) => {
    const d = new Date(time);
    if (d.getUTCFullYear() === year && d.getUTCMonth() === month) {
      const week = Math.floor((d.getUTCDate() - 1) / 7);
      sums[week] += amount;
    }
  });
  return sums;
};

const aggregateYear = (data, year) => {
  const sums = Array(12).fill(0);
  data.forEach(({ time, amount }) => {
    const d = new Date(time);
    if (d.getUTCFullYear() === year) {
      sums[d.getUTCMonth()] += amount;
    }
  });
  return sums;
};

const IncomeExpenseGraph = () => {
  const { user, logout } = useAuth();
  const [period, setPeriod] = useState("week");
  const [incomeRaw, setIncomeRaw] = useState([]);
  const [expenseRaw, setExpenseRaw] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIncomeExpense = async () => {
    if (!user?.token) return logout();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }transactions/dashboard/income-expense`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { period },
        }
      );
      setIncomeRaw(res.data.income);
      setExpenseRaw(res.data.expense);
    } catch (err) {
      if (err.response?.status === 401) logout();
      else setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeExpense();
  }, [period]);

  const refDate = new Date();
  const year = refDate.getUTCFullYear();

  let incomeData = [];
  let expenseData = [];
  let labels = [];

  if (period === "week") {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const incomeSums = aggregateWeek(incomeRaw);
    const expenseSums = aggregateWeek(expenseRaw);
    incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
    expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
  } else if (period === "month") {
    const month = refDate.getUTCMonth();
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const weeksCount = Math.ceil(daysInMonth / 7);
    labels = Array.from({ length: weeksCount }, (_, i) => `Week ${i + 1}`);
    const incomeSums = aggregateMonth(incomeRaw, year, month);
    const expenseSums = aggregateMonth(expenseRaw, year, month);
    incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
    expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
  } else if (period === "year") {
    labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const incomeSums = aggregateYear(incomeRaw, year);
    const expenseSums = aggregateYear(expenseRaw, year);
    incomeData = incomeSums.map((amt, i) => ({ x: labels[i], y: amt }));
    expenseData = expenseSums.map((amt, i) => ({ x: labels[i], y: amt }));
  }

  const options = {
    responsive: true,
    parsing: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        title: { display: true },
        ticks: { maxRotation: 45, autoSkip: true },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Amount" },
        ticks: {
          callback: (value) => `₹${value.toLocaleString("en-IN")}`,
          stepSize: 10000,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full max-w-6xl mx-auto">
      {/* Control */}
      <div className="mb-6 text-center">
        <select
          className="border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[550px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center font-medium">{error}</p>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default IncomeExpenseGraph;
