import React                      from 'react';
import { Provider }               from 'react-redux';
import { PersistGate }            from 'redux-persist/integration/react';
import { persistStore }           from 'redux-persist';
import { Container, CssBaseline } from '@mui/material';
import ReactDOM                   from 'react-dom/client';
import App                        from './App';
import reportWebVitals            from './reportWebVitals';
import axios                      from 'axios';
import store                      from './store';
import './index.scss';
import userSlice                  from './store/modules/user';
import { CookiesProvider }        from 'react-cookie';
import { getCookie, setCookie }              from './cookie';
import { encode as base64_encode }       from 'base-64';


export const axiosInstance = axios.create({
  // baseURL : `${process.env.REACT_APP_API_DOMAIN}`,
  withCredentials : (`${process.env.REACT_APP_WITH_CREDENTIALS}`) === 'true',
  timeout : 3000,
  headers : {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Origin" : window.location.origin,
  },
});

interface Token{
  sub : string;
  iat : number;
  exp : number;
}

axiosInstance.interceptors.request.use(
  function (config) {
    const userinfo = store.getState().userSlice;
console.log("request interceptor start >>>");
    let cookieAccessToken = getCookie("accessToken");

console.log(`>>> cookieAccessToken : ${cookieAccessToken}`);

    if (userinfo.isLogin === true   || (cookieAccessToken !== '' && cookieAccessToken  !== undefined)) {
      let reqAccessToken           = userinfo.accessToken;
      if (reqAccessToken === '') {
        reqAccessToken = cookieAccessToken;
      }
      config.headers.Authorization = `Bearer ${reqAccessToken}`;
    }
    console.log(`>>> axios req config : ${JSON.stringify(config)}`);

    return config;
  },
  function (error) {
    // to-do
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    // to-do
    // console.log('[axios response] response : ', JSON.stringify(response));

    return response;
  },
  async function(error) {
    // to-do
    const {config, response : {status}, } = error;
    const originalReq = config;

    if (status === 401) {
      const userinfo      = store.getState().userSlice;
      const refreshToken  = userinfo.refreshToken;
      try {
        const {data} = await axiosInstance({
          method  : 'post',
          url     : '/reIssueToken',
          data    : {refreshToken : refreshToken},
        });
        if (data.returnCode === 10000) {

          store.dispatch(userSlice.actions.updateAccessToken(data))

          const newAccessToken      = data.accessToken;
          const newRefreshToken     = data.refreshToken;
          originalReq.Authorization = `Bearer ${newAccessToken}`;
          
          setCookie(`accessToken`, newAccessToken, {
            path: '/',
            maxAge: 24 * 60 * 60,
            domain: '.linkednest.site'
          });

          return await axiosInstance(originalReq);  
        }
      } catch (err) {
        console.log('err : ' + JSON.stringify(err));
        // new Error(err);
      }
    } else if (status === 403) {
      alert("Can't Accessable");
    } else if (status === 500) {
      const userinfo = store.getState().userSlice;
      console.log("request interceptor start >>>");
  
      if (userinfo.isLogin === true) {
        let reqAccessToken = userinfo.accessToken;
        if (reqAccessToken === '') {
          userinfo.isLogin = false;
          userinfo.userId = '';
          userinfo.nickname = '';
        }   
      }
  
      alert(`[CODE : ${status}][${error.name}] ${error.message}`);
    }
    return Promise.reject(error);
  }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persist = persistStore(store);

root.render(
  <>
    {/* <React.StrictMode> */}
    {/* <ThemeProvider theme={theme}> */}
    <CssBaseline />
    <Container maxWidth={false} disableGutters={true}>  
      <CookiesProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
            <App/>
          </PersistGate>
        </Provider>
      </CookiesProvider>
    </Container>
    {/* </ThemeProvider> */}
    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
