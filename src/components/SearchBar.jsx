// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center mb-4 text-black placeholder-white"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="bg-black-800 border border-black-300 rounded-l px-4 py-2 w-full focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
