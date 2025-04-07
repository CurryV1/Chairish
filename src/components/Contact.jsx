import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-5 p-6">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      {/* Phone Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Phone Number</h2>
        <p className="text-gray-700">Customer Service Line: (210) 345-9832</p>
      </section>

      {/* Email Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Email Address</h2>
        <p className="text-gray-700">Email Address: FurnitureStore@gmail.com</p>
      </section>

      {/* Socials Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Socials</h2>
        <div className="flex gap-4 bg-gray-800 text-white p-4 rounded w-fit">
          <a href="#" className="hover:text-blue-400">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-pink-400">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaXTwitter size={20} />
          </a>
          <a href="#" className="hover:text-red-300">
            <FaPinterestP size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
