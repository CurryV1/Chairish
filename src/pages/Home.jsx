// src/pages/Home.jsx
import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero";

const FeaturedBanner = lazy(() => import("../components/FeaturedBanner"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const CategoryCards = lazy(() => import("../components/CategoryCards"));

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Hero />
      </div>
      <Suspense
        fallback={
          <div className="container mx-auto p-4">
            Loading Featured Banner...
          </div>
        }
      >
        <FeaturedBanner />
      </Suspense>
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
      </Suspense>
    </>
  );
};

export default Home;
