import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import QuoteCard from "./QuoteCard/QuoteCard";

const randomInteger = () => Math.floor(Math.random() * (100 - 1 + 1) + 1);
const PUBLIC_API_URL =
  "https://acf-ts-quotes-api-kfu8a.ondigitalocean.app/api/quotes?page=";

export default function Quotes({ setCurrentId, isAuthenticated, isSearch }) {
  const [publicQuotes, setPublicData] = useState([]);
  const quotes = useSelector((state) => state.quotes);
  const randomInt = randomInteger();

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { results },
        } = await axios.get(`${PUBLIC_API_URL}${randomInt}`);
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
      {(isAuthenticated
        ? isSearch
          ? quotes
          : aggregateQuotesData
        : publicQuotesWithFlag
      ).map((quote) => (
        <Grid key={quote.id} item xs={12} sm={6} md={6}>
          <QuoteCard quote={quote} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
