// src/components/ProductCartCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCartCard = ({ product }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
      {/* Image Section */}
      <div className="w-40">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden mr-3">
          <img
            src={product.image_ref}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
      <div className="flex flex-col space-y-2 ml-4">
        <Link
          to={`/product/${product.id}`}
          className="bg-yellow-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-center text-sm"
        >
          Details
        </Link>
        <button
          onClick={() => removeFromCart(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center text-sm"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default ProductCartCard;
