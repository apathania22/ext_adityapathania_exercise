import * as api from '../api';
import {
  FETCH_ALL_QUOTES,
  CREATE_QUOTE,
  DELETE_QUOTE,
  UPDATE_QUOTE,
  FETCH_FILTERED_QUOTES,
} from '../constants/actionTypes';

export const getQuotes = () => async (dispatch) => {
  try {
    const { data } = await api.getQuotes();
    dispatch({ type: FETCH_ALL_QUOTES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createQuote = (quote) => async (dispatch) => {
  try {
    const { data } = await api.createQuote(quote);
    dispatch({ type: CREATE_QUOTE, payload: data });
  } catch (error) {
    alert(error.response.data.errorMessage);
  }
};

export const updateQuote = (id, quote) => async (dispatch) => {
  try {
    const { data } = await api.updateQuote(id, quote);

    dispatch({ type: UPDATE_QUOTE, payload: data });
  } catch (error) {
    alert(error.response.data.errorMessage);
  }
};

export const deleteQuote = (id) => async (dispatch) => {
  try {
    await api.deleteQuote(id);
    dispatch({ type: DELETE_QUOTE, payload: id });
  } catch (error) {
    alert(error.response.data.errorMessage);
  }
};

export const getFilteredQuotes = (authorName) => async (dispatch) => {
  try {
    const { data } = await api.getFilteredQuotes(authorName);
    dispatch({ type: FETCH_FILTERED_QUOTES, payload: data });
  } catch (error) {
    alert(error.response.data.errorMessage);
  }
};
