import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import { useAppSelect } from './store/index.hooks';
import { getUserInfo } from './store/modules/user';
import Layout from './component/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>    
  );
}

export default App;
