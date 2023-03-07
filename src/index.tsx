import React from 'react';
import {Provider, useSelector} from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from '@mui/material';
import theme from './component/layout/theme';

export const axiosInst = axios.create({
  baseURL : "http://localhost:9091",
  headers : {
    "Content-Type" : "application/json",
    withCredentials : false
  },
  timeout : 3000,
  
});

axiosInst.interceptors.request.use(
  function (config) {
    const userinfo = store.getState().userSlice;
    if (userinfo.isLogin === true) {
      config.headers.Authorization = `Bearer ${userinfo.accessToken}`;
    }
    console.log('request interceptor >> userinfo : ' + userinfo);
    return config;
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persist = persistStore(store);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
