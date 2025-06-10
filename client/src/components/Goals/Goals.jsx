// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import GoalForm from "./GoalForm";
// import GoalList from "./GoalList";
// import Navbar from "../Navbar";

// const Goals = () => {
//   const { user, logout } = useAuth();

//   const [goals, setGoals] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     targetAmount: "",
//     category: "Savings",
//     deadline: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const token = user?.token;
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchGoals = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         config
//       );
//       setGoals(res.data.goals);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//       if (error.response?.status === 401) logout();
//     }
//   };

//   const updateProgress = async () => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}goals/progress`,
//         {},
//         config
//       );
//       fetchGoals();
//     } catch (error) {
//       console.error("Error updating goal progress");
//     }
//   };

//   useEffect(() => {
//     fetchGoals();
//     updateProgress();
//   }, []);

//   const handleCreateGoal = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         formData,
//         config
//       );
//       setFormData({
//         title: "",
//         targetAmount: "",
//         category: "Savings",
//         deadline: "",
//       });
//       toast.success("Goal created");
//       fetchGoals();
//     } catch (error) {
//       toast.error("Failed to create goal");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div><Navbar/>
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Goals</h2>
//       <GoalForm
//         formData={formData}
//         setFormData={setFormData}
//         onCreate={handleCreateGoal}
//         loading={loading}
//       />
//       <GoalList goals={goals} />
//     </div>
//     </div>
//   );
// };

// export default Goals;

// // Goals.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../contexts/AuthContext";
// import GoalForm from "./GoalForm";
// import GoalList from "./GoalList";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const Goals = () => {
//   const { user, logout } = useAuth();

//   const [goals, setGoals] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     targetAmount: "",
//     category: "Savings",
//     deadline: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const token = user?.token;
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchGoals = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         config
//       );
//       setGoals(res.data.goals);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//       if (error.response?.status === 401) logout();
//     }
//   };

//   const updateProgress = async () => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}goals/progress`,
//         {},
//         config
//       );
//       fetchGoals();
//     } catch (error) {
//       console.error("Error updating goal progress");
//     }
//   };

//   useEffect(() => {
//     fetchGoals();
//     updateProgress();
//   }, []);

//   const handleCreateGoal = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}goals`,
//         formData,
//         config
//       );
//       setFormData({
//         title: "",
//         targetAmount: "",
//         category: "Savings",
//         deadline: "",
//       });
//       toast.success("Goal created");
//       fetchGoals();
//     } catch (error) {
//       toast.error("Failed to create goal");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteGoal = async (goalId) => {
//     try {
//       await axios.delete(
//       `${import.meta.env.VITE_API_BASE_URL}goals/${goalId}`,
//     config
//   );
//       toast.success("Goal deleted");
//       fetchGoals();
//     } catch (err) {
//       toast.error("Failed to delete goal");
//     }
//   };

//   return (
//   <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
//     <Navbar />
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl text-center font-bold text-[#003366] mb-8 select-none">
//         Your Goals
//       </h2>

//       <section className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-[#003366] mb-4">
//           Add New Goal
//         </h2>
//         <GoalForm
//           formData={formData}
//           setFormData={setFormData}
//           onCreate={handleCreateGoal}
//           loading={loading}
//         />
//       </section>

//       <section className="bg-white p-6 rounded-xl shadow-md">
//         <h3 className="text-2xl font-semibold text-[#003366] mb-4">
//           Goal List
//         </h3>
//         <GoalList goals={goals} onDelete={handleDeleteGoal} />
//       </section>
//     </div>
//     <Footer />
//   </div>
// );
// };

// export default Goals;

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Goals = () => {
  const { user, logout } = useAuth();

  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    category: "Savings",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const token = user?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchGoals = async () => {
    if (!token) return logout();

    try {
      setFetching(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}goals`,
        config
      );
      setGoals(res.data.goals);
      setError(null);
    } catch (error) {
      console.error("Error fetching goals:", error);
      if (error.response?.status === 401) logout();
      setError("Failed to load goals.");
    } finally {
      setFetching(false);
    }
  };

  const updateProgress = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}goals/progress`,
        {},
        config
      );
      fetchGoals();
    } catch (error) {
      console.error("Error updating goal progress");
    }
  };

  useEffect(() => {
    fetchGoals();
    updateProgress();
  }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}goals`,
        formData,
        config
      );
      setFormData({
        title: "",
        targetAmount: "",
        category: "Savings",
        deadline: "",
      });
      toast.success("Goal created");
      fetchGoals();
    } catch (error) {
      toast.error("Failed to create goal");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    const confirmId = toast.loading("Deleting goal...");
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}goals/${goalId}`,
        config
      );
      toast.success("Goal deleted", { id: confirmId });
      fetchGoals();
    } catch (err) {
      toast.error("Failed to delete goal", { id: confirmId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#E6F0FF] to-[#F5F5F5]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl text-center font-bold text-[#003366] mb-8 select-none">
          Your Goals
        </h2>

        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Add New Goal
          </h2>
          <GoalForm
            formData={formData}
            setFormData={setFormData}
            onCreate={handleCreateGoal}
            loading={loading}
          />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Goal List
          </h2>
          <GoalList
            fetching={fetching}
            goals={goals}
            onDelete={handleDeleteGoal}
            loading={loading}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Goals;
