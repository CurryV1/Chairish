// src/components/CategoryCards.jsx
import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const categories = [
  {
    name: "Living Room",
    path: "/livingroom",
    image: "/images/livingroom.jpg",
  },
  {
    name: "Office",
    path: "/office",
    image: "/images/office.jpg",
  },
  {
    name: "Bedroom",
    path: "/bedroom",
    image: "/images/bedroom.jpg",
  },
];

const CategoryCards = () => {
  return (
    <motion.div
      id="categories"
      className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {categories.map((cat, index) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to={cat.path} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="aspect-w-4 aspect-h-3 w-full">
                <img
                  src={cat.image}
                  alt={cat.name + " category"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-center">{cat.name}</h2>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryCards;
