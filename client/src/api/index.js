import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getQuotes = () => API.get("/api/quotes");
export const getFilteredQuotes = (authorName) =>
  API.get(`/api/quotes?authorName=${authorName}`);
export const createQuote = (newQuote) => API.post("/api/quotes", newQuote);
export const updateQuote = (id, updatedQuote) =>
  API.put(`/api/quotes/${id}`, updatedQuote);
export const deleteQuote = (id) => API.delete(`/api/quotes/${id}`);
