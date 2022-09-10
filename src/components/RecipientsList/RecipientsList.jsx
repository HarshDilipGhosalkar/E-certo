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
    } else {
      this.setState({ excelData: null });
    }
  };

  createCertificates = async () => {
    this.props.createBulkCertificate(this.state.excelData);
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
                        <span className="light_fg">
                          Certificate / Upload Spreadsheet /{" "}
                        </span>{" "}
                        Recipients List
                      </p>
                      <h5>Recipients List</h5>
                    </div>
                    <div className="col-6">
                      <div className="file_input_area">
                        <br />
                        <button
                          className="reupload_btn"
                          onClick={() => {
                            this.setState({ excelData: null });
                            window.location.reload();
                          }}
                        >
                          Reupload Spreadsheet
                        </button>
                        <button
                          className="publish_btn"
                          onClick={this.createCertificates}
                        >
                          Publish Certificates
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="upload_excel_main">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <button>Add Recipients</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="table-area">
                      <table class="recipient-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Sap Id</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Passout Year</th>
                            <th>Percentage</th>
                            <th>Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.excelData.map((data) => {
                            return (
                              <tr>
                                <td scope="col">{data.SAP}</td>
                                <td scope="col">{data.name}</td>
                                <td scope="col">{data.course}</td>
                                <td scope="col">{data.email}</td>
                                <td scope="col">{data.passoutYear}</td>
                                <td scope="col">{data.contact}</td>
                                <td scope="col">{data.issueDate}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="recipient-table">
                  <table>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                      <th>Points</th>
                    </tr>
                    <tr>
                      <td>Jill</td>
                      <td>Smith</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td>Eve</td>
                      <td>Jackson</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>50</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td>Adam</td>
                      <td>Johnson</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>67</td>
                      <td>50</td>
                      <td>50</td>
                    </tr>
                  </table>
                </div> */}
              </div>
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
