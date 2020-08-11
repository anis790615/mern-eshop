import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

import "./App.css";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">AmazonClone</Link>
          </div>
          <div className="header-links">
            <a href="signin.html">Sign In</a>
            <a href="cart.html">Cart</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button onClick={closeMenu} className="sidebar-close-button">
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Game Consoles</a>
            </li>
            <li>
              <a href="index.html">Video Games</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" exact component={ProductScreen}></Route>
            <Route path="/" exact component={HomeScreen}></Route>
          </div>
        </main>
        <footer className="footer">All rights Reserved</footer>
      </div>
    </Router>
  );
}

export default App;
