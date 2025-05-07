// //src/components/PaymentForm.jsx
// import React from "react";

// const PaymentForm = ({payForm, setPayForm, setSubmittedForm}) => {
//     const nameRegex = /^[A-Za-z'-]{3,}$/;
//     const numberRegex = /^[0-9]{16,}$/;
//     const csvRegex = /^\d{3,}$/;
//     const provider = [
//         "American Express", "Capital One", "Chase", "Citi", "Discover",
//          "jetBlue", "MasterCard", "Visa"

//     ];
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const {
//             firstName,
//             lastName,
//             number,
//             csv
//         } = payForm;

//         // Validation
//         if (!nameRegex.test(firstName)) {
//             alert("Invalid First Name. Must be at least 3 characters and use only letters, hyphens, or apostrophes.");
//             return;
//         }
//         if (!nameRegex.test(lastName)) {
//             alert("Invalid Last Name. Must be at least 3 characters and use only letters, hyphens, or apostrophes.");
//             return;
//         }
//         if (!numberRegex.test(number)) {
//             alert("Invalid Card Number. Must be at least 16 numbers.");
//             return;
//         }
//         if (!csvRegex.test(csv)) {
//             alert("Invalid csv. Must be at least 3 numbers.");
//             return;
//         }
//         setSubmittedForm(payForm);
//         setPayForm({
//             firstName: "",
//             lastName: "",
//             provider: "",
//             number: "",
//             expDate: "",
//             csv: "",
//       });
//     };
//     return(
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="First Name"
//                 value={payForm.firstName}
//                 onChange={(e) => setPayForm({ ...payForm, firstName: e.target.value})}
//             ></input>
//             <input
//                 type="text"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Last Name"
//                 value={payForm.lastName}
//                 onChange={(e) => setPayForm({ ...payForm, lastName: e.target.value})}
//             ></input>
//             <br></br>
//             <select
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 value={payForm.provider}
//                 onChange={(e) => setPayForm({ ...payForm, provider: e.target.value})}
//             >
//                 <option value="">
//                     Select a Provider
//                 </option>
//                 {provider.map((name) => (<option key={name} value={name}>{name}</option>))}
//             </select>
//             <input
//                 type="number"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Card Number"
//                 value={payForm.number}
//                 onChange={(e) => setPayForm({ ...payForm, number: e.target.value})}
//             ></input>
//             <input
//                 type="month"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="Exp Date"
//                 min={new Date().toISOString().slice(0, 7)}
//                 value={payForm.expDate}
//                 onChange={(e) => setPayForm({ ...payForm, expDate: e.target.value})}
//             ></input>
//             <input
//                 type="number"
//                 className="m-2 outline-1 px-2 py-1 rounded bg-white text-black border border-gray-300"
//                 placeholder="CSV"
//                 value={payForm.csv}
//                 onChange={(e) => setPayForm({ ...payForm, csv: e.target.value})}
//             ></input>
//             <br></br>
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

// export default PaymentForm;

// src/components/PaymentForm.jsx
// import React from "react";

// const PaymentForm = ({ payForm, setPayForm }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPayForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const renderInput = (label, name, type = "text") => (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={payForm[name] || ""}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {renderInput("First Name", "firstName")}
//         {renderInput("Last Name", "lastName")}
//         {renderInput("Card Provider", "provider")}
//         {renderInput("Card Number", "number")}
//         {renderInput("Expiration Date (MM/YY)", "expDate")}
//         {renderInput("CVV", "csv")}
//       </div>
//       <p className="text-sm text-gray-500 mt-2">* Required field</p>
//     </>
//   );
// };

// export default PaymentForm;

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
