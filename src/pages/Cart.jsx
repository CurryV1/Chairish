//src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import ProductCartCard from "../components/ProductCartCard";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const [products, setProducts] = useState([]); // All products
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products 
  const [subTotal, setTotal] = useState(0); // Subtotal of selected products
  const [loading, setLoading] = useState(true);

  //Fetch products
  useEffect(() => {
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          const selected = data.filter((product) => product.selected === 1);
          setSelectedProducts(selected);

          const totalSum = selected.reduce((acc, product) => {
            const price = parseFloat(product.price);
            return acc + (isNaN(price) ? 0 : price);
          }, 0);

          setTotal(totalSum);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false);
        });
    }, []);

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {loading ? (
        <p>Loading cart...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 bg-yellow-500 h-screen border-amber-500">
          <div className="col-span-2 bg-gray-200 rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto h-6/10 duration-300">
            {selectedProducts.map((product) => (
              <ProductCartCard key={product.id} product={product} />
            ))}
          </div>
          <div className="col-span-1 bg-gray-200 rounded-md border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow overflow-auto h-6/10 duration-300">
            <h3 className="p-2 text-2xl font-bold mb-4 ">Order Summary</h3>
            <hr className="p-2"></hr>
                <OrderSummary subTotal={subTotal} />
            <hr className="p-2"></hr>
            <div className="p-10">
              <a className="float-left gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold 
              bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2" 
              href="/">Continue Shopping</a>
              <a className="float-right gap-2 inline-flex justify-center rounded-full px-4 py-2 font-semibold
              bg-yellow-500 hover:bg-green-600 text-black focus-visile:outline-2" 
              href="/checkout">Got to Checkout</a>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;