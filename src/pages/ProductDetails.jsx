// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, fetch all products and filter the one with the matching id
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((prod) => prod.id.toString() === id.toString());
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">Loading product details...</div>
    );
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image_ref}
            alt={product.name}
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>
        {/* Details Section */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price}</p>
          {product.material && (
            <p className="mb-2">
              <span className="font-semibold">Material: </span>
              {product.material}
            </p>
          )}
          {product.color && (
            <p className="mb-2">
              <span className="font-semibold">Color: </span>
              {product.color}
            </p>
          )}
          {/* You can add more product fields here as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
