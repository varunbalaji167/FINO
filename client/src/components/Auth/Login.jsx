import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({ onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users/login`,
        { email, password }
      );

      const user = response.data.user;
      const token = response.data.token;
      login({ ...user, token });

      toast.success("Logged in successfully!", {
        style: {
          border: "1px solid #003366",
          padding: "16px",
          color: "#003366",
          background: "#E6F0FF",
        },
        iconTheme: {
          primary: "#003366",
          secondary: "#FFFFFF",
        },
      });

      onClose();
    } catch (error) {
      toast.error("Invalid email or password.", {
        style: {
          border: "1px solid #D32D41",
          padding: "16px",
          color: "#D32D41",
          background: "#FDECEA",
        },
        iconTheme: {
          primary: "#D32D41",
          secondary: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
        Login to FINO
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-[#003366] font-semibold mb-1">
            Email
          </label>
          <div className="flex items-center px-3 py-2 border border-[#E0E0E0] rounded-lg bg-[#FFFFFF] focus-within:ring-2 focus-within:ring-[#66A3FF]">
            <FaEnvelope className="text-[#007ACC] mr-2" />
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-[#242C34]"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#003366] font-semibold mb-1">
            Password
          </label>
          <div className="flex items-center px-3 py-2 border border-[#E0E0E0] rounded-lg bg-[#FFFFFF] focus-within:ring-2 focus-within:ring-[#66A3FF]">
            <FaLock className="text-[#007ACC] mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-[#242C34]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-[#007ACC] focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-[#66A3FF] cursor-not-allowed"
              : "bg-[#003366] hover:bg-[#007ACC]"
          } flex justify-center items-center gap-3`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          Login
        </button>
      </form>

      <div className="mt-4 text-center text-[#4A6572] text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onSwitch();
          }}
          className="text-[#007ACC] hover:underline font-semibold"
        >
          Register here
        </button>
      </div>
    </>
  );
};

export default Login;
