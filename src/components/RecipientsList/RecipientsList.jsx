import React, { Component } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import * as XLSX from "xlsx";

import "./assets/styles.css";

class RecipientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: [],
    };
  }

  componentDidMount = async () => {
    await this.handleSubmit();
  };

  handleSubmit = async () => {
    if (this.props.excelFile !== null) {
      const workbook = XLSX.read(this.props.excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      this.setState({ excelData: data });

      //   createBulkCertificate(data);
    } else {
      this.setState({ excelData: null });
    }
  };

  render() {
    console.log(this.state.excelData);
    return (
      <>
        {this.props.excelFile != null ? (
          <div className="excel_page">
            <div className="excel_component">
              <div className="upload_excel_header">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <p className="path">
                        <span className="light_fg">Certificate / Upload Spreadsheet / </span> Recipients List
                      </p>
                      <h5>Recipients List</h5>
                    </div>
                    <div className="col-6">
                      <div className="file_input_area">
                        <br />
                        <button className="reupload_btn">Reupload Spreadsheet</button>
                        <button className="publish_btn">Publish Certificates</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="upload_excel_main"></div>
            </div>
          </div>
        ) : (
          <Navigate replace to="../upload-spreadsheet" />
        )}
      </>
    );
  }
}

export default RecipientsList;
