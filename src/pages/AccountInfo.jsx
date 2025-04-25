// src/pages/AccountInfo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountInfo = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/account");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Here’s your account info.
          </p>
        </div>

        <div className="rounded-md bg-yellow-500 p-6 shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-base text-gray-900">
              {user?.name || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-base text-gray-900">
              {user?.email || "N/A"}
            </p>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
