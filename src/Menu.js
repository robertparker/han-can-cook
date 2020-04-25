import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Menu.css';

function Menu() {
  return (
    <div className="Menu">
      <header className="Menu-header">
        <Link to="/"><img src={logo} className="Menu-logo" alt="logo" /></Link>
          Menu
          <br />
          <br />
          <br />
      </header>
      <div className="row">
        <div className="menuColumn"></div>
          <div className="menuColumn">
            <p><h3>Lunch</h3></p>
            <p>BLT Sandwich</p>
            <p>Tuna or Egg Salad</p>
            <p>Chicken Cutlet Salad</p>
            <p>Grilled Chez</p>
          </div>
          <div className="menuColumn">
            <p><h3>Dinner</h3></p>
            <p>Lettuce-Wrapped Burgers</p>
            <p>Pan Pizza</p>
          </div>
        <div className="menuColumn"></div>
      </div>
      <div className="row">
        <div className="menuColumnMiddle">
        <br />
        <br />
          <p><h3>Takeout</h3></p>
          <p><a href="https://seamless.com">Dealer's Choice!</a></p>
        </div>
      </div>
  </div>
  );
}

export default Menu;
