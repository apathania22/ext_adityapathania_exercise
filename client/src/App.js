import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Grow,
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Form,
  Quotes,
  SearchBar,
  LoginButton,
  LogOutButton,
  ConditionalWrapper,
} from "./components";
import image from "./images/download.png";
import { getQuotes } from "./actions/quotesAction";
import useStyles from "./styles";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const [currentId, setCurrentId] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const getPrivateQuotes = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        localStorage.setItem("accessToken", accessToken);
        if (!query) {
          dispatch(getQuotes());
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getPrivateQuotes();
  }, [getAccessTokenSilently, currentId, dispatch, query]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.mainDiv}>
          <div className={classes.innerDiv}>
            <Typography className={classes.heading} variant="h2" align="center">
              Quotes Hub
            </Typography>
            <img
              className={classes.image}
              src={image}
              alt="icon"
              height="60"
              width="90"
            />
          </div>
          <div className={classes.profile}>
            <div className={classes.name}>
              {isAuthenticated ? user.name : null}
            </div>
            {isAuthenticated ? <LogOutButton /> : <LoginButton />}
          </div>
        </div>
      </AppBar>
      {isAuthenticated && (
        <SearchBar
          query={query}
          setIsSearch={setIsSearch}
          setQuery={setQuery}
        />
      )}
      <Grow in>
        <Container>
          <ConditionalWrapper
            condition={isAuthenticated}
            wrapper={(children) => (
              <Grid
                container
                justify="space-between"
                alignItems="stretch"
                spacing={3}
              >
                {children}
              </Grid>
            )}
          >
            <Grid flexGrow={1} item xs={12} sm={7}>
              <Quotes
                isAuthenticated={isAuthenticated}
                setCurrentId={setCurrentId}
                isSearch={isSearch}
                user={user}
              />
            </Grid>
            {isAuthenticated && (
              <Grid item xs={12} sm={4}>
                <Form
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  name={user?.name}
                />
              </Grid>
            )}
          </ConditionalWrapper>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
