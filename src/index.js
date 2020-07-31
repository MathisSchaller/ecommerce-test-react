import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

// Store
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mainReducer from './store/mainReducer';

import AuthContextProvider from './store/auth/auth-context';

// Configuration Axios
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use((res) => {
  const response = { data: res.data, status: res.status };
  console.log('[AXIOS RESPONSE]', res);
  return response;
});
axios.interceptors.request.use((req) => {
  console.log('[AXIOS REQUEST]', req);
  return req;
});

// Logs uniquement en dev
React.log =
  process.env.NODE_ENV === 'development'
    ? console.log
    : () => {};

// Middleware
const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      React.log('[Redux Middleware]', action, store.getState());
      return result;
    };
  };
};

// Redux Store
const store = createStore(
  mainReducer,
  applyMiddleware(logger, thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
