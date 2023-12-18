import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
const logo: string = require("../img/utip-logo.svg").default;

const Header = () => {
  return (
    <header className="Header">
      <NavLink to="/" className="headerLogo">
        <img src={logo} alt="logo" />
      </NavLink>
      <NavLink to="/addrow" className="navLink">
        Add row
      </NavLink>
    </header>
  );
};

export default Header;
