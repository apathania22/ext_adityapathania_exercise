import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { getQuotes, getFilteredQuotes } from "./../../actions/quotesAction";
import useStyles from "./../../styles";

const SearchBar = ({ query, setQuery, setIsSearch }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(getFilteredQuotes(query));
    setIsSearch(true);
  };

  const reset = () => {
    setQuery("");
    dispatch(getQuotes());
    setIsSearch(false);
  };

  return (
    <div className={classes.searchBarWrapper}>
      <TextField
        align="center"
        className={classes.searchBar}
        label="Search..."
        id="fullWidth"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={classes.btn}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          onClick={handleChange}
        >
          Search
        </Button>
      </div>

      <Button
        variant="contained"
        color="secondary"
        size="small"
        type="submit"
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  );
};

export default SearchBar;
