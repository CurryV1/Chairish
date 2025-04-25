// src/components/ProductCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      className="bg-white rounded-md border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Section */}
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

      {/* Text Section anchored at the bottom */}
      <div className="p-4 mt-auto">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>

        {/* Buttons for Details and Add to Cart */}
        <div className="flex space-x-2 mt-4">
          <Link
            to={`/product/${product.id}`}
            className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
