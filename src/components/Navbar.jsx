import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="text-2xl font-bold text-gray-800">LOGO</div>

        {/* Center Section - Primary Navigation */}
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Living Room
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Office
          </a>

          <a href="#" className="text-gray-600 hover:text-gray-900">
            Bedroom
          </a>
        </nav>

        {/* Right Section - Secondary Navigation */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <a href="#" className="text-gray-600 hover:text-gray-900">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            FAQ
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Account
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Cart
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
