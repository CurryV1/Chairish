// src/pages/Home.jsx
import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero";
import FeaturedBanner from "../components/FeaturedBanner"; // Eager load key content
import NewsletterSignup from "../components/NewsletterSignup";

const Testimonials = lazy(() => import("../components/Testimonials"));
const CategoryCards = lazy(() => import("../components/CategoryCards"));

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Hero />
      </div>

      {/* Featured Banner is now eagerly loaded to prevent layout shifts */}
      <FeaturedBanner />

      <Suspense
        fallback={
          <div className="container mx-auto p-4">Loading Testimonials...</div>
        }
      >
        <Testimonials />
      </Suspense>

      <Suspense
        fallback={
          <div className="container mx-auto p-4">Loading Category Cards...</div>
        }
      >
        <CategoryCards />
        <NewsletterSignup />
      </Suspense>
    </>
  );
};

export default Home;
