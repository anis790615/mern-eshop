import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
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
            <Switch>
              <Route exact path="/signin" component={SigninScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/products" component={ProductsScreen} />
              <Route exact path="/cart/:id?" component={CartScreen} />
              <Route exact path="/" component={HomeScreen} />
            </Switch>
          </div>
        </main>
        <footer className="footer">All rights Reserved</footer>
      </div>
    </Router>
  );
}

export default App;
