import React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";

import { deleteQuote } from "../../../actions/quotesAction";
import useStyles from "./styles";

const Quote = ({ quote, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            "{quote.text}"
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="textPrimary">
            <i>- {quote.authorName}</i>
          </Typography>
        </CardContent>
      </CardActionArea>
      {!quote.public && (
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              setCurrentId(quote.id);
            }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteQuote(quote.id))}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Quote;
