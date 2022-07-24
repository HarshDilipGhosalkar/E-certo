import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/main.css";
import logo from "./assets/space.png";
import search from "./search.svg";

const Navbar = ({ }) => {
 
  

  return (
    <>
      <div class="header"></div>
      <header
        id="header"
        class="header fixed-top sticked"
        data-scrollto-offset="0"
      >
        <div class="container-fluid d-flex align-items-center justify-content-between">
          <div class="logo d-flex align-items-center scrollto me-auto me-lg-0">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <Link to="/">
              <h1 class="logotext">E-certo</h1>
            </Link>
          </div>

          <nav id="navbar" class="navbar">
            

            <ul>
              <li>
              <Link to="/create">
                  <h1 class="navbar-text">Create</h1>
              </Link>  
              </li>
              <li>
              <Link to="/view">
                  <h1 class="navbar-text">View</h1>
              </Link> 
              </li>
             
              
            </ul>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Navbar;
