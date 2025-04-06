// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      {/* Image Section with fixed 4:3 aspect ratio */}
      <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
        <img
          src={product.image_ref}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Details Section */}
      <div className="p-2">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-1">{product.description}</p>
        <p className="text-base font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
