import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import ProductItem from "./ProductItem";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "80px",
    },
    pagination: {
        marginTop: "25px",
    },
}));

function Products() {
    const classes = useStyles();
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

    return (
        <Box className={classes.root} m="auto">
            <Grid container spacing={3}>
                {products?.map((product: Product) => {
                    return <ProductItem key={product.id} {...product} />;
                })}
            </Grid>
            <Grid container justify="center">
                <Pagination
                    className={classes.pagination}
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                />
            </Grid>
        </Box>
    );
}

export default Products;
