import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/styles.css";
import logo from "./assets/logo.png";

const Navbar = ({}) => {
  return (
    <>
      <header>
        <div className="container">
          <div className="row navbar_inner">
            <div className="col-3 column">
              <img className="logo_img" src={logo} alt="" />
              <Link to="/">
              <span className="logo_txt">E - Certifier</span>
              </Link>
            </div>
            <div className="col-5"></div>
            <div className="col">
              <div>
                <Link to="/all">All</Link>
                <Link to="/create">Create</Link>
                <Link to="/view">View</Link>
                <Link to="/query">Query</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
