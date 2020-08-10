import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ShoppingCart from "./ShoppingCart";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

function AppBarHeader() {
    const classes = useStyles();
    const shoppingCart = useSelector((state: CartState) => state.shoppingCart);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        console.log("length");
        if (shoppingCart.length === 0 && open === true) {
            console.log("ajouter un element");
            // TODO : snackbar "vous n'avez rien dans votre panier"
            return;
        }

        setOpen(open);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        My e-commerce
                    </Typography>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <Badge
                            badgeContent={shoppingCart.length}
                            color="secondary"
                        >
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <Drawer
                        anchor="right"
                        variant="persistent"
                        open={open}
                        onClose={toggleDrawer(false)}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={toggleDrawer(false)}>
                                <ChevronRightIcon />
                            </IconButton>
                        </div>

                        <ShoppingCart />
                    </Drawer>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppBarHeader;
