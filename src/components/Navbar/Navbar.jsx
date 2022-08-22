import React from "react";
import{ Component } from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/styles.css";
import logo from "./assets/logo.png";
class Navbar extends Component {
  constructor(props) {
    super(props);
    
  }

  
  render() {
    return (
      <>
            <header>
        <div className="container">
          <div className="row navbar_inner">
            <div className="col-3 column">
            <Link to="/">
              <img className="logo_img" src={logo} alt="" />
             
              <span className="logo_txt">E - Certifier</span>
              </Link>
            </div>
            <div className="col-5"></div>
            <div className="col">
              <div>
              
                <Link to="/all">All</Link>
                {this.props.accountAddress =="0xEde1A0159E02f488119DFf1D5c5059Fb0c1f1073" ? (
                      <>
                        <Link to="/create">Create</Link>
                      </>
                    ) : (
                      <></>
                    )}
               
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
  }
}
export default Navbar;

