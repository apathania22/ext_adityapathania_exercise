import axios from 'axios';

const API = axios.create({ baseURL: 'https://ext-adityapathania-exercise.herokuapp.com/api' });

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getQuotes = () => API.get('/quotes');
export const getFilteredQuotes = (authorName) => API.get(`/quotes?authorName=${authorName}`);
export const createQuote = (newQuote) => API.post('/quotes', newQuote);
export const updateQuote = (id, updatedQuote) => API.put(`/quotes/${id}`, updatedQuote);
export const deleteQuote = (id) => API.delete(`/quotes/${id}`);
