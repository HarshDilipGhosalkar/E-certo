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
                      <Link to="/dashboard" id="all" class="navbar-link">
                        Dashboard
                      </Link>
                      <Link
                        to="/certificates/recipients"
                        id="create"
                        class="navbar-link"
                      >
                        Create
                      </Link>
                      <Link
                        to="/upload-spreadsheet"
                        id="upload"
                        class="navbar-link"
                      >
                        Upload Spreadsheet
                      </Link>
                      <Link
                        to="/findmycertificate"
                        id="query"
                        class="navbar-link"
                      >
                        Query
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/findmycertificate"
                      id="query"
                      class="navbar-link"
                    >
                      Lost your Certficate?
                    </Link>
                  )}
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
