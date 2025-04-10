// src/pages/Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import ProductCartCard from "../components/ProductCartCard";
import OrderSummary from "../components/OrderSummary";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  // Get cart items from our CartContext
  const { cartItems } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);

  // Recompute subtotal when cartItems change
  useEffect(() => {
    const totalSum = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    setSubTotal(totalSum);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate("/checkout", { state: { subTotal } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Cart Items */}
          <div className="col-span-2 bg-gray-200 rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto">
            {cartItems.map((product) => (
              <ProductCartCard key={product.id} product={product} />
            ))}
          </div>
          {/* Right: Order Summary */}
          <div className="col-span-1 bg-gray-200 rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto">
            <h3 className="p-2 text-2xl font-bold mb-4">Order Summary</h3>
            <hr className="p-2" />
            <OrderSummary subTotal={subTotal} />
            <hr className="p-2" />
            <div className="p-10 flex flex-col sm:flex-row justify-between">
              <button
                type="button"
                className="inline-flex gap-2 justify-center rounded-full px-4 py-2 font-semibold bg-yellow-500 text-white hover:bg-amber-600 mb-4 sm:mb-0"
                href="/"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="inline-flex gap-2 justify-center rounded-full px-4 py-2 font-semibold bg-green-600 text-white hover:bg-green-700"
                onClick={handleCheckout}
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
