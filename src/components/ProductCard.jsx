// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="w-full mb-4">
        <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
          <img
            src={product.image_ref}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* Text Section anchored at the bottom */}
      <div className="p-4 mt-auto">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
