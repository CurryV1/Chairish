// src/pages/Office.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Office = () => {
  const [products, setProducts] = useState([]); // All office products
  const [filteredProducts, setFilteredProducts] = useState([]); // After applying filter
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all"); // "all", "price", "color", "material"
  const [filterValue, setFilterValue] = useState("");

  // Fetch Office products
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Update filtered products when filters change
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
          // Using includes so that "light blue" can match "blue"
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
      <h1 className="text-3xl font-bold mb-4">Office Products</h1>
      {/* Filter Section */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="filterType"
              value="all"
              checked={filterType === "all"}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
              }}
              className="mr-2"
            />
            All
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="filterType"
              value="price"
              checked={filterType === "price"}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
              }}
              className="mr-2"
            />
            Price
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="filterType"
              value="color"
              checked={filterType === "color"}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
              }}
              className="mr-2"
            />
            Color
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="filterType"
              value="material"
              checked={filterType === "material"}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
              }}
              className="mr-2"
            />
            Material
          </label>
        </div>
        {/* Conditional Filter Options */}
        {filterType !== "all" && (
          <div className="mt-2">
            {filterType === "price" && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceFilter"
                    value="low"
                    checked={filterValue === "low"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Low (&lt; $200)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceFilter"
                    value="mid"
                    checked={filterValue === "mid"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Mid ($200-$399)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceFilter"
                    value="high"
                    checked={filterValue === "high"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  High ($400+)
                </label>
              </div>
            )}
            {filterType === "color" && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="black"
                    checked={filterValue === "black"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Black
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="white"
                    checked={filterValue === "white"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  White
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="grey"
                    checked={filterValue === "grey"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Grey
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="brown"
                    checked={filterValue === "brown"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Brown
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="tan"
                    checked={filterValue === "tan"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Tan
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="colorFilter"
                    value="blue"
                    checked={filterValue === "blue"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Blue
                </label>
              </div>
            )}
            {filterType === "material" && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialFilter"
                    value="leather"
                    checked={filterValue === "leather"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Leather
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialFilter"
                    value="linen"
                    checked={filterValue === "linen"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Linen
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialFilter"
                    value="microfiber"
                    checked={filterValue === "microfiber"}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="mr-2"
                  />
                  Microfiber
                </label>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Display the filtered products */}
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

export default Office;
