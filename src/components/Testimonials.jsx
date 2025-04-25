// src/components/Testimonials.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "This site has completely transformed the way I shop online. Incredible experience!",
    author: "Jane Doe",
    title: "Satisfied Customer",
  },
  {
    id: 2,
    quote:
      "The quality and selection are unmatched. I always find something I love.",
    author: "John Smith",
    title: "Happy Shopper",
  },
  {
    id: 3,
    quote:
      "Great customer service and a seamless shopping experience. Highly recommend!",
    author: "Emily Johnson",
    title: "Loyal Customer",
  },
];

const Testimonials = () => {
  return (
    <motion.div
      className="bg-yellow-500 py-12 border-amber-600"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-8">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="flex-1 px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: testimonial.id * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 p-6 rounded-lg shadow">
                <p className="italic text-gray-600 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
