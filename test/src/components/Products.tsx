import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

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
                setTotalPages(Math.ceil(totalProducts / 15));
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(Number(value));
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
            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
            />
            {/*   PAGINATION
            <br />
            <button onClick={() => changePage(page - 1)}>-</button>
            {page}
            <button onClick={() => changePage(page + 1)}>+</button>
            <br />
            total pages {totalPages} */}
        </div>
    );
}

export default Products;
