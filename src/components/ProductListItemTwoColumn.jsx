// src/components/ProductListItemTwoColumn.jsx
import React from "react";
import SendToCart from "./SendToCart";

const ProductListItemTwoColumn = ({ product }) => {
  return (
    <div tabIndex="0" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Image Column with a fixed aspect ratio */}
        <div className="overflow-hidden">
          <div className="aspect-w-4 aspect-h-3">
            <img
              src={product.image_ref}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Details Column */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-1">{product.description}</p>
          <p className="text-base font-bold">${product.price}</p>
          <SendToCart product ={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductListItemTwoColumn;
