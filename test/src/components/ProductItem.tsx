import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addItem } from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 300,
        minWidth: 120,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
        },
    },
    media: {
        paddingTop: "50%",
    },
    content: {
        textAlign: "left",
        overflow: "hidden",
    },
    shopButton: {
        float: "right",
        color: "white",
    },
}));

const ProductItem = (props: Product) => {
    const classes = useStyles();
    const { id, title, url, thumbnailUrl } = props;
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);
    const [open, setOpen] = useState(false);

    const alreadyAdded = shoppingCart.findIndex(
        (itemCart: Product) => itemCart.id === id
    );
    const addToCart = (product: Product) => {
        dispatch(addItem(product));
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid item xs={6} sm={3}>
            <Card className={classes.card}>
                <IconButton
                    className={classes.shopButton}
                    onClick={() => addToCart({ id, title, url, thumbnailUrl })}
                    disabled={alreadyAdded !== -1}
                >
                    <Tooltip title="Add to cart" arrow>
                        <AddShoppingCartRoundedIcon />
                    </Tooltip>
                </IconButton>
                <CardMedia className={classes.media} image={url} />

                <CardContent className={classes.content}>
                    <Typography variant={"caption"}>{title}</Typography>
                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Product added to cart!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default ProductItem;
