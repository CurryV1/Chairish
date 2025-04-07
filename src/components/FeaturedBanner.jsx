// src/components/FeaturedBanner.jsx
import React from "react";

const FeaturedBanner = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Featured In</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="/images/techcrunch-icon.svg"
            alt="TechCrunch"
            className="h-16"
          />
          <img src="/images/forbes-icon.svg" alt="Forbes" className="h-10" />
          <img
            src="/images/fastcompany-icon.svg"
            alt="Fast Company"
            className="h-10"
          />
          <img src="/images/wired-icon.svg" alt="Wired" className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
