// AuthModal.jsx
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState("login"); // "login" or "register"

  const switchToLogin = () => {
    setMode("login");
  };

  const switchToRegister = () => {
    setMode("register");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {mode === "login" && (
          <Login onClose={onClose} onSwitch={switchToRegister} />
        )}
        {mode === "register" && (
          <Register onClose={onClose} onSwitch={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
