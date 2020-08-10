import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { removeItem } from "../redux/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    shoppingList: {
        maxWidth: window.innerWidth,
        width: "350px",
    },
}));

const ShoppingCart = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);

    console.log("shop-shop", shoppingCart);

    const removeFromCart = (product: Product) => {
        const newShoppingCart = shoppingCart.filter(
            (item: Product) => item.id !== product.id
        );
        dispatch(removeItem(newShoppingCart));
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <List className={classes.shoppingList}>
            {shoppingCart?.map((product) => (
                <div key={product?.id}>
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                alt="avatar product"
                                src={product?.thumbnailUrl}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={product?.title} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => removeFromCart(product)}
                            >
                                <Tooltip title="Delete from cart" arrow>
                                    <DeleteIcon />
                                </Tooltip>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            ))}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Product remove from cart...
                </Alert>
            </Snackbar>
        </List>
    );
};

export default ShoppingCart;
