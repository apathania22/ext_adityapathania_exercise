import axios from "axios";

const url = "http://localhost:8080/api/quotes";

export const getQuotes = () => axios.get(url);
export const getFilteredQuotes = (authorName) =>
  axios.get(`${url}?authorName=${authorName}`);
export const createQuote = (newQuote) => axios.post(url, newQuote);
export const updateQuote = (id, updatedQuote) =>
  axios.put(`${url}/${id}`, updatedQuote);
export const deleteQuote = (id) => axios.delete(`${url}/${id}`);
