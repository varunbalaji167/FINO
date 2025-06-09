import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportTransactions = ({ transactions, goals }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions to export</p>;
  }

  // Format data for CSV and PDF with goal title
  const csvData = transactions.map((tx) => {
    const goalObj = goals.find((g) => g._id === tx.goal);
    const contribPercent =
      tx.goalContributionAmount && tx.amount
        ? ((tx.goalContributionAmount / tx.amount) * 100).toFixed(2)
        : "";

    return {
      Date: new Date(tx.date).toLocaleDateString(),
      Amount: tx.amount,
      Type: tx.type,
      Category: tx.category,
      Description: tx.description || "",
      "Goal Contribution %": contribPercent,
      "Goal Title": goalObj ? goalObj.title : "",
    };
  });

  // Prepare PDF export function
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Transactions Report", 14, 16);

    const tableColumn = [
      "Date",
      "Amount",
      "Type",
      "Category",
      "Description",
      "Goal Contribution %",
      "Goal Title",
    ];

    const tableRows = transactions.map((tx) => {
      const goalObj = goals.find((g) => g._id === tx.goal);
      const contribPercent =
        tx.goalContributionAmount && tx.amount
          ? ((tx.goalContributionAmount / tx.amount) * 100).toFixed(2)
          : "";

      return [
        new Date(tx.date).toLocaleDateString(),
        tx.amount,
        tx.type,
        tx.category,
        tx.description || "",
        contribPercent,
        goalObj ? goalObj.title : "",
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save(
      `transactions_report_${new Date().toISOString().slice(0, 10)}.pdf`
    );
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <CSVLink
        data={csvData}
        filename={`transactions_report_${new Date()
          .toISOString()
          .slice(0, 10)}.csv`}
        className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
      >
        Export Transactions CSV
      </CSVLink>

      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-5 py-2 rounded-md shadow hover:bg-red-700 transition-colors"
      >
        Export Transactions PDF
      </button>
    </div>
  );
};

export default ExportTransactions;
