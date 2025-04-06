// src/components/NavRight.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavRight = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Search Bar with extra right margin */}
      <div className="max-w-md w-full mr-48">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-grow border border-gray-300 rounded-l px-3 py-1 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r px-4 py-1 hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      {/* Secondary Links */}
      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-black text-lg mr-12">
          About Us
        </Link>
        <Link to="/faq" className="text-black text-lg mr-12">
          FAQ
        </Link>
        <Link to="/account" className="text-black text-lg mr-12">
          Account
        </Link>
        <Link to="/cart" className="text-black text-lg">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default NavRight;
