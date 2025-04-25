// src/components/FeaturedBanner.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FeaturedBanner = () => {
  return (
    <motion.div
      className="bg-gray-100 py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Featured In</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="/images/techcrunch-icon.svg"
            alt="TechCrunch logo"
            className="h-16"
            loading="lazy"
          />
          <img
            src="/images/forbes-icon.svg"
            alt="Forbes logo"
            className="h-10"
            loading="lazy"
          />
          <img
            src="/images/fastcompany-icon.svg"
            alt="Fast Company logo"
            className="h-10"
            loading="lazy"
          />
          <img
            src="/images/wired-icon.svg"
            alt="Wired logo"
            className="h-10"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedBanner;
