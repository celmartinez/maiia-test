import React, { useEffect, useState } from "react";

function Products() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // TODO : add the loader
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=15`
                );
                console.log("response", response);
                const totalProducts = Number(
                    response.headers.get("x-total-count")
                );

                console.log("totalProducts", totalProducts);

                await setTotalPages(Math.ceil(totalProducts / 15));

                const data = await response.json();
                console.log("data", data);

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
            alert("impossible");
        }
    };
    return (
        <div>
            <ul>
                {products?.map((item: Product) => (
                    <li>
                        {item?.id} {item?.title}
                    </li>
                ))}
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
