
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./assets/explore.css";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from './Pagination';
import add from "./assets/add.svg";
import s from "./assets/search.svg";

const DisplayAllCert = ({ allCert }) => {

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);



  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;


  const paginate = pageNumber => setCurrentPage(pageNumber);
  const search = () => {
    if (query.length == "") {
      return allCert.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      return allCert.filter((item) => item.name.toLowerCase().includes(query));
    }


  }
  return (
    <>
      <div class="wap">
        <div className="upper-div">
          <div className="tag-div">
            <span class="cer1">
              Certificates
            </span>
            <h1 class="cer2">
              Certificates
            </h1>
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
                <input type="text" class="search" onChange={event => setQuery(event.target.value.toLowerCase())} />
                <span>Search by name</span>
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
                <input type="text" class="search" onChange={event => setQuery(event.target.value.toLowerCase())} />
                <span>Select a group</span>
              </div>
            </div>
          </div>
          <div className="table-div">
            <div className="table-btn">
            <h5>1 Certificate
              </h5>
              <button disabled>Resend Email</button>
            </div>
            <div className="hr2"></div>
            <div className="tab">
            <Table data={search()} />
            </div>
          </div>
        </div>
        
        {/* {query.length == "" ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allCert.length}
            paginate={paginate}
          />
        ) : (
          <></>
        )} */}

      </div>
    </>
  );
}
export default DisplayAllCert;

