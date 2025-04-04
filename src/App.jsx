import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryCards from "./components/CategoryCards";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
      </div>
      <CategoryCards />
      <Footer />
    </div>
  );
};

export default App;
