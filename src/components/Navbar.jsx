// src/components/Navbar.jsx
import React from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLeft />
        <NavRight />
      </div>
    </nav>
  );
};

export default Navbar;
