// src/components/NewsletterSignup.jsx
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 py-12 border-t border-gray-300 mt-12">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Stay in the loop
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and get the latest updates and deals.
        </p>
        {submitted ? (
          <p className="text-green-700 font-medium">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md px-4 py-2 border border-gray-300 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-green-600 text-black px-6 py-2 rounded-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
