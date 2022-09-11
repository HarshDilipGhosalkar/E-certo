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
                      <button className="reupload_btn">
                        <span>
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="plus"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <defs>
                              <style></style>
                            </defs>
                            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                          </svg>
                        </span>
                        Add Recipients
                      </button>
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
                                <td scope="col">{data.name}</td>
                                <td scope="col">{data.SAP}</td>
                                <td scope="col">{data.course}</td>
                                <td scope="col">{data.email}</td>
                                <td scope="col">{data.passoutYear}</td>
                                <td scope="col">{data.percentage}</td>
                                <td scope="col">{data.contact}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="action-area">
                      <div className="action-head">Action</div>
                      {this.state.excelData.map((data) => {
                        return (
                          <div className="action-icon">
                            <button name="edit" className="action-btn">
                              <span
                                role="img"
                                aria-label="edit"
                                tabindex="-1"
                                class="icon-edit"
                              >
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="edit"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M761.1 288.3L687.8 215 325.1 577.6l-15.6 89 88.9-15.7z"
                                    fill="#e6f7ff"
                                  ></path>
                                  <path
                                    d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89z"
                                    fill="#1890ff"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                console.log(data.SAP);
                                var excelData = this.state.excelData;
                                var index = this.state.excelData.indexOf(data);
                                // console.log(index)
                                if (index > -1) {
                                  excelData.splice(index, 1);
                                  this.setState({excelData: excelData})
                                }
                              }}
                              name="delete"
                              className="action-btn"
                            >
                              <span
                                role="img"
                                aria-label="delete"
                                class="icon-delete"
                              >
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="delete"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M292.7 840h438.6l24.2-512h-487z"
                                    fill="#e6f7ff"
                                  ></path>
                                  <path
                                    d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-504-72h304v72H360v-72zm371.3 656H292.7l-24.2-512h487l-24.2 512z"
                                    fill="#1890ff"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
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
