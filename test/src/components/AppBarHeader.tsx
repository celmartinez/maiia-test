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
import logo from "../assets/logo.png";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "grey",
    },
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        paddingLeft: "15px",
        paddingTop: "5px",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cart: {
        marginRight: "15px",
    },
}));

const AppBarHeader = () => {
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
        setOpen(open);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton onClick={() => window.location.reload(true)}>
                        <img
                            style={{ width: "45px" }}
                            alt="logo my e-shop"
                            src={logo}
                        />
                    </IconButton>

                    <Typography variant="h5" className={classes.title}>
                        MY E-SHOP
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={toggleDrawer(true)}
                        disabled={shoppingCart.length === 0}
                    >
                        <Badge
                            badgeContent={shoppingCart.length}
                            color="secondary"
                        >
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
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
                        <Badge
                            className={classes.cart}
                            badgeContent={shoppingCart.length}
                            color="secondary"
                        >
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </div>
                    <ShoppingCart />
                </Drawer>
            </AppBar>
        </div>
    );
};

export default AppBarHeader;
