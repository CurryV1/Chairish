import React from "react";
import Hero from "../components/Hero";
import CategoryCards from "../components/CategoryCards";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Hero />
      </div>
      <CategoryCards />
    </>
  );
};

export default Home;