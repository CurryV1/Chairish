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
    fetch("/data/products.json")
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
    if (product) addToCart(product);
  };

  const handleContinueShopping = () => {
    if (location.state?.from) {
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
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={product.image_ref}
            alt={product.name}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-semibold text-grey-600">
            ${product.price}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            {product.material && (
              <p>
                <span className="font-semibold">Material:</span>{" "}
                {product.material}
              </p>
            )}
            {product.color && (
              <p>
                <span className="font-semibold">Color:</span> {product.color}
              </p>
            )}
            {product.category && (
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            )}
          </div>

          {product.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Add to Cart
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Related products */}
      {/* 
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          // Insert related product cards here...
        </div>
      </div> 
      */}
    </div>
  );
};

export default ProductDetails;
