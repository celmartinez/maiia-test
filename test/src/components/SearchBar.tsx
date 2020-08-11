import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "2px 4px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            width: "50%",
            minWidth: 250,
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
    const [researchDone, setResearchDone] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    const handleClick = (event: React.KeyboardEvent | React.MouseEvent) => {
        event.preventDefault();
        if (researchDone) {
            setResearchDone(false);
            props.setToSearch("");
            setSearch("");
        } else {
            const toSearchWithoutSpace = search.replace(" ", "+");
            props.setToSearch(toSearchWithoutSpace);
            setResearchDone(true);
        }
    };

    return (
        <Paper component="form" className={classes.root} elevation={3}>
            <InputBase
                className={classes.input}
                placeholder="Search..."
                onChange={handleChange}
                value={search}
                disabled={researchDone}
            />
            <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={handleClick}
            >
                {researchDone === false ? <SearchIcon /> : <ClearRoundedIcon />}
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
