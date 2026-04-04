import React from "react";
import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/styles.css";
import logo from "./assets/E-Certo.svg";

// keep in sync with App.js
const ADMIN_ADDRESSES = [
  "0xdfa2f788a5d70f4464f2cbb7dbfef1044cf36e1e",
  "0xeeccb526299a611322f46802f9a2afda505a1e14",
  "0x7b54060dabce12d2536081473d1701017abf6ebb",
  "0x83632f0a6ae1402cffde97cfd11d573e9581a8d4",
];

function isAdmin(address) {
  return address && ADMIN_ADDRESSES.includes(address.toLowerCase());
}
class Navbar extends Component {
  render() {
    const admin = isAdmin(this.props.accountAddress);
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
                  {admin ? (
                    <>
                      <Link to="/dashboard" id="all" class="navbar-link">
                        Dashboard
                      </Link>
                      <Link to="/event-certificates" id="all2" class="navbar-link">
                        Event Certificate
                      </Link>
                      <Link
                        to="/certificates/recipients"
                        id="create"
                        class="navbar-link"
                      >
                        Create Certificate
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
        <footer>
          <span>© 2022 Certifier. All rights reserved.</span>
        </footer>
      </>
    );
  }
}
export default Navbar;
