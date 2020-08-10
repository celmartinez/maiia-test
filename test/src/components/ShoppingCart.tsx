import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingCart() {
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);

    console.log("shop-shop", shoppingCart);

    const removeFromCart = (product: Product) => {
        const newShoppingCart = shoppingCart.filter(
            (item: Product) => item.id !== product.id
        );
        dispatch({ type: "REMOVE_FROM_CART", payload: newShoppingCart });
    };

    return (
        <div>
            <ul>
                {shoppingCart?.map((product) => {
                    return (
                        <li key={`${product?.id} ${product?.title}`}>
                            <button onClick={() => removeFromCart(product)}>
                                -
                            </button>
                            {product?.id}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ShoppingCart;
