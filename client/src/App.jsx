import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";
import Transaction from "./components/Transaction/Transaction";
import Dashboard from "./components/Dashboard/Dashboard";
import BudgetsPage from "./components/Budget/BudgetsPage";
import Goals from "./components/Goals/Goals";
import Reports from "./components/Reports/Reports";
import TipsPage from "./components/TipsPage";
import HomePage from "./components/HomePage";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Checking auth...</p>;
  return user && user.token ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              fontSize: "14px",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <PrivateRoute>
                <BudgetsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <PrivateRoute>
                <Goals />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/tips"
            element={
              <PrivateRoute>
                <TipsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
