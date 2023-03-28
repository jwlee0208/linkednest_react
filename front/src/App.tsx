import React from 'react';
import {BrowserRouter, useLocation, useParams} from 'react-router-dom';
import './App.scss';
import Layout from './component/layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>    
  );
}

export default App;
