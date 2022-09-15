import React, { Component, useEffect } from "react";
import { useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import add from "./assets/add.svg";
import s from "./assets/search.svg";

class DisplayAllCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      currentPage: 1,
      postsPerPage: 10,
      passoutyear: 0,
      py: 0,
      filters: 0,
      department: "",
      dept: "",
      SAP: 0,
    };
  }

  componentDidMount = () => this.props.handleActiveLink("#all");

  emailLoop = (certList) => {
    certList.forEach((cert) => {
      this.props.sendEmail(cert.name, cert.email, cert.transactionHash);
    });
  };
  enableState = () => {
    var btnstate = document.getElementById("resend-btn");
    btnstate.style.backgroundColor = "white";
    btnstate.style.color = "#40a9ff";
    btnstate.style.border = "1px solid #40a9ff";
    btnstate.style.cursor = "pointer";
  };
  disableState = () => {
    var btnstate = document.getElementById("resend-btn");
    btnstate.style.color = "rgba(0,0,0,0.25)";
    btnstate.style.border = "1px solid #d9d9d9";
    btnstate.style.cursor = "not-allowed";
  };
  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
  search = () => {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const allCert = this.props.allCert;
    // if (this.state.query.length == "") {
    //   return allCert.slice(indexOfFirstPost, indexOfLastPost);
    // } else {
    //   return allCert.filter((item) => item.name.toLowerCase().includes(this.state.query));
    // }
    if (this.state.query.length != "") {
      return allCert.filter((item) =>
        item.name.toLowerCase().includes(this.state.query)
      );
    } else if (this.state.passoutyear != 0) {
      return allCert.filter(
        (item) => item.passoutYear.toNumber() == this.state.passoutyear
      );
    } else {
      return allCert.slice(indexOfFirstPost, indexOfLastPost);
    }
  };
  toggleFilterdiv = () => {
    document.querySelector(".department-div").style.display = "none";
    document.querySelector(".passout-div").style.display = "none";
    document.querySelector(".SAP-div").style.display = "none";
    var x = document.querySelector(".fill");
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    // console.log(this.state.passoutyear);
  };
  setquery = async (query) => {
    await this.setState({ query: query });
  };
  dept = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".department-div").style.display = "block";
  };
  passout = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".passout-div").style.display = "block";
  };
  SAP = () => {
    document.querySelector(".fill").style.display = "none";
    document.querySelector(".SAP-div").style.display = "block";
  };
  addYear = async () => {
    await this.setState({ query: "" });
    await this.setState({ passoutyear: this.state.py });
    await this.setState({ py: 0 });
    document.querySelector(".passout-div").style.display = "none";
    console.log(this.state.passoutyear);
  };
  addDept = async () => {
    await this.setState({ query: "" });
    await this.setState({ department: this.state.dept });
    document.querySelector(".department-div").style.display = "none";
    console.log(this.state.department);
  };
  addSAP = async () => {
    await this.setState({ query: "" });
    await this.setState({ SAP: this.state.py });
    await this.setState({ py: 0 });
    document.querySelector(".SAP-div").style.display = "none";
    console.log(this.state.SAP);
  };
  render() {
    return (
      <>
        <div class="wap">
          <div className="upper-div">
            <div className="tag-div">
              <span class="cer1">Certificates</span>
              <h1 class="cer2">Certificates</h1>
            </div>
            <div className="issuer-div">
              <button className="issuer-btn">
                <span>
                  <img src={add} alt="" />
                </span>
                <span>Issue Certificate</span>
              </button>
            </div>
          </div>
          <div className="lower-div">
            <div className="filter-div">
              <div className="search-div">
                <h5>
                  <span>
                    <img src={s} alt="" />
                  </span>
                  Search
                </h5>
                <div className="input-box">
                  <input
                    type="text"
                    class="search"
                    placeholder="Search by Name"
                    onChange={(event) =>
                      this.setquery(event.target.value.toLowerCase())
                    }
                  />
                </div>
              </div>
              <div className="hr-div"></div>
              <div className="search-div">
                <div className="filter-header">
                  <h5>
                    <span>
                      <img src={s} alt="" />
                    </span>
                    Filter
                  </h5>
                  <button class="filter-btn">
                    <span>Clear all Filters</span>
                  </button>
                </div>

                <div className="input-box">
                  <input
                    type="text"
                    class="search"
                    onChange={(event) =>
                      this.setState({ query: event.target.value.toLowerCase() })
                    }
                  />
                  <span>Select a group</span>
                </div>
                <div className="add-filter" onClick={this.toggleFilterdiv}>
                  <span>
                    <span class="filter-plus">+</span> Add Filters
                  </span>
                </div>
              </div>
              <div class="fill">
                <span onClick={this.dept}>Department</span>
                <span onClick={this.passout}>Passout year</span>
                <span onClick={this.SAP}>SAP Id</span>
              </div>
              <div className="department-div">
                <input
                  type="text"
                  list="browsers"
                  placeholder="Select Department"
                  onChange={(event) =>
                    this.setState({ dept: event.target.value.toLowerCase() })
                  }
                />
                <datalist id="browsers">
                  <option value="CSE" />
                  <option value="IT" />
                  <option value="EXTC" />
                  <option value="CIVIL" />
                  <option value="MECHANICAL" />
                  <option value="ELECTRICAL" />
                  <option value="PLASTIC" />
                  <option value="INDUSTRIAL" />
                  <option value="DIGITAL" />
                </datalist>
                {this.state.dept.length == "" ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addDept}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addDept}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
              <div className="passout-div">
                <input
                  list="browser"
                  placeholder="Passout year"
                  onChange={(event) =>
                    this.setState({ py: event.target.value.toLowerCase() })
                  }
                />
                <datalist id="browser">
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2014" />
                  <option value="2000" />
                  <option value="2011" />
                  <option value="2012" />
                  <option value="2013" />
                  <option value="2022" />
                </datalist>
                {this.state.py == 0 ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addYear}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addYear}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
              <div className="SAP-div">
                <input
                  placeholder="Enter SAP"
                  onChange={(event) =>
                    this.setState({ py: event.target.value.toLowerCase() })
                  }
                />
                {this.state.py == 0 ? (
                  <>
                    <button
                      className="apply-btn"
                      onClick={this.addSAP}
                      disabled
                    >
                      Apply filter
                    </button>
                  </>
                ) : (
                  <>
                    <button className="apply-btn" onClick={this.addSAP}>
                      Apply filter
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="table-div">
              <Table
                allCert={this.props.allCert}
                data={this.search()}
                enableState={this.enableState}
                disableState={this.disableState}
                emailLoop={this.emailLoop}
              />

              <div className="pagination-div">
                {this.state.query.length == "" ? (
                  <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.props.allCert.length}
                    paginate={this.paginate}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayAllCert;
