// // src/pages/Home.jsx
// import React, { Suspense, lazy } from "react";
// import Hero from "../components/Hero";
// import FeaturedBanner from "../components/FeaturedBanner"; // Eager load key content
// import NewsletterSignup from "../components/NewsletterSignup";

// const Testimonials = lazy(() => import("../components/Testimonials"));
// const CategoryCards = lazy(() => import("../components/CategoryCards"));

// const Home = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col">
//         <Hero />
//       </div>

//       {/* Featured Banner is now eagerly loaded to prevent layout shifts */}
//       <FeaturedBanner />

//       <Suspense
//         fallback={
//           <div className="container mx-auto p-4">Loading Testimonials...</div>
//         }
//       >
//         <Testimonials />
//       </Suspense>

//       <Suspense
//         fallback={
//           <div className="container mx-auto p-4">Loading Category Cards...</div>
//         }
//       >
//         <CategoryCards />
//         <NewsletterSignup />
//       </Suspense>
//     </>
//   );
// };

// export default Home;

import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero";
import FeaturedBanner from "../components/FeaturedBanner";
import NewsletterSignup from "../components/NewsletterSignup";

const Testimonials = lazy(() => import("../components/Testimonials"));
const CategoryCards = lazy(() => import("../components/CategoryCards"));

const Home = () => {
  return (
    <main role="main" aria-label="Homepage content">
      <div className="min-h-screen flex flex-col">
        <Hero />
      </div>

      {/* Featured In Section */}
      <section aria-labelledby="featured-in" className="bg-gray-100 py-8">
        <h2 id="featured-in" className="sr-only">
          Featured in
        </h2>
        <FeaturedBanner />
      </section>

      {/* Testimonials Section */}
      <section
        aria-labelledby="testimonials"
        className="bg-yellow-500 border-amber-600"
      >
        <h2 id="testimonials" className="sr-only">
          What our customers say
        </h2>
        <Suspense
          fallback={
            <div className="container mx-auto p-4">Loading Testimonials...</div>
          }
        >
          <Testimonials />
        </Suspense>
      </section>

      {/* Categories Section */}
      <section aria-labelledby="browse-categories" className="bg-white">
        <h2 id="browse-categories" className="sr-only">
          Browse by category
        </h2>
        <Suspense
          fallback={
            <div className="container mx-auto p-4">
              Loading Category Cards...
            </div>
          }
        >
          <CategoryCards />
        </Suspense>
      </section>

      {/* Newsletter Section */}
      <section aria-labelledby="newsletter-signup" className="bg-gray-50 mt-12">
        <h2 id="newsletter-signup" className="sr-only">
          Newsletter signup
        </h2>
        <NewsletterSignup />
      </section>
    </main>
  );
};

export default Home;
