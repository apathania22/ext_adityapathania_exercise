import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import QuoteCard from './QuoteCard/QuoteCard';
import { getQuotes } from './../../actions/quotesAction';

const randomInteger = () => Math.floor(Math.random() * (100 - 1 + 1) + 1);

export default function Quotes({
  setCurrentId,
  isAuthenticated,
  isSearch,
  user,
  query,
  currentId,
  getAccessTokenSilently,
}) {
  const dispatch = useDispatch();
  const [publicQuotes, setPublicData] = useState([]);

  const quotes = useSelector((state) => state.quotes);
  const randomInt = randomInteger();

  useEffect(() => {
    const getPrivateQuotes = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUDIENCE,
        });
        localStorage.setItem('accessToken', accessToken);

        if (!query && isAuthenticated) {
          dispatch(getQuotes());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPrivateQuotes();
  }, [isAuthenticated, getAccessTokenSilently, currentId, dispatch, query]);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://acf-ts-quotes-api-kfu8a.ondigitalocean.app/api/quotes?page=${randomInt}`
        );
        setPublicData(results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const publicQuotesWithFlag = publicQuotes.map((q) => ({
    ...q,
    public: true,
  }));

  const aggregateQuotesData = [...publicQuotesWithFlag, ...quotes];

  return !(isAuthenticated ? aggregateQuotesData : publicQuotes).length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {(isAuthenticated ? (isSearch ? quotes : aggregateQuotesData) : publicQuotesWithFlag).map(
        (quote) => (
          <Grid key={quote.id} item xs={12} sm={6} md={6}>
            <QuoteCard quote={quote} setCurrentId={setCurrentId} user={user} />
          </Grid>
        )
      )}
    </Grid>
  );
}
