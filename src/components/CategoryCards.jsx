import React, { useState, useEffect, useRef } from "react";

const CategoryCard = ({ category, link }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <a
      href={link}
      ref={cardRef}
      className={`block bg-white shadow-lg rounded overflow-hidden transform transition duration-700 ease-in-out 
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Placeholder for future image */}
        <span className="text-gray-500">Image Placeholder</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{category}</h3>
        <p className="text-gray-600">
          Explore our {category.toLowerCase()} collection.
        </p>
      </div>
    </a>
  );
};

const CategoryCards = () => {
  const categories = [
    { name: "Living Room", link: "/living-room" },
    { name: "Office", link: "/office" },
    { name: "Bedroom", link: "/bedroom" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {categories.map((cat, index) => (
            <CategoryCard key={index} category={cat.name} link={cat.link} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
