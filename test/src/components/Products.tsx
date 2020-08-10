import React, { useEffect, useState } from "react";

function Products() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // TODO : add the loader
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=15`
                );
                const data = await response.json();
                console.log("data", data);

                await setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [page]);

    return (
        <div>
            <ul>
                {products?.map((item: Product) => (
                    <li>{item?.title}</li>
                ))}
            </ul>
            PAGINATION
        </div>
    );
}

export default Products;
