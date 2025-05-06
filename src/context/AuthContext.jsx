// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("mock_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [orderHistory, setOrderHistory] = useState([]); // New state for orders

  const login = (email, name = "") => {
    const newUser = { email, name };
    localStorage.setItem("mock_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const register = (email, name) => {
    login(email, name);
  };

  const logout = () => {
    localStorage.removeItem("mock_user");
    setUser(null);
    setOrderHistory([]); // Clear session-based history on logout
  };

  // New method: Add order to session-based history
  const addOrderToHistory = (order) => {
    setOrderHistory((prev) => [...prev, order]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        orderHistory,
        addOrderToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
