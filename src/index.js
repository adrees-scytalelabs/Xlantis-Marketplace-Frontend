import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from "./app/containers/App/Application";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { store } from './store';

// axios.defaults.withCredentials = true;

if (process.env.REACT_APP_BACKEND_SERVER_ADDRESS)
  axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_SERVER_ADDRESS}`;
// else axios.defaults.baseURL = `http://localhost:3000`;
else axios.defaults.baseURL = `https://raindrop-backend.herokuapp.com/`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
