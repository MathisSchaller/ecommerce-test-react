import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

// Configuration Axios
axios.defaults.baseURL = 'https://reqres.in/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use((res) => {
  const response = { data: res.data.data, status: res.status };
  return response;
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
