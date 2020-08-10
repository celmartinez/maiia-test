import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "80px",
    },
    pagination: {
        marginTop: "25px",
    },
    typo: {
        marginTop: "25px",
    },
}));

const Products = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState([]);
    const [toSearch, setToSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=15&title_like=${toSearch}`
                );
                const totalProducts = Number(
                    response.headers.get("x-total-count")
                );
                setTotalPages(Math.ceil(totalProducts / 15));
                const data = await response.json();
                setProducts(data);
                window.scrollTo(0, 0);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [page, toSearch]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(Number(value));
    };

    return (
        <Box className={classes.root}>
            <Grid container justify="center">
                <SearchBar setToSearch={setToSearch} />
            </Grid>
            {loading ? (
                <Grid container justify="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <div>
                    <Grid container spacing={3}>
                        {products?.map((product: Product) => {
                            return (
                                <ProductItem key={product.id} {...product} />
                            );
                        })}
                    </Grid>
                    <Grid container justify="center">
                        {totalPages === 0 ? (
                            <Typography
                                variant="overline"
                                className={classes.typo}
                            >
                                No result for your research...
                            </Typography>
                        ) : (
                            <Pagination
                                className={classes.pagination}
                                count={totalPages}
                                page={page}
                                onChange={handleChange}
                            />
                        )}
                    </Grid>
                </div>
            )}
        </Box>
    );
};

export default Products;
