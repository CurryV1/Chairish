// // src/components/Navbar.jsx
// eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gray-200 p-4 shadow-md z-50 relative">
      <div className="container mx-auto flex items-center justify-between flex-nowrap">
        {/* Left Side: Logo and Page Links */}
        <div className="flex items-center">
          <Link to="/" className="text-black font-bold text-xl">
            Chairish
          </Link>
          <div className="hidden md:flex items-center ml-32 mr-16 space-x-6">
            <Link to="/livingroom" className="text-black text-lg">
              Living Room
            </Link>
            <Link to="/office" className="text-black text-lg">
              Office
            </Link>
            <Link to="/bedroom" className="text-black text-lg">
              Bedroom
            </Link>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-shrink-0 w-full max-w-sm md:ml-auto mr-32">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow border border-gray-300 rounded-l px-3 py-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white rounded-r px-4 py-1 hover:bg-green-600"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Side: Icons and Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/contactus" className="text-black text-lg">
            Contact Us
          </Link>
          <Link to="/faq" className="text-black text-lg">
            FAQ
          </Link>
          <Link
            to={user ? "/accountInfo" : "/account"}
            className="text-black text-lg"
          >
            Account
          </Link>
          <Link
            to="/cart"
            className="relative text-black text-lg"
            aria-label={`Cart with ${totalQuantity} item${
              totalQuantity === 1 ? "" : "s"
            }`}
          >
            <FaShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-6 bg-gray-100 rounded shadow space-y-6 text-center">
          {/* Page Links */}
          <div className="flex flex-col space-y-3">
            <Link
              to="/livingroom"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Living Room
            </Link>
            <Link
              to="/office"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Office
            </Link>
            <Link
              to="/bedroom"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Bedroom
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Go
            </button>
          </form>

          {/* Utility Links */}
          <div className="flex flex-col space-y-3">
            <Link
              to="/contactus"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              FAQ
            </Link>
            <Link
              to={user ? "/accountInfo" : "/account"}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Account
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 justify-center text-lg"
              aria-label={`Cart with ${totalQuantity} item${
                totalQuantity === 1 ? "" : "s"
              }`}
            >
              <FaShoppingCart />
              {totalQuantity > 0 && <span>{totalQuantity}</span>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
