import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "2px 4px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    })
);

const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();
    const [search, setSearch] = useState("");

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        event.preventDefault();

        setSearch(event.target.value);
    };

    const handleClick = (event: React.KeyboardEvent | React.MouseEvent) => {
        event.preventDefault();
        const toSearchWithoutSpace = search.replace(" ", "+");
        props.setToSearch(toSearchWithoutSpace);
    };

    return (
        <Paper component="form" className={classes.root} elevation={3}>
            <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
                onChange={handleChange}
            />
            <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={handleClick}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
