
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./assets/explore.css";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from './Pagination';

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
        <div className="input-box">
          <input type="text" class="search" onChange={event => setQuery(event.target.value.toLowerCase())} />
          <span>Search by name</span>
        </div>
        <Table data={search()} />
        {query.length == "" ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allCert.length}
            paginate={paginate}
          />
        ) : (
          <></>
        )}

      </div>
    </>
  );
}
export default DisplayAllCert;

