// src/pages/Office.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Office = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const officeProducts = data.filter(
          (product) =>
            product.category && product.category.toLowerCase() === "office"
        );
        setProducts(officeProducts);
        setFilteredProducts(officeProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

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

  const clearFilters = () => {
    setFilterType("all");
    setFilterValue("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Office Products</h1>

      {/* --- Filter Section --- */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filterType === "all" ? "bg-yellow-500 text-black" : "bg-gray-300"
            }`}
            onClick={clearFilters}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === "price"
                ? "bg-yellow-500 text-black"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setFilterType("price");
              setFilterValue("");
            }}
          >
            Price
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === "color"
                ? "bg-yellow-500 text-black"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setFilterType("color");
              setFilterValue("");
            }}
          >
            Color
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === "material"
                ? "bg-yellow-500 text-black"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setFilterType("material");
              setFilterValue("");
            }}
          >
            Material
          </button>
        </div>

        {/* --- Conditional Filter Options --- */}
        {filterType === "price" && (
          <div className="flex flex-wrap gap-4">
            {["low", "mid", "high"].map((price) => (
              <button
                key={price}
                className={`px-3 py-1 rounded capitalize ${
                  filterValue === price
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => setFilterValue(price)}
              >
                {price === "low"
                  ? "Low (< $200)"
                  : price === "mid"
                  ? "Mid ($200-$399)"
                  : "High ($400+)"}
              </button>
            ))}
          </div>
        )}

        {filterType === "color" && (
          <div className="flex flex-wrap gap-4">
            {["black", "white", "grey", "brown", "tan", "blue"].map((color) => (
              <button
                key={color}
                className={`px-3 py-1 rounded capitalize ${
                  filterValue === color
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => setFilterValue(color)}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        {filterType === "material" && (
          <div className="flex flex-wrap gap-4">
            {["leather", "linen", "microfiber"].map((material) => (
              <button
                key={material}
                className={`px-3 py-1 rounded capitalize ${
                  filterValue === material
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => setFilterValue(material)}
              >
                {material}
              </button>
            ))}
          </div>
        )}

        {/* --- Clear Filters Button --- */}
        {(filterType !== "all" || filterValue !== "") && (
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* --- Products Grid --- */}
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-yellow-500 p-4 rounded">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Office;
