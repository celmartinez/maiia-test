import React from "react";
import { useSelector } from "react-redux";

function ShoppingCart() {
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);
    console.log("shop-shop", shoppingCart);
    return (
        <div>
            <ul>
                {shoppingCart?.map((item) => (
                    <li key={`${item?.id} ${item?.title}`}>{item?.id}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingCart;
