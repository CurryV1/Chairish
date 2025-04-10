//src/components/AddressForm.jsx
import React from "react";

const AddressForm = ({addForm, setAddForm, setSubmittedForm}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedForm(addForm);
        setAddForm({
            firstName: "",
            lastName: "",
            street1: "",
            street2: "",
            apt: "",
            city: "",
            state: "",
            zip: "",
          });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="m-2 outline-1" placeholder="First Name" value={addForm.firstName} onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value})}></input>
            <input type="text" className="m-2 outline-1" placeholder="Last Name" value={addForm.lastName} onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value})}></input>
            <br></br>
            <input type="text" className="m-2 outline-1" placeholder="Street Name 1" value={addForm.street1} onChange={(e) => setAddForm({ ...addForm, street1: e.target.value})}></input>
            <input type="text" className="m-2 outline-1" placeholder="Street Name 2 (Optional)" value={addForm.street2} onChange={(e) => setAddForm({ ...addForm, street2: e.target.value})}></input>
            <input type="number" className="m-2 outline-1" placeholder="Apt #" value={addForm.apt} onChange={(e) => setAddForm({ ...addForm, apt: e.target.value})}></input>
            <br></br>
            <input type="text" className="m-2 outline-1" placeholder="City" value={addForm.city} onChange={(e) => setAddForm({ ...addForm, city: e.target.value})}></input>
            <input type="text" className="m-2 outline-1" placeholder="State" value={addForm.state} onChange={(e) => setAddForm({ ...addForm, state: e.target.value})}></input>
            <input type="number" className="m-2 outline-1" placeholder="Zip Code" value={addForm.zip} onChange={(e) => setAddForm({ ...addForm, zip: e.target.value})}></input>
            <br></br>
            <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
            bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2" 
            href="/checkout">Submit</button>
        </form>
    );
};

export default AddressForm;