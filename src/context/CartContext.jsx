// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState("");

  // Add product to cart and show a toast for 2 seconds
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setToast("Added to cart");
    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, toast }}
    >
      {children}
    </CartContext.Provider>
  );
};
