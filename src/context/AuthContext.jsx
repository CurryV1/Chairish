// src/context/AuthContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("mock_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, name = "") => {
    const newUser = { email, name };
    localStorage.setItem("mock_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const register = (email, name) => {
    // For mock purposes, registration is the same as login
    login(email, name);
  };

  const logout = () => {
    localStorage.removeItem("mock_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
