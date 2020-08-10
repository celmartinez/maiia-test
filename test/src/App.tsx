import React from "react";
import { useSelector } from "react-redux";
import AppBar from "./components/AppBar";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);
    console.log("shop-shop", shoppingCart);

    return (
        <div>
            <AppBar />
            <ShoppingCart />
            <Products />
        </div>
    );
}

export default App;
