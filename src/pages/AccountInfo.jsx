// src/pages/AccountInfo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AccountInfo = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  const mockOrders = [
    {
      id: "A1234",
      date: "2025-04-22",
      items: ["Darcy Sofa", "Roanhowe Desk Chair"],
      total: "$659.98",
    },
    {
      id: "B5678",
      date: "2025-04-20",
      items: ["Chime Mattress"],
      total: "$189.99",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-500 px-4 py-12">
      <div className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Account Overview</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 underline"
          >
            Logout
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="text-base text-gray-900">{user?.name || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-base text-gray-900">{user?.email || "N/A"}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Purchase History
          </h3>
          {mockOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <li key={order.id} className="py-2">
                  <div className="text-sm font-medium text-gray-700">
                    Order #{order.id} • {order.date}
                  </div>
                  <div className="text-sm text-gray-600">
                    Items: {order.items.join(", ")} — Total: {order.total}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
