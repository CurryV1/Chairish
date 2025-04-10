//src/pages/Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import { CartContext } from "../context/CartContext";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const { clearCart } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);
  const [submittedMailAddress, setSubmittedMailAddress] = useState(null);
  const [submittedBillAddress, setSubmittedBillAddress] = useState(null);
  const [submittedPayment, setSubmittedPayment] = useState(null);
  const [sameAsMailing, setSameAsMailing] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();

  // Recompute subtotal when cartItems change
  useEffect(() => {
    const totalSum = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    setLoading(false);
    setSubTotal(totalSum);
  }, [cartItems]);
  const addressForm = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });
  const [mailForm, setMailForm] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });
  const [billForm, setBillForm] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    firstName: "",
    lastName: "",
    provider: "",
    number: "",
    expDate: "",
    csv: "",
  });
  const clearAddForm = (formSetter) => {
    formSetter(addressForm);
  };
  const clearPayForm = (formSetter) => {
    formSetter(paymentForm);
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!submittedMailAddress || !submittedBillAddress || !submittedPayment) {
      setErrorMessage("Please complete all sections before submitting your order.");
      setPaymentSubmitted(false); // just in case it was previously set
      return;
    }
    setErrorMessage("");
    setPaymentSubmitted(true);
    clearAddForm(setSubmittedMailAddress);
    clearAddForm(setSubmittedBillAddress);
    clearPayForm(setSubmittedPayment);
    clearCart();
    setTimeout(() => {
        setPaymentSubmitted(false);
        navigate("/");
    }, 3000);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setPaymentSubmitted(false);
    navigate("/");
  };
  const handleCheckboxChange = () => {
    setSameAsMailing(!sameAsMailing);
    if (!sameAsMailing) {
      setSubmittedBillAddress({ ...submittedMailAddress }); // Copy mailing address to billing address
    } else {
      setSubmittedBillAddress({}); // Clear billing address if unchecked
    }
  };

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
              <AddressForm addForm = {mailForm}  setAddForm = {setMailForm} setSubmittedForm = {setSubmittedMailAddress} />

            </div>
            
            <div className="col-span-2 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto duration-300">
              <h3 className="pl-2 text-2xl font-bold mb-2">Billing Address</h3>
              <label className="ml-2"><input type="checkbox" className="outline-1" checked={sameAsMailing} onChange={handleCheckboxChange}></input> Same as Mailing Address</label>
              <AddressForm addForm = {billForm}  setAddForm = {setBillForm} setSubmittedForm = {setSubmittedBillAddress} />
            </div>
            
            <div className="col-span-2 bg-white rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto duration-300">
              <h3 className="p-2 text-2xl font-bold mb-4">Payment Method</h3>
              <br></br>
              <PaymentForm payForm = {paymentForm}  setPayForm = {setPaymentForm} setSubmittedForm = {setSubmittedPayment} />
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
              bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2">Make Payment</button>
            </form>
            {errorMessage && (
              <div className="text-red-600 font-medium mt-4">
                {errorMessage}
              </div>
            )}
            {paymentSubmitted &&(
              <div className="popup-notice">
                <div className="popup-content">
                  <button 
                    type="button" 
                    className=""
                    onClick={handleClose}
                    >
                      x
                    </button>
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