// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { useState, useEffect } from 'react';

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const LivingRoom = lazy(() => import("./pages/Livingroom"));
const Office = lazy(() => import("./pages/Office"));
const Bedroom = lazy(() => import("./pages/Bedroom"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Account = lazy(() => import("./pages/Account"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Register = lazy(() => import("./pages/Register"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const AccountInfo = lazy(() => import ("./pages/AccountInfo"));
const AuthGate = lazy(() => import("./pages/AuthGate"))


const App = () => {
  const location = useLocation();
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-yellow-500">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Suspense
                fallback={
                  <div className="container mx-auto p-4">Loading...</div>
                }
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/livingroom" element={<LivingRoom />} />
                  <Route path="/office" element={<Office />} />
                  <Route path="/bedroom" element={<Bedroom />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/accountInfo" element={<AccountInfo />} />
                  <Route path="/authenticationGate" element={<AuthGate />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
