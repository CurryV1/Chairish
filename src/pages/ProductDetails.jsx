// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, fetch all products and filter for the one matching the id
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Optionally, you can display a confirmation toast here.
    }
  };

  const handleContinueShopping = () => {
    // If you saved a "from" location in location.state, navigate there, otherwise, fallback:
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

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
          {/* Buttons Section */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
