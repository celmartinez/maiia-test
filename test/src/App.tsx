import React from "react";
import AppBar from "./components/AppBar";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    return (
        <div>
            <AppBar />
            <ShoppingCart />
            <Products />
        </div>
    );
}

export default App;
