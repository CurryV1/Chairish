// src/pages/Bedroom.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Bedroom = () => {
  const [products, setProducts] = useState([]); // All bedroom products
  const [filteredProducts, setFilteredProducts] = useState([]); // After applying filter
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [filterType, setFilterType] = useState("all");
  // eslint-disable-next-line no-unused-vars
  const [filterValue, setFilterValue] = useState("");

  // Fetch and filter bedroom products
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const bedroomProducts = data.filter(
          (product) =>
            product.category && product.category.toLowerCase() === "bedroom"
        );
        setProducts(bedroomProducts);
        setFilteredProducts(bedroomProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Apply filters to bedroom products
  useEffect(() => {
    let filtered = products;
    if (filterType !== "all" && filterValue !== "") {
      filtered = products.filter((product) => {
        if (filterType === "price") {
          if (filterValue === "low") return product.price < 200;
          if (filterValue === "mid")
            return product.price >= 200 && product.price < 400;
          if (filterValue === "high") return product.price >= 400;
        }
        if (filterType === "color") {
          return (
            product.color &&
            product.color.toLowerCase().includes(filterValue.toLowerCase())
          );
        }
        if (filterType === "material") {
          return (
            product.material &&
            product.material.toLowerCase() === filterValue.toLowerCase()
          );
        }
        return true;
      });
    }
    setFilteredProducts(filtered);
  }, [filterType, filterValue, products]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bedroom Products</h1>
      {/* Filter UI - unchanged */}
      {/* (Your filter radio inputs and conditional filters stay exactly the same) */}

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-yellow-500 border-amber-500">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bedroom;
