// // src/components/ProductCard.jsx
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useContext(CartContext);
//   const [showToast, setShowToast] = useState(false);

//   const handleAddToCart = () => {
//     addToCart(product);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 1500);
//   };

//   return (
//     <motion.div
//       className="relative bg-white rounded-md border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
//       initial={{ opacity: 0, scale: 0.95 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* Toast - bottom right */}
//       {showToast && (
//         <div className="absolute bottom-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded shadow-lg z-20 animate-fadeInOut">
//           Added to Cart
//         </div>
//       )}

//       {/* Image Section */}
//       <div className="w-full">
//         <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
//           <img
//             src={product.image_ref}
//             alt={product.name}
//             loading="lazy"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Text Section */}
//       <div className="p-4 mt-auto">
//         <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//         <p className="text-gray-600 mb-2">{product.description}</p>
//         <p className="text-lg font-bold">${product.price}</p>

//         {/* Buttons */}
//         <div className="flex space-x-2 mt-4">
//           <Link
//             to={`/product/${product.id}`}
//             className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
//           >
//             Details
//           </Link>
//           <button
//             onClick={handleAddToCart}
//             className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;

// src/components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <motion.div
      className="relative bg-white rounded-md border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Toast for screen readers */}
      {showToast && (
        <div
          className="absolute bottom-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded shadow-lg z-20 animate-fadeInOut"
          role="status"
          aria-live="polite"
        >
          Added {product.name} to cart
        </div>
      )}

      {/* Image */}
      <div className="w-full">
        <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
          <img
            src={product.image_ref}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Details */}
      <div className="p-4 mt-auto">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>

        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <Link
            to={`/product/${product.id}`}
            className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
            aria-label={`View details for ${product.name}`}
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
