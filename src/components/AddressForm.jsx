// //src/components/AddressForm.jsx
// import React from "react";

// const AddressForm = ({addForm, setAddForm, setSubmittedForm}) => {
//     const nameRegex = /^[A-Za-z'-]{2,}$/; // at least 3 letters, only letters, apostrophes, hyphens
//     const streetRegex = /^\d+.*[A-Za-z]+.*/; // starts with numbers, contains at least one letter
//     const cityRegex = /^[A-Za-z'-\s]+$/; // only letters, hyphens, apostrophes, and spaces
//     const zipRegex = /^\d{5,}$/; // exactly 5 digits
//     const usStates = [
//         "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
//         "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
//         "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
//         "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
//         "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
//     ];
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const {
//             firstName,
//             lastName,
//             street1,
//             city,
//             zip
//         } = addForm;

//         // Validation
//         if (!nameRegex.test(firstName)) {
//             alert("Invalid First Name. Must be at least 3 characters and use only letters, hyphens, or apostrophes.");
//             return;
//         }
//         if (!nameRegex.test(lastName)) {
//             alert("Invalid Last Name. Must be at least 3 characters and use only letters, hyphens, or apostrophes.");
//             return;
//         }
//         if (!streetRegex.test(street1)) {
//             alert("Invalid Street Address. Must start with numbers and include letters.");
//             return;
//         }
//         if (!cityRegex.test(city)) {
//             alert("Invalid City. Use only letters, hyphens, apostrophes, or spaces.");
//             return;
//         }
//         if (!zipRegex.test(zip)) {
//             alert("Invalid Zip Code. Must be exactly 5 digits.");
//             return;
//         }
//         setSubmittedForm(addForm);
//         setAddForm({
//             firstName: "",
//             lastName: "",
//             street1: "",
//             street2: "",
//             apt: "",
//             city: "",
//             state: "",
//             zip: "",
//         });

//     };
//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="First Name"
//                 value={addForm.firstName}
//                 onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value})}
//             ></input>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Last Name"
//                 value={addForm.lastName}
//                 onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value})}
//             ></input>
//             <br></br>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Street Name 1"
//                 value={addForm.street1}
//                 onChange={(e) => setAddForm({ ...addForm, street1: e.target.value})}
//             ></input>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Street Name 2 (Optional)"
//                 value={addForm.street2}
//                 onChange={(e) => setAddForm({ ...addForm, street2: e.target.value})}
//                 ></input>
//             <input
//                 type="number"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Apt #"
//                 value={addForm.apt}
//                 onChange={(e) => setAddForm({ ...addForm, apt: e.target.value})}
//             ></input>
//             <br></br>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="City"
//                 value={addForm.city}
//                 onChange={(e) => setAddForm({ ...addForm, city: e.target.value})}
//             ></input>
//             <select
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 value={addForm.state}
//                 onChange={(e) => setAddForm({ ...addForm, state: e.target.value})}
//             >
//                 <option value="">
//                     Select a State
//                 </option>{usStates.map((abbr) => (<option key={abbr} value={abbr}>{abbr}</option>))}
//             </select>
//             <input
//                 type="number"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Zip Code"
//                 value={addForm.zip}
//                 onChange={(e) => setAddForm({ ...addForm, zip: e.target.value})}
//                 ></input>
//             <br></br>
//             <button
//                 type="submit"
//                 className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold
//                 bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default AddressForm;

// src/components/AddressForm.jsx
import React from "react";

const AddressForm = ({ addForm, setAddForm, disabled = false }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (label, name, required = true) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={addForm[name] || ""}
        onChange={handleChange}
        disabled={disabled}
        className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <>
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
    </>
  );
};

export default AddressForm;
