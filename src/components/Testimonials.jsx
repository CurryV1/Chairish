// src/components/Testimonials.jsx
import React from "react";

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
    <div className="bg-yellow-500 py-12 border-amber-600">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-8">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-1 px-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow">
                <p className="italic text-gray-600 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
