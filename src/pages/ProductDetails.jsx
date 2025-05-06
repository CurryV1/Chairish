import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

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
    if (product) {
      addToCart(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500);
    }
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
    <motion.div
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Toast */}
      {showToast && (
        <div className="absolute bottom-6 right-6 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded shadow animate-fadeInOut z-20">
          Added to Cart
        </div>
      )}

      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.image_ref}
            alt={product.name}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>
          <p className="text-base sm:text-lg text-gray-600">
            {product.description}
          </p>

          <div className="text-2xl sm:text-3xl font-semibold text-gray-700">
            ${product.price}
          </div>

          <div className="text-sm sm:text-base text-gray-600 space-y-1">
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
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow w-full sm:w-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
