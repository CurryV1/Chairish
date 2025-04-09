// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const LivingRoom = lazy(() => import("./pages/LivingRoom"));
const Office = lazy(() => import("./pages/Office"));
const Bedroom = lazy(() => import("./pages/Bedroom"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Account = lazy(() => import("./pages/Account"));
const Cart = lazy(() => import("./pages/Cart"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Register = lazy(() => import("./pages/Register"));

const App = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-yellow-500">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense
              fallback={<div className="container mx-auto p-4">Loading...</div>}
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
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
