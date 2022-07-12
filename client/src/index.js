import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';

import { reducers } from './reducers';

const clientId = process.env.REACT_APP_CLIENT_ID;
const audience = process.env.REACT_APP_AUDIENCE;
const domain = process.env.REACT_APP_DOMAIN;

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audience}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
