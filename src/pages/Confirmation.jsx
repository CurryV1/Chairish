// src/pages/Confirmation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("recentOrder"));

  if (!order) {
    // If someone comes here directly, send them home
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Order Placed Successfully!
        </h1>
        <p className="mb-4 text-lg">
          Thank you for your purchase. Your order{" "}
          <span className="font-mono bg-gray-200 px-2 rounded">
            {order.orderId}
          </span>{" "}
          was placed on <span className="font-semibold">{order.date}</span>.
        </p>
        <div className="mb-4">
          <h2 className="font-bold">
            Order Total:{" "}
            <span className="text-green-700">${order.subTotal.toFixed(2)}</span>
          </h2>
        </div>
        <div className="mb-2">
          <h3 className="font-semibold">Mailing Address</h3>
          <div className="text-sm text-gray-700">
            {order.mailAddress.firstName} {order.mailAddress.lastName},{" "}
            {order.mailAddress.street1}
            {order.mailAddress.street2 ? `, ${order.mailAddress.street2}` : ""}
            {order.mailAddress.apt
              ? `, Apt ${order.mailAddress.apt}`
              : ""}, {order.mailAddress.city}, {order.mailAddress.state}{" "}
            {order.mailAddress.zip}
          </div>
        </div>
        <div className="mb-2">
          <h3 className="font-semibold">Billing Address</h3>
          <div className="text-sm text-gray-700">
            {order.billAddress.firstName} {order.billAddress.lastName},{" "}
            {order.billAddress.street1}
            {order.billAddress.street2 ? `, ${order.billAddress.street2}` : ""}
            {order.billAddress.apt
              ? `, Apt ${order.billAddress.apt}`
              : ""}, {order.billAddress.city}, {order.billAddress.state}{" "}
            {order.billAddress.zip}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold">Payment</h3>
          <div className="text-sm text-gray-700">
            {order.payment.provider} ending in{" "}
            <span className="font-mono">{order.payment.number.slice(-4)}</span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Items:</h3>
          <ul className="list-disc ml-6">
            {order.cartItems.map((item, idx) => (
              <li key={idx}>
                {item.name} (${item.price})
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800"
          onClick={() => navigate("/")}
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
