import React from 'react';
import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from "./component/Home";
import Login from "./component/Login";
import Mypage from "./component/Mypage";
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/mypage"><button>My Page</button></Link>
      </header>
      <hr/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
        </Routes>
      </main>
    </BrowserRouter>    












/*     <div className="App">
      <header className="App-header">
        <Link to="/">
          <button>Home</button>    
        </Link>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <hr/>
      <main>
        <Switch>
          <Route path='/' element={Home}/>
        </Switch>
      </main>
    </div>
 */  );
}

export default App;
