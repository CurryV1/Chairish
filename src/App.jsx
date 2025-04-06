import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryCards from "./components/CategoryCards";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Home from "./pages/Home";
import FAQPage from "./pages/FAQ";
import LivingRoom from "./pages/LivingRoom";
import Office from "./pages/Office";
import Bedroom from "./pages/Bedroom";
import ContactUs from "./pages/ContactUs";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

{/*Components have functionality, pages call components, App organizes*/}
const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/livingroom" element={<LivingRoom />} />
        <Route path="/office" element={<Office />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        {/* Add more routes here if needed */}
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
