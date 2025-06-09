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
//   TimeScale,
// } from "chart.js";
// import "chartjs-adapter-date-fns";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// // Transform backend data to { x: timestamp, y: amount }
// const transformData = (arr) =>
//   arr.map(({ time, amount }) => ({
//     x: Date.parse(time), // Convert to IST timestamp in ms
//     y: amount,
//   }));

// const DayGraph = () => {
//   const { user, logout } = useAuth();
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
//           params: { period: "day", date },
//         }
//       );

//       setIncomeRaw(transformData(res.data.income));
//       setExpenseRaw(transformData(res.data.expense));
//     } catch (err) {
//       if (err.response?.status === 401) logout();
//       else setError("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncomeExpense();
//   }, [date]);

//   const pad = (n) => (n < 10 ? "0" + n : n);

//   const options = {
//     responsive: true,
//     parsing: false, // use {x, y} format
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           unit: "hour",
//           tooltipFormat: "yyyy-MM-dd HH:mm 'IST'",
//           displayFormats: {
//             hour: "HH:mm",
//           },
//         },
//         adapters: {
//           date: {
//             parse: (value) => value,
//             format: (value, formatStr) => {
//               const date = new Date(value);
//               if (formatStr === "HH:mm")
//                 return pad(date.getISTHours()) + ":" + pad(date.getISTMinutes());
//               if (formatStr === "yyyy-MM-dd HH:mm 'IST'")
//                 return (
//                   date.getISTFullYear() +
//                   "-" +
//                   pad(date.getISTMonth() + 1) +
//                   "-" +
//                   pad(date.getISTDate()) +
//                   " " +
//                   pad(date.getISTHours()) +
//                   ":" +
//                   pad(date.getISTMinutes()) +
//                   " IST"
//                 );
//               return date.toISOString();
//             },
//           },
//         },
//         title: {
//           display: true,
//           text: "Hour (IST)",
//         },
//         ticks: {
//           maxRotation: 45,
//           autoSkip: true,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: "Amount" },
//         ticks: {
//           callback: (v) => `$${v.toLocaleString("en-IN")}`,
//         },
//       },
//     },
//   };

//   const data = {
//     datasets: [
//       {
//         label: "Income",
//         data: incomeRaw,
//         fill: false,
//         borderColor: "rgb(16, 185, 129)",
//         backgroundColor: "rgba(16, 185, 129, 0.5)",
//         tension: 0.3,
//       },
//       {
//         label: "Expense",
//         data: expenseRaw,
//         fill: false,
//         borderColor: "rgb(239, 68, 68)",
//         backgroundColor: "rgba(239, 68, 68, 0.5)",
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Daily Income & Expense</h2>

//       <div className="mb-4">
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

// export default DayGraph;

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
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ClipLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const transformData = (arr) =>
  arr.map(({ time, amount }) => ({
    x: Date.parse(time),
    y: amount,
  }));

const DayGraph = () => {
  const { user, logout } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
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
          params: { period: "day", date },
        }
      );

      setIncomeRaw(transformData(res.data.income));
      setExpenseRaw(transformData(res.data.expense));
    } catch (err) {
      if (err.response?.status === 401) logout();
      else setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeExpense();
  }, [date]);

  const pad = (n) => (n < 10 ? "0" + n : n);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    parsing: false,
    layout: {
      padding: {
        top: 10,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#003366",
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) => `₹${ctx.raw.y.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
          tooltipFormat: "PPpp",
        },
        title: {
          display: true,
          text: "Time (IST)",
          color: "#4A6572",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#4A6572",
          maxRotation: 45,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
          color: "#4A6572",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#4A6572",
          callback: (v) => `₹${v.toLocaleString("en-IN")}`,
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Income",
        data: incomeRaw,
        fill: false,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.3,
      },
      {
        label: "Expense",
        data: expenseRaw,
        fill: false,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full max-w-6xl mx-auto">
      <div className="mb-6 text-center">
        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>

      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[550px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <ClipLoader size={35} color="#003366" />
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

export default DayGraph;
