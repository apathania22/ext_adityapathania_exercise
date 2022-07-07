import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createQuote, updateQuote } from "../../actions/quotesAction";
import useStyles from "./styles";

export default function Form({ setCurrentId, currentId }) {
  const dispatch = useDispatch();
  const [quoteData, setQuoteData] = useState({ authorName: "", text: "" });
  const classes = useStyles();
  const updatedQuote = useSelector((state) =>
    currentId ? state.quotes.find((q) => q.id === currentId) : null
  );

  useEffect(() => {
    if (updatedQuote) {
      setQuoteData(updatedQuote);
    }
  }, [updatedQuote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateQuote(currentId, quoteData));
    } else {
      dispatch(createQuote(quoteData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setQuoteData({
      authorName: "",
      text: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} a Quote
        </Typography>
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={quoteData.authorName}
          onChange={(e) =>
            setQuoteData({ ...quoteData, authorName: e.target.value })
          }
        />
        <TextField
          name="text"
          variant="outlined"
          label="Quote"
          fullWidth
          multiline
          rows={4}
          value={quoteData.text}
          onChange={(e) => setQuoteData({ ...quoteData, text: e.target.value })}
        />
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
