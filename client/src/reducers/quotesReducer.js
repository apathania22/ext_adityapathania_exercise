import {
  FETCH_ALL_QUOTES,
  CREATE_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
  FETCH_FILTERED_QUOTES,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (quotes = [], action) => {
  switch (action.type) {
    case FETCH_ALL_QUOTES:
      return action.payload;
    case CREATE_QUOTE:
      return [...quotes, action.payload];
    case UPDATE_QUOTE:
      return quotes.map((quote) =>
        quote.id === action.payload.id ? action.payload : quote
      );
    case DELETE_QUOTE:
      return quotes.filter((quote) => quote.id !== action.payload);
    case FETCH_FILTERED_QUOTES:
      return action.payload;
    default:
      return quotes;
  }
};
