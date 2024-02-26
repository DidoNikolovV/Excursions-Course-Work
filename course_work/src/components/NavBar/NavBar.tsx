import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Начало
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/excursions/cancel" className="navbar-link">
            Регистрации
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
