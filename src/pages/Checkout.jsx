// src/pages/Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import { CartContext } from "../context/CartContext";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { useNavigate } from "react-router-dom";

const emptyAddress = {
  firstName: "",
  lastName: "",
  street1: "",
  street2: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
};
const emptyPayment = {
  firstName: "",
  lastName: "",
  provider: "",
  number: "",
  expDate: "",
  csv: "",
};

const Checkout = () => {
  const { clearCart, cartItems } = useContext(CartContext);
  const [mailForm, setMailForm] = useState(emptyAddress);
  const [billForm, setBillForm] = useState(emptyAddress);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);
  const [sameAsMailing, setSameAsMailing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const totalSum = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    setLoading(false);
    setSubTotal(totalSum);
  }, [cartItems]);

  useEffect(() => {
    if (sameAsMailing) {
      setBillForm({ ...mailForm });
    }
  }, [sameAsMailing, mailForm]);

  useEffect(() => {
    const validate = (obj, skip = []) => {
      return Object.entries(obj).every(
        ([key, val]) => skip.includes(key) || val.trim() !== ""
      );
    };
    const isValid =
      cartItems.length > 0 &&
      validate(mailForm, ["street2", "apt"]) &&
      validate(billForm, ["street2", "apt"]) &&
      validate(paymentForm);
    setFormValid(isValid);
  }, [mailForm, billForm, paymentForm, cartItems]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formValid) return;
    setProcessing(true);
    setTimeout(() => {
      const order = {
        mailAddress: mailForm,
        billAddress: billForm,
        payment: {
          ...paymentForm,
          number: paymentForm.number.replace(
            /\d{12}(\d{4})/,
            "**** **** **** $1"
          ),
        },
        cartItems,
        subTotal,
        date: new Date().toLocaleString(),
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      };
      localStorage.setItem("recentOrder", JSON.stringify(order));
      clearCart();
      setProcessing(false);
      navigate("/confirmation");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {loading ? (
        <p>Loading Order...</p>
      ) : (
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handlePlaceOrder}
          autoComplete="off"
        >
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-md border border-gray-200 shadow-lg p-4">
              <h3 className="text-2xl font-bold mb-2">Mailing Address</h3>
              <AddressForm addForm={mailForm} setAddForm={setMailForm} />
            </div>
            <div className="bg-white rounded-md border border-gray-200 shadow-lg p-4">
              <h3 className="text-2xl font-bold mb-2">Billing Address</h3>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={sameAsMailing}
                  onChange={() => setSameAsMailing(!sameAsMailing)}
                  className="mr-2"
                />
                Same as Mailing Address
              </label>
              {
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    sameAsMailing
                      ? "max-h-0 opacity-0"
                      : "max-h-[1000px] opacity-100"
                  }`}
                >
                  <AddressForm addForm={billForm} setAddForm={setBillForm} />
                </div>
              }
            </div>
            <div className="bg-white rounded-md border border-gray-200 shadow-lg p-4">
              <h3 className="text-2xl font-bold mb-2">Payment Method</h3>
              <PaymentForm payForm={paymentForm} setPayForm={setPaymentForm} />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 shadow-lg p-4 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
            <OrderSummary subTotal={subTotal} />
            <button
              type="submit"
              disabled={!formValid || processing}
              className={`mt-6 w-full font-semibold rounded-full px-4 py-3 transition-colors text-white ${
                !formValid || processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {processing ? "Processing..." : "Place Order"}
            </button>
            {!formValid && (
              <p className="text-sm text-red-500 mt-2">
                Please complete all required fields
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
