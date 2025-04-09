// src/components/OrderSummary.jsx
import React from "react";

const OrderSummary = ({subTotal}) => {
    const tax = 0.08;
    const taxTotal = subTotal * tax;
    const total = subTotal + taxTotal;

    return(
        <div>
            <div className="p-4">
                <p className="flex justify-between text-lg font-semibold"><span>Sub-Total:</span><span>${Number(subTotal).toFixed(2)}</span></p>
            </div>
            <div className="p-4">
                <p className="flex justify-between text-lg font-semibold"><span>Tax:</span><span>${Number(taxTotal).toFixed(2)}</span></p>
            </div>
            <div className="p-4">
                <p className="flex justify-between text-lg font-semibold"><span>Total:</span><span>${Number(total).toFixed(2)}</span></p>
            </div>
        </div>
    );
}

export default OrderSummary;