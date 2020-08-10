import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Products() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // TODO : add the loader
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=15`
                );
                const totalProducts = Number(
                    response.headers.get("x-total-count")
                );
                await setTotalPages(Math.ceil(totalProducts / 15));
                const data = await response.json();
                await setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [page]);

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        } else {
            alert("impossible"); // TODO : change that with a snackbar
        }
    };

    const addToCart = (product: Product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    return (
        <div>
            <ul>
                {products?.map((product: Product) => {
                    const alreadyAdded = shoppingCart.findIndex(
                        (itemCart: Product) => itemCart.id === product.id
                    );
                    return (
                        <li key={product.id}>
                            {alreadyAdded === -1 && (
                                <button onClick={() => addToCart(product)}>
                                    +
                                </button>
                            )}
                            {product?.id} {product?.title}
                        </li>
                    );
                })}
            </ul>
            PAGINATION
            <br />
            <button onClick={() => changePage(page - 1)}>-</button>
            {page}
            <button onClick={() => changePage(page + 1)}>+</button>
            <br />
            total pages {totalPages}
        </div>
    );
}

export default Products;
