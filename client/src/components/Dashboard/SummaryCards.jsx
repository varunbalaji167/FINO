import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

const SummaryCards = ({ totalIncome, totalExpense, balance }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    {/* Income Card */}
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 group">
      <div className="flex justify-center mb-3">
        <ArrowDownCircle className="text-blue-700 w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </div>
      <h2 className="text-sm sm:text-base font-medium text-blue-800 text-center">
        Total Income
      </h2>
      <p className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mt-1">
        ₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>

    {/* Expense Card */}
    <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 group">
      <div className="flex justify-center mb-3">
        <ArrowUpCircle className="text-red-700 w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </div>
      <h2 className="text-sm sm:text-base font-medium text-red-800 text-center">
        Total Expense
      </h2>
      <p className="text-2xl sm:text-3xl font-bold text-red-900 text-center mt-1">
        ₹{totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>

    {/* Balance Card */}
    <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 group">
      <div className="flex justify-center mb-3">
        <Wallet className="text-green-700 w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </div>
      <h2 className="text-sm sm:text-base font-medium text-green-800 text-center">
        Balance
      </h2>
      <p className="text-2xl sm:text-3xl font-bold text-green-900 text-center mt-1">
        ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  </div>
);

export default SummaryCards;
