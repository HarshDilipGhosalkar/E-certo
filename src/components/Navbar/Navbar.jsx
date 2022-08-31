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
              
                
                {this.props.accountAddress =="0x41e5226215F536572DDa181e797Deb1878D94e3D" || this.props.accountAddress=="0xf19dAfbbb3ed2A01a1bd7c51A0e95970c09f800a" ? (
                      <>
                      <Link to="/all">All</Link>
                        <Link to="/create">Create</Link>
                        <Link to="/createFromExel">Upload Exel</Link>
                      </>
                    ) : (
                      <></>
                    )}
               
                
                <Link to="/findmycertificate">Query</Link>
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

