import React from 'react';
import {BrowserRouter, useLocation, useParams} from 'react-router-dom';
import './App.css';
import Layout from './component/layout/Layout';
import Layout2 from './component/layout/Layout2';


// const getTypeId = (state : any) => state.typeId; 

function App() {

  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>    
  );
}

export default App;
