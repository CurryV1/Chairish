// src/components/ProductCartCard.jsx
import React from "react";

const ProductCartCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer aspect-h-3">
      {/* Image Section with fixed 4:3 aspect ratio */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <img
            src={product.image_ref}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      {/* Details Section */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-1">{product.description}</p>
          <p className="text-base font-bold">${product.price}</p>
          <a className="p-2 float-right gap-2 inline-flex justify-center" href="/cart">Remove Item</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
