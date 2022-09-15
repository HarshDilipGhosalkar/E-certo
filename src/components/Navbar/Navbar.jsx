import React from "react";
import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/styles.css";
import logo from "./assets/logo.svg";
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <header>
          <div className="container">
            <div className="row navbar_inner">
              <div className="col-2 logo-area">
                <Link to="/">
                  <span className="navbar-logo">
                    <img src={logo} alt="" />
                  </span>
                </Link>
              </div>
              {this.props.accountAddress ==
                "0x41e5226215F536572DDa181e797Deb1878D94e3D" ||
              this.props.accountAddress ==
                "0xB641B4F1795a4BfA2cC7056E08cFB2b199831248" ? (
                <>
                  {/* <div className="col link-element">
                        <Link to="/all">All</Link>
                      </div>
                      <div className="col link-element">
                        <Link to="/certificates/recipients">Create</Link>
                      </div>
                      <div className="col link-element">
                        <Link to="/upload-spreadsheet">Upload Excel</Link>
                      </div> */}
        {/* 
                  <ul class="nav">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">
                        Active
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                    </li>
                  </ul>
                </>
              ) : null}
              <div className="col link-element">
                <Link to="/findmycertificate">Query</Link>
              </div>
            </div>
          </div>
        </header>  */}
        <header>
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <Link to="/">
                <span className="navbar-logo">
                  <img src={logo} alt="" />
                </span>
              </Link>

              <div>
                <div class="navbar-nav">
                  {this.props.accountAddress ==
                    "0x41e5226215F536572DDa181e797Deb1878D94e3D" ||
                  this.props.accountAddress ==
                    "0xB641B4F1795a4BfA2cC7056E08cFB2b199831248" ? (
                    <>
                      <Link to="/all" id="all" class="navbar-link">
                        Dashboard
                      </Link>
                      <Link to="/certificates/recipients" id="create" class="navbar-link">
                        Create
                      </Link>
                      <Link to="/upload-spreadsheet" id="upload" class="navbar-link">
                        Upload Spreadsheet
                      </Link>
                    </>
                  ) : null}
                  <Link to="/findmycertificate" id="query" class="navbar-link">
                    Query
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <Outlet />
      </>
    );
  }
}
export default Navbar;
