import React, { useState, useEffect } from "react";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const [subTotal, setTotal] = useState(0); // Subtotal of selected products
  const [loading, setLoading] = useState(true);
  const [submittedMailAddress, setSubmittedMailAddress] = useState(null);
  const [submittedBillAddress, setSubmittedBillAddress] = useState(null);
  const [submittedPayment, setSubmittedPayment] = useState(null);
  const [sameAsMailing, setSameAsMailing] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [mailForm, setMailForm] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  })
  const [billForm, setBillForm] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  })
  const [paymentForm, setPaymentForm] = useState({
    firstName: "",
    lastName: "",
    provider: "",
    number: "",
    expDate: "",
    csv: "",
  })
  const clearForm = (formSetter) => {
    formSetter(null);
  };
  const handleMailSubmit = (e) => {
    e.preventDefault();
    setSubmittedMailAddress(mailForm); // Save it
    setMailForm({                      // Then clear it
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
  const handleBillSubmit = (e) => {
    e.preventDefault();
    setSubmittedBillAddress(billForm);
    setBillForm({
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
  const handlePayment = (e) => {
    e.preventDefault();
    setSubmittedPayment(paymentForm);
    setPaymentForm({
      firstName: "",
      lastName: "",
      provider: "",
      number: "",
      expDate: "",
      csv: "",
    });
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentSubmitted(true);
    clearForm(setSubmittedMailAddress);
    clearForm(setSubmittedBillAddress);
    clearForm(setSubmittedPayment);
    setTimeout(() => {
        setPaymentSubmitted(false);
    }, 3000);
  }

  const handleCheckboxChange = () => {
    setSameAsMailing(!sameAsMailing);
    if (!sameAsMailing) {
      setSubmittedBillAddress({ ...submittedMailAddress }); // Copy mailing address to billing address
    } else {
      setSubmittedBillAddress({}); // Clear billing address if unchecked
    }
  };

  //Fetch products
  useEffect(() => {
      fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
          const selected = data.filter((product) => product.selected === 1);

          const totalSum = selected.reduce((acc, product) => {
          const price = parseFloat(product.price);
          return acc + (isNaN(price) ? 0 : price);
          }, 0);

          setTotal(totalSum);
          setLoading(false);
      })
      .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false);
      });
  }, []);

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {loading ? (
        <p>Loading Order...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 grid-rows-3 gap-4 bg-yellow-500 border-amber-500">
          <div className="grid col-span-2 row-span-3 grid-rows-3 gap-4 bg-yellow-500 h-200 border-amber-500">
            <div className="col-span-2 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto duration-300">
              <h3 className="p-2 text-2xl font-bold mb-4">Mailing Address</h3>
              <br></br>
              <form onSubmit={handleMailSubmit}>
                <input type="text" className="m-2 outline-1" placeholder="First Name" value={mailForm.firstName} onChange={(e) => setMailForm({ ...mailForm, firstName: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="Last Name" value={mailForm.lastName} onChange={(e) => setMailForm({ ...mailForm, lastName: e.target.value})}></input>
                <br></br>
                <input type="text" className="m-2 outline-1" placeholder="Street Name 1" value={mailForm.street1} onChange={(e) => setMailForm({ ...mailForm, street1: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="Street Name 2 (Optional)" value={mailForm.street2} onChange={(e) => setMailForm({ ...mailForm, street2: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="Apt #" value={mailForm.apt} onChange={(e) => setMailForm({ ...mailForm, apt: e.target.value})}></input>
                <br></br>
                <input type="text" className="m-2 outline-1" placeholder="City" value={mailForm.city} onChange={(e) => setMailForm({ ...mailForm, city: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="State" value={mailForm.state} onChange={(e) => setMailForm({ ...mailForm, state: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="Zip Code" value={mailForm.zip} onChange={(e) => setMailForm({ ...mailForm, zip: e.target.value})}></input>
                <br></br>
                <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
                bg-blue-800 text-white hover:bg-blue-950 focus-visile:outline-2" 
                href="/checkout">Submit</button>
              </form>
            </div>
            
            <div className="col-span-2 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto duration-300">
              <h3 className="p-2 text-2xl font-bold mb-4">Billing Address</h3>
              <label className="ml-2"><input type="checkbox" className="outline-1" checked={sameAsMailing} onChange={handleCheckboxChange}></input> Same as Mailing Address</label>
              <form onSubmit={handleBillSubmit}>
                <input type="text" className="m-2 outline-1" placeholder="First Name" value={billForm.firstName} onChange={(e) => setBillForm({ ...billForm, firstName: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="Last Name" value={billForm.lastName} onChange={(e) => setBillForm({ ...billForm, lastName: e.target.value})}></input>
                <br></br>
                <input type="text" className="m-2 outline-1" placeholder="Street Name 1" value={billForm.street1} onChange={(e) => setBillForm({ ...billForm, street1: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="Street Name 2 (Optional)" value={billForm.street2} onChange={(e) => setBillForm({ ...billForm, street2: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="Apt #" value={billForm.apt} onChange={(e) => setBillForm({ ...billForm, apt: e.target.value})}></input>
                <br></br>
                <input type="text" className="m-2 outline-1" placeholder="City" value={billForm.city} onChange={(e) => setBillForm({ ...billForm, city: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="State" value={billForm.state} onChange={(e) => setBillForm({ ...billForm, state: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="Zip Code" value={billForm.zip} onChange={(e) => setBillForm({ ...billForm, zip: e.target.value})}></input>
                <br></br>
                <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
                bg-blue-800 text-white hover:bg-blue-950 focus-visile:outline-2" 
                href="/checkout">Submit</button>
              </form>
            </div>
            
            <div className="col-span-2 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto duration-300">
              <h3 className="p-2 text-2xl font-bold mb-4">Payment Method</h3>
              <br></br>
              <form onSubmit={handlePayment}>
                <input type="text" className="m-2 outline-1" placeholder="First Name" value={paymentForm.firstName} onChange={(e) => setPaymentForm({ ...paymentForm, firstName: e.target.value})}></input>
                <input type="text" className="m-2 outline-1" placeholder="Last Name" value={paymentForm.lastName} onChange={(e) => setPaymentForm({ ...paymentForm, lastName: e.target.value})}></input>
                <br></br>
                <input type="text" className="m-2 outline-1" placeholder="Card Provider" value={paymentForm.provider} onChange={(e) => setPaymentForm({ ...paymentForm, provider: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="Card Number" value={paymentForm.number} onChange={(e) => setPaymentForm({ ...paymentForm, number: e.target.value})}></input>
                <input type="month" className="m-2 outline-1" placeholder="Exp Date" value={paymentForm.expDate} onChange={(e) => setPaymentForm({ ...paymentForm, expDate: e.target.value})}></input>
                <input type="number" className="m-2 outline-1" placeholder="CSV" value={paymentForm.csv} onChange={(e) => setPaymentForm({ ...paymentForm, csv: e.target.value})}></input>
                <br></br>
                <br></br>
                <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
                bg-blue-800 text-white hover:bg-blue-950 focus-visile:outline-2" 
                href="/checkout">Submit</button>
              </form>
            </div>
          </div>

          <div className="col-span-1 row-span-3 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="p-2 text-2xl font-bold mb-4 ">Order Summary</h3>
            <hr className="p-2"></hr>
                <OrderSummary subTotal={subTotal} />
            <hr></hr>
              <h3 className="pl-2 font-bold mb-4">Mailing Address</h3>
              {submittedMailAddress && (  
                <div className="pl-2 text-md leading-relaxed">
                  {submittedMailAddress.firstName} {submittedMailAddress.lastName}<br />
                  {submittedMailAddress.street1}<br />
                  {submittedMailAddress.street2 && <>{submittedMailAddress.street2}<br /></>}
                  {submittedMailAddress.apt && <>Apt {submittedMailAddress.apt}<br /></>}
                  {submittedMailAddress.city}, {submittedMailAddress.state} {submittedMailAddress.zip}
                </div>
              )}
            <hr></hr>
              <h3 className="pl-2 font-bold mb-4">Billing Address</h3>
              {submittedBillAddress && (  
                <div className="pl-2 text-md leading-relaxed">
                  {submittedBillAddress.firstName} {submittedBillAddress.lastName}<br />
                  {submittedBillAddress.street1}<br />
                  {submittedBillAddress.street2 && <>{submittedBillAddress.street2}<br /></>}
                  {submittedBillAddress.apt && <>Apt {submittedBillAddress.apt}<br /></>}
                  {submittedBillAddress.city}, {submittedBillAddress.state} {submittedBillAddress.zip}
                </div>
              )}
            <hr className=""></hr>
              <h3 className="pl-2 font-bold mb-4">Payment Method</h3>
              {submittedPayment && (  
                <div className="pl-2 text-md leading-relaxed">
                {submittedPayment.firstName} {submittedPayment.lastName}<br />
                {submittedPayment.provider} {" ..."}
                {submittedPayment.number.slice(-4)}
                </div>
              )}
            <hr></hr>
            <form className="p-10" onSubmit={handlePaymentSubmit}>
              <button type="submit" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
              bg-blue-800 text-white hover:bg-blue-950 focus-visile:outline-2">Make Payment</button>
            </form>
            {paymentSubmitted &&(
              <div className="popup-notice">
                <div className="popup-content">
                  <p>Order has been Placed!</p>
                </div>
              </div>
            )}
            <style jsx>{`
              .popup-notice {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
              }
              .popup-content {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Checkout;