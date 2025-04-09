//src/components/SendToCart.jsx
import React from "react";

const SendToCart = ({product}) => {
    const handleAddToCart = (selectedStatus) => {
        // Send the request to the backend to update the product's 'selected' status
        fetch("http://localhost:3001/update-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: product.id,
                selected: selectedStatus, // Pass the selected status (1 or 0)
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Product updated:", data);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    return (
        <button type="button" className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
        bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2" onClick={() => handleAddToCart(1)}>Add to Cart</button> // Passing 1 to indicate the product is selected
    );
};

export default SendToCart;