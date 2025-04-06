// src/pages/LivingRoom.jsx
import React, { useState, useEffect } from "react";
import ProductListItemTwoColumn from "../components/ProductListItemTwoColumn";

const LivingRoom = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/products?category=living%20room")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Living Room Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductListItemTwoColumn key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LivingRoom;
