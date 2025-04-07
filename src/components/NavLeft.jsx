// src/components/NavLeft.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavLeft = () => {
  return (
    <div className="flex items-center">
      {/* Title remains unchanged */}
      <div className="flex-shrink-0">
        <Link to="/" className="text-black font-bold text-xl">
          Chairish
        </Link>
      </div>
      {/* Category Links container shifted right by 175px using inline style */}
      <div
        style={{ marginLeft: "175px" }}
        className="flex items-center space-x-6"
      >
        <Link to="/livingroom" className="text-black text-lg mr-12">
          Living Room
        </Link>
        <Link to="/office" className="text-black text-lg mr-12">
          Office
        </Link>
        <Link to="/bedroom" className="text-black text-lg mr-12">
          Bedroom
        </Link>
      </div>
    </div>
  );
};

export default NavLeft;
