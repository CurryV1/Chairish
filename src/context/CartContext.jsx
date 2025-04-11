// src/context/CartContext.jsx
// import React, { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [toast, setToast] = useState("");

//   // Add product to cart and show a toast for 2 seconds
//   const addToCart = (product) => {
//     setCartItems((prevItems) => [...prevItems, product]);
//     setToast("Added to cart");
//     setTimeout(() => {
//       setToast("");
//     }, 2000);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => {
//       const index = prevItems.findIndex((item) => item.id === productId);
//       if (index !== -1) {
//         const updatedItems = [...prevItems];
//         updatedItems.splice(index, 1);
//         return updatedItems;
//       }
//       return prevItems;
//     });
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, clearCart, toast }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// src/context/CartContext.jsx
// import React, { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Add product to cart and increment quantity if already present
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         // Increment quantity
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new product with an initial quantity of 1
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Remove product: decrement quantity; if quantity is 1, remove the item
//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === productId);
//       if (existingItem) {
//         if (existingItem.quantity > 1) {
//           return prevItems.map((item) =>
//             item.id === productId
//               ? { ...item, quantity: item.quantity - 1 }
//               : item
//           );
//         } else {
//           // Remove the item
//           return prevItems.filter((item) => item.id !== productId);
//         }
//       }
//       return prevItems;
//     });
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product; if already in cart, increment quantity
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Decrement quantity; if quantity is 1, then remove the item (or optionally set to 0)
  const decrementCartItem = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Option: Remove the item when quantity reaches 1 and then pressing '-'
          return prevItems.filter((item) => item.id !== productId);
        }
      }
      return prevItems;
    });
  };

  // Remove the entire line item regardless of quantity
  const removeLineItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementCartItem,
        removeLineItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
