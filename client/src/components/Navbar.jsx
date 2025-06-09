import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => setOpen(!open);

  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/transactions", label: "Transactions" },
    { to: "/budgets", label: "Budgets" },
    { to: "/goals", label: "Goals" },
    { to: "/reports", label: "Reports" },
    { to: "/tips", label: "Tips" },
  ];

  return (
    <nav className="bg-[#003366] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-white select-none">FINO</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-white hover:text-[#66A3FF] transition-colors duration-200"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-[#66A3FF] font-semibold border-b-2 border-[#66A3FF] pb-1 transition-colors duration-300"
                  : "text-white hover:text-[#66A3FF] transition-colors duration-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-[#007ACC] hover:bg-[#66A3FF] text-white font-semibold px-4 py-2 rounded-md shadow-md transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden bg-[#003366] px-6 pb-4 space-y-3 shadow-lg border-t border-[#004080]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-[#66A3FF] font-semibold border-l-4 border-[#66A3FF] pl-3 py-2 transition-colors duration-300"
                  : "block text-white hover:text-[#66A3FF] pl-3 py-2 transition-colors duration-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="w-full text-left text-[#66A3FF] font-semibold border-l-4 border-red-500 pl-3 py-2 hover:bg-[#00264d] rounded transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
