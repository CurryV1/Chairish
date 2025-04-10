//src/components/addForm.jsx
import React from "react";

const addForm = ({addForm, setAddForm, setSubmittedForm}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedForm(addForm);
        setAddForm({
            firstName: "",
            lastName: "",
            provider: "",
            number: "",
            expDate: "",
            csv: "",
      });
    };
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" className="m-2 outline-1" placeholder="First Name" value={addForm.firstName} onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value})}></input>
            <input type="text" className="m-2 outline-1" placeholder="Last Name" value={addForm.lastName} onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value})}></input>
            <br></br>
            <input type="text" className="m-2 outline-1" placeholder="Card Provider" value={addForm.provider} onChange={(e) => setAddForm({ ...addForm, provider: e.target.value})}></input>
            <input type="number" className="m-2 outline-1" placeholder="Card Number" value={addForm.number} onChange={(e) => setAddForm({ ...addForm, number: e.target.value})}></input>
            <input type="month" className="m-2 outline-1" placeholder="Exp Date" value={addForm.expDate} onChange={(e) => setAddForm({ ...addForm, expDate: e.target.value})}></input>
            <input type="number" className="m-2 outline-1" placeholder="CSV" value={addForm.csv} onChange={(e) => setAddForm({ ...addForm, csv: e.target.value})}></input>
            <br></br>
            <br></br>
            <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
            bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2" 
            href="/checkout">Submit</button>
        </form>
    );
};

export default addForm;