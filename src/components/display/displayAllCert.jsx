
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./assets/explore.css";
import Loading from "../Loading/Loading";
import { DataGrid } from '@material-ui/data-grid';
import { useState } from "react";
import Table from "./Table";

const DisplayAllCert = ({ allCert }) => {

  const [query, setQuery] = useState("");

  //  allCert.filter((item)=> item.name.toLowerCase().includes(query));
  const search = (allCert) => {
    return allCert.filter((item) => item.name.toLowerCase().includes(query));
  }
  return (
    <>
      <div class="wap">
        <div className="input-box">
          <input type="text" class="search" onChange={e => setQuery(e.target.value.toLowerCase())} />
          <span>Search by name</span>
        </div>
        <Table data={search(allCert)} />

      </div>
    </>
  );
}
export default DisplayAllCert;

