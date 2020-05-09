import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/menu"><img src={logo} className="App-logo" alt="logo" /></Link>
        <div className="siteTitle">
          Better Next Day
        </div>
        <div className="siteSubtitle">
          🖤 Hanhith
          </div>
      </header>
    </div>
  );
}

export default App;
