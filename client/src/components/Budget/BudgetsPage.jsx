// import { useState } from "react";
// import BudgetForm from "./BudgetForm";
// import BudgetList from "./BudgetList";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const BudgetsPage = () => {
//   const [editingBudget, setEditingBudget] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const handleBudgetSaved = () => {
//     setEditingBudget(null);
//     setRefreshKey((prev) => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl text-center font-bold text-[#003366] mb-8 select-none">
//           Budgets
//         </h2>

//         <section className="bg-white p-6 rounded-xl shadow-md mb-8">
//           <h3 className="text-2xl font-semibold text-[#003366] mb-4">
//             {editingBudget ? "Edit Budget" : "Add Budget"}
//           </h3>
//           <BudgetForm editingBudget={editingBudget} onBudgetSaved={handleBudgetSaved} />
//         </section>

//         <section className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-2xl font-semibold text-[#003366] mb-4">Budget List</h3>
//           <BudgetList
//             key={refreshKey}
//             onEdit={(budget) => setEditingBudget(budget)}
//           />
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BudgetsPage;

import { useState } from "react";
import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BudgetsPage = () => {
  const [editingBudget, setEditingBudget] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false); // global loading state

  const handleBudgetSaved = () => {
    setEditingBudget(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl text-center font-bold text-[#003366] mb-8 select-none">
          Budgets
        </h2>

        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-[#003366] mb-4">
            {editingBudget ? "Edit Budget" : "Add Budget"}
          </h3>
          <BudgetForm
            editingBudget={editingBudget}
            onBudgetSaved={handleBudgetSaved}
            loading={loading}
            setLoading={setLoading}
          />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-[#003366] mb-4">
            Budget List
          </h3>
          <BudgetList
            key={refreshKey}
            onEdit={(budget) => setEditingBudget(budget)}
            setLoading={setLoading}
            loading={loading}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetsPage;
