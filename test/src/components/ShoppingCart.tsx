import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

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
        <List /* dense={true} */>
            {shoppingCart?.map((product) => (
                <div key={product?.id}>
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
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
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            ))}
        </List>
    );
}

export default ShoppingCart;
