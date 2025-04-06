import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="text-2xl font-bold text-gray-800">LOGO</div>

        {/* Center Section - Primary Navigation */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/livingroom" href="#" className="text-gray-600 hover:text-gray-900">
            Living Room
          </Link>
          <Link to="/office" className="text-gray-600 hover:text-gray-900">
            Office
          </Link>

          <Link to="/bedroom" className="text-gray-600 hover:text-gray-900">
            Bedroom
          </Link>
        </nav>

        {/* Right Section - Secondary Navigation */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/contactus" className="text-gray-600 hover:text-gray-900">
            About Us
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          <Link to="/account" className="text-gray-600 hover:text-gray-900">
            Account
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
