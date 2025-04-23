// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListItemTwoColumn from "../components/ProductListItemTwoColumn";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.filter((product) => {
          const searchText = query.toLowerCase();
          return (
            (product.name && product.name.toLowerCase().includes(searchText)) ||
            (product.description &&
              product.description.toLowerCase().includes(searchText)) ||
            (product.tags && product.tags.toLowerCase().includes(searchText)) ||
            (product.material &&
              product.material.toLowerCase().includes(searchText)) ||
            (product.color && product.color.toLowerCase().includes(searchText))
          );
        });

        setResults(filteredResults);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading && <p>Loading results...</p>}
      {!loading && results.length === 0 && query.trim() !== "" && (
        <p>No products found for "{query}".</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {results.map((product) => (
          <ProductListItemTwoColumn key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
