import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
    },
    media: {
        paddingTop: "56.25%",
    },
    content: {
        textAlign: "left",
    },

    heading: {
        fontWeight: "bold",
    },
    subheading: {
        lineHeight: 1.8,
    },
    shopButton: {
        float: "right",
    },
}));

const ProductItem = (props: Product) => {
    const classes = useStyles();
    const { id, title, url, thumbnailUrl } = props;
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);

    const alreadyAdded = shoppingCart.findIndex(
        (itemCart: Product) => itemCart.id === id
    );
    const addToCart = (product: Product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    return (
        <Grid item xs={6} sm={3}>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={url}>
                    <IconButton
                        className={classes.shopButton}
                        onClick={() =>
                            addToCart({ id, title, url, thumbnailUrl })
                        }
                        disabled={alreadyAdded !== -1}
                    >
                        <AddShoppingCartRoundedIcon />
                    </IconButton>
                </CardMedia>

                <CardContent className={classes.content}>
                    <Typography variant={"subtitle2"}>{title}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductItem;
