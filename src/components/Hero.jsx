import React from "react";

const Hero = () => {
  return (
    <section className="flex-1 flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Heading Lorem ipsum dolor sit amet,
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Call to Action
        </button>
      </div>
      {/* Optionally, you can add an image or additional elements here */}
    </section>
  );
};

export default Hero;
