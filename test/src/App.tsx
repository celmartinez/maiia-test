import React from "react";
import AppBarHeader from "./components/AppBarHeader";
import Products from "./components/Products";
import Box from "@material-ui/core/Box";

function App() {
    return (
        <Box>
            <AppBarHeader />
            <Products />
        </Box>
    );
}

export default App;
