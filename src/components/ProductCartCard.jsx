// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// const ProductCartCard = ({ product }) => {
//   const { addToCart, decrementCartItem, removeLineItem } =
//     useContext(CartContext);

//   return (
//     <div className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
//       {/* Left: Product Information */}
//       <div className="flex-grow">
//         <h2 className="text-xl font-bold">{product.name}</h2>
//         <p className="text-gray-600">{product.description}</p>
//         <p className="text-lg font-bold">${product.price}</p>
//         {/* Quantity display with plus/minus controls to its right */}
//         <div className="flex items-center mt-2">
//           <span className="text-md font-semibold">
//             Quantity: {product.quantity}
//           </span>
//           <div className="flex items-center ml-2 gap-x-1">
//             <button
//               onClick={() => decrementCartItem(product.id)}
//               className="px-2 py-1 border rounded text-sm"
//             >
//               −
//             </button>
//             <button
//               onClick={() => addToCart(product)}
//               className="px-2 py-1 border rounded text-sm"
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Right: Vertical buttons for Details and Remove */}
//       <div className="flex flex-col space-y-2 ml-4">
//         <Link
//           to={`/product/${product.id}`}
//           className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-center text-sm"
//         >
//           Details
//         </Link>
//         <button
//           onClick={() => removeLineItem(product.id)}
//           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-center text-sm"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCartCard;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCartCard = ({ product }) => {
  const { addToCart, decrementCartItem, removeLineItem } =
    useContext(CartContext);

  return (
    <article
      className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between"
      aria-label={`Cart item: ${product.name}`}
    >
      {/* Left: Product Info */}
      <div className="flex-grow">
        <h2 className="text-xl font-bold" tabIndex={0}>
          {product.name}
        </h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>

        {/* Quantity Controls */}
        <div
          className="flex items-center mt-2"
          role="group"
          aria-labelledby={`quantity-${product.id}`}
        >
          <span
            id={`quantity-${product.id}`}
            className="text-md font-semibold"
            aria-live="polite"
            aria-atomic="true"
          >
            Quantity: {product.quantity}
          </span>

          <div className="flex items-center ml-2 gap-x-1">
            <button
              onClick={() => decrementCartItem(product.id)}
              className="px-2 py-1 border rounded text-sm"
              aria-label={`Decrease quantity of ${product.name}`}
            >
              −
            </button>
            <button
              onClick={() => addToCart(product)}
              className="px-2 py-1 border rounded text-sm"
              aria-label={`Increase quantity of ${product.name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex flex-col space-y-2 ml-4">
        <Link
          to={`/product/${product.id}`}
          className="bg-yellow-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-center text-sm"
          aria-label={`View details for ${product.name}`}
        >
          Details
        </Link>
        <button
          onClick={() => removeLineItem(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-center text-sm"
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default ProductCartCard;
