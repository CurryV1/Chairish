// // src/components/Navbar.jsx
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { CartContext } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const [query, setQuery] = useState("");
//   const { cartItems } = useContext(CartContext);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim() !== "") {
//       navigate(`/search?query=${encodeURIComponent(query.trim())}`);
//       setQuery("");
//     }
//   };

//   return (
//     <nav className="bg-gray-200 p-4">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         {/* Left Side: Title and Category Links */}
//         <div className="flex items-center w-full md:w-auto">
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-black font-bold text-xl">
//               Chairish
//             </Link>
//           </div>
//           <div
//             style={{ marginLeft: "175px" }}
//             className="flex items-center space-x-6"
//           >
//             <Link to="/livingroom" className="text-black text-lg mr-12">
//               Living Room
//             </Link>
//             <Link to="/office" className="text-black text-lg mr-12">
//               Office
//             </Link>
//             <Link to="/bedroom" className="text-black text-lg mr-12">
//               Bedroom
//             </Link>
//           </div>
//         </div>

//         {/* Right Side: Search Bar, Secondary Links, and Cart Icon */}
//         <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0 justify-center md:justify-end">
//           {/* Search Bar */}
//           <div className="w-full sm:w-auto max-w-md md:mr-16">
//             <form onSubmit={handleSubmit} className="flex">
//               <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="flex-grow border border-gray-300 rounded-l px-3 py-1 focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="bg-yellow-500 text-white rounded-r px-4 py-1 hover:bg-green-600"
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Secondary Links and Cart Icon */}
//           <div className="flex flex-wrap items-center gap-4 justify-center">
//             <Link
//               to="/contactus"
//               className="text-black text-lg mr-12 whitespace-nowrap"
//             >
//               Contact Us
//             </Link>
//             <Link to="/faq" className="text-black text-lg mr-12">
//               FAQ
//             </Link>
//             <Link
//               to={user ? "/accountInfo" : "/account"}
//               className="text-black text-lg mr-12"
//             >
//               Account
//             </Link>
//             <Link to="/cart" className="relative text-black text-lg">
//               <FaShoppingCart size={24} />
//               {totalQuantity > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
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
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo + Page Links */}
        <div className="flex items-center">
          <Link to="/" className="text-black font-bold text-xl">
            Chairish
          </Link>
          <div className="hidden md:flex items-center ml-48 space-x-8">
            <Link to="/livingroom" className="text-black text-lg mr-12">
              Living Room
            </Link>
            <Link to="/office" className="text-black text-lg mr-12">
              Office
            </Link>
            <Link to="/bedroom" className="text-black text-lg">
              Bedroom
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex w-full md:w-auto max-w-lg mr-8">
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

        {/* Icons + Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/contactus" className="text-black text-lg mr-8">
            Contact Us
          </Link>
          <Link to="/faq" className="text-black text-lg mr-8">
            FAQ
          </Link>
          <Link
            to={user ? "/accountInfo" : "/account"}
            className="text-black text-lg mr-8"
          >
            Account
          </Link>
          <Link to="/cart" className="relative text-black text-lg">
            <FaShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          <Link to="/livingroom" onClick={() => setIsMenuOpen(false)}>
            Living Room
          </Link>
          <Link to="/office" onClick={() => setIsMenuOpen(false)}>
            Office
          </Link>
          <Link to="/bedroom" onClick={() => setIsMenuOpen(false)}>
            Bedroom
          </Link>
          <form onSubmit={handleSubmit} className="flex justify-center px-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow border border-gray-300 rounded-l px-3 py-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white rounded-r px-4 py-1 hover:bg-green-600"
            >
              Go
            </button>
          </form>
          <Link to="/contactus" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
            FAQ
          </Link>
          <Link
            to={user ? "/accountInfo" : "/account"}
            onClick={() => setIsMenuOpen(false)}
          >
            Account
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-2 justify-center"
          >
            <FaShoppingCart />
            {totalQuantity > 0 && <span>{totalQuantity}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
