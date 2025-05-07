// // src/components/ProductListItemTwoColumn.jsx
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// const ProductListItemTwoColumn = ({ product }) => {
//   const { addToCart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     // For the prototype, simply add the whole product object
//     addToCart(product);
//   };

//   return (
//     <div tabIndex="0" className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
//       <div className="grid grid-cols-2 gap-4">
//         {/* Image Column with a fixed aspect ratio */}
//         <div className="overflow-hidden">
//           <div className="aspect-w-4 aspect-h-3">
//             <img
//               src={product.image_ref}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//         {/* Details Column */}
//         <div className="flex flex-col justify-center">
//           <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
//           <p className="text-gray-600 text-sm mb-1">{product.description}</p>
//           <p className="text-base font-bold">${product.price}</p>
//           {/* Buttons for Details and Add to Cart */}
//           <div className="flex space-x-2 mt-4">
//             {/* Details: Route to the product details screen */}
//             <Link
//               to={`/product/${product.id}`}
//               className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
//             >
//               Details
//             </Link>
//             {/* Add to Cart button */}
//             <button
//               onClick={handleAddToCart}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductListItemTwoColumn;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductListItemTwoColumn = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      tabIndex="0"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
      className="relative bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
    >
      {/* Toast - bottom right of card */}
      {justAdded && (
        <div
          className="absolute bottom-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded shadow-lg z-20 animate-fadeInOut"
          role="status"
          aria-live="assertive"
        >
          Added to Cart
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Image Column */}
        <div className="overflow-hidden">
          <div className="aspect-w-4 aspect-h-3">
            <img
              src={product.image_ref}
              alt={`Image of ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-center">
          <h2
            id={`product-title-${product.id}`}
            className="text-lg font-semibold mb-1"
          >
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-1">{product.description}</p>
          <p className="text-base font-bold">${product.price}</p>

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
              aria-pressed={justAdded}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItemTwoColumn;
