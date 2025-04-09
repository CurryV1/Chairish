// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
      alt="Yellow chair in aesthetic living room"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Chairish</h1>
        <p className="text-xl mb-8">Your home deserves meaningful furniture</p>
        <button
          onClick={scrollToCategories}
          className="bg-yellow-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded"
        >
          Start browsing
        </button>
      </div>
    </div>
  );
};

export default Hero;
