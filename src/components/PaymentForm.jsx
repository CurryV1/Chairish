// src/components/PaymentForm.jsx
import React from "react";

const PaymentForm = ({ payForm, setPayForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (label, name, type = "text") => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={payForm[name] || ""}
        onChange={handleChange}
        aria-label={label}
        aria-required="true"
        className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <fieldset>
      <legend className="sr-only">Payment Information</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderInput("First Name", "firstName")}
        {renderInput("Last Name", "lastName")}
        {renderInput("Card Provider", "provider")}
        {renderInput("Card Number", "number")}
        {renderInput("Expiration Date (MM/YY)", "expDate")}
        {renderInput("CVV", "csv")}
      </div>
      <p className="text-sm text-gray-500 mt-2">* Required field</p>
    </fieldset>
  );
};

export default PaymentForm;
