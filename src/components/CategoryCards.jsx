// src/components/CategoryCards.jsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Living Room",
    path: "/livingroom",
    image: "/images/livingroom.jpg", // Replace with your actual image path
  },
  {
    name: "Office",
    path: "/office",
    image: "/images/office.jpg", // Replace with your actual image path
  },
  {
    name: "Bedroom",
    path: "/bedroom",
    image: "/images/bedroom.jpg", // Replace with your actual image path
  },
];

const CategoryCards = () => {
  return (
    <div
      id="categories"
      className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start"
      // If you want them all to have the same card height, try: "items-stretch"
      // className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
    >
      {categories.map((cat) => (
        <Link to={cat.path} key={cat.name} className="block">
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="aspect-w-4 aspect-h-3 w-full">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">{cat.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
