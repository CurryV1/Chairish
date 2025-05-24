// src/components/AddressForm.jsx
import React from "react";

const AddressForm = ({ addForm, setAddForm, disabled = false }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (label, name, required = true) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        aria-label={label}
        aria-required={required}
        value={addForm[name] || ""}
        onChange={handleChange}
        disabled={disabled}
        className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <fieldset>
      <legend className="sr-only">Address Form</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderInput("First Name", "firstName")}
        {renderInput("Last Name", "lastName")}
        {renderInput("Street Address", "street1")}
        {renderInput("Street Address 2 (Optional)", "street2", false)}
        {renderInput("Apartment (Optional)", "apt", false)}
        {renderInput("City", "city")}
        {renderInput("State", "state")}
        {renderInput("ZIP Code", "zip")}
      </div>
      <p className="text-sm text-gray-500 mt-2">* Required field</p>
    </fieldset>
  );
};

export default AddressForm;
