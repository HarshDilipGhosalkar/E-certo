import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {Add, Edit, Delete, Confirm, Cancel} from './Svg'
import "./assets/styles.css";

class RecipientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: [],
      editRowData: null,
      name: "",
      SAP: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      contact: "",
      addNew: false,
      newData: null,
    };
  }

  componentDidMount = async () => {
    await this.extractDataFromSpreadsheet();
  };

  extractDataFromSpreadsheet = async () => {
    if (this.props.excelFile !== null) {
      const workbook = XLSX.read(this.props.excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      var excelData = [];
      data.map((details) => {
        excelData.push({
          name: details.name,
          course: details.course,
          email: details.email,
          passoutYear: details.passoutYear,
          percentage: details.percentage,
          SAP: details.SAP,
          contact: details.contact,
        });
      });
      this.setState({ excelData: excelData });
    } else {
      this.setState({ excelData: null });
    }
  };

  createCertificates = async () => {
    this.props.createBulkCertificate(this.state.excelData);
  };

  addNew = () => {
    var excelData = this.state.excelData;
    excelData.unshift({
      name: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      SAP: "",
      contact: "",
    });
    this.setState({
      excelData: excelData,
      addNew: true,
      newData: excelData[0],
    });
  };

  resetState = () => {
    this.setState({
      addNew: false,
      name: "",
      course: "",
      email: "",
      passoutYear: "",
      percentage: "",
      SAP: "",
      contact: "",
      newData: null,
      editRowData: null,
    });
  };

  render() {
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
                      {this.state.addNew || this.state.editRowData !== null ? (
                        <button className="reupload_btn" disabled>
                          <Add />
                          Add Recipients
                        </button>
                      ) : (
                        <button className="reupload_btn" onClick={this.addNew}>
                          <Add />
                          Add Recipients
                        </button>
                      )}
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
                                {this.state.editRowData !== data &&
                                this.state.newData !== data ? (
                                  <>
                                    <td scope="col">{data.name}</td>
                                    <td scope="col">{data.SAP}</td>
                                    <td scope="col">{data.course}</td>
                                    <td scope="col">{data.email}</td>
                                    <td scope="col">{data.passoutYear}</td>
                                    <td scope="col">{data.percentage}</td>
                                    <td scope="col">{data.contact}</td>
                                  </>
                                ) : (
                                  <>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.name}
                                        onChange={(e) =>
                                          this.setState({
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.SAP}
                                        onChange={(e) =>
                                          this.setState({ SAP: e.target.value })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.course}
                                        onChange={(e) =>
                                          this.setState({
                                            course: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.email}
                                        onChange={(e) =>
                                          this.setState({
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.passoutYear}
                                        onChange={(e) =>
                                          this.setState({
                                            passoutYear: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.percentage}
                                        onChange={(e) =>
                                          this.setState({
                                            percentage: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="editing-row" scope="col">
                                      <input
                                        type="text"
                                        value={this.state.contact}
                                        onChange={(e) =>
                                          this.setState({
                                            contact: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                  </>
                                )}
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
                          <>
                            {this.state.editRowData === null &&
                            !this.state.addNew ? (
                              <>
                                <div className="action-icon">
                                  <button
                                    onClick={() => {
                                      this.setState({ editRowData: data });
                                      this.setState({
                                        name: data.name,
                                        SAP: data.SAP,
                                        course: data.course,
                                        email: data.email,
                                        passoutYear: data.passoutYear,
                                        percentage: data.percentage,
                                        contact: data.contact,
                                      });
                                    }}
                                    name="edit"
                                    className="action-btn"
                                  >
                                    <Edit />
                                  </button>
                                  <button
                                    onClick={() => {
                                      var excelData = this.state.excelData;
                                      var index = this.state.excelData.indexOf(
                                        data
                                      );
                                      if (index > -1) {
                                        excelData.splice(index, 1);
                                        this.setState({
                                          excelData: excelData,
                                        });
                                      }
                                    }}
                                    name="delete"
                                    className="action-btn"
                                  >
                                    <Delete />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                {this.state.addNew &&
                                this.state.newData === data ? (
                                  <div className="action-icon edit_option">
                                    <button
                                      name="conform-edit"
                                      className="action-btn"
                                      onClick={() => {
                                        var allData = this.state.excelData;
                                        var index = allData.indexOf(data);
                                        if (index !== -1) {
                                          allData[index] = {
                                            name: this.state.name,
                                            course: this.state.course,
                                            email: this.state.email,
                                            passoutYear: this.state.passoutYear,
                                            percentage: this.state.percentage,
                                            SAP: this.state.SAP,
                                            contact: this.state.contact,
                                          };

                                          this.setState({ excelData: allData });
                                        }
                                        this.resetState();
                                      }}
                                    >
                                      <Confirm />
                                    </button>
                                    <button
                                      name="cancel-edit"
                                      className="action-btn"
                                      onClick={() => {
                                        var excelData = this.state.excelData;
                                        excelData.splice(0, 1);
                                        this.setState({
                                          excelData: excelData,
                                          addNew: false,
                                        });
                                        this.resetState();
                                      }}
                                    >
                                      <Cancel />
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    {this.state.editRowData === data ? (
                                      <div className="action-icon edit_option">
                                        <button
                                          name="conform-edit"
                                          className="action-btn"
                                          onClick={() => {
                                            var allData = this.state.excelData;
                                            var index = allData.indexOf(data);
                                            if (index !== -1) {
                                              allData[index] = {
                                                name: this.state.name,
                                                course: this.state.course,
                                                email: this.state.email,
                                                passoutYear: this.state
                                                  .passoutYear,
                                                percentage: this.state
                                                  .percentage,
                                                SAP: this.state.SAP,
                                                contact: this.state.contact,
                                              };

                                              this.setState({
                                                excelData: allData,
                                              });
                                            }
                                            this.resetState();
                                          }}
                                        >
                                          <Confirm />
                                        </button>
                                        <button
                                          name="cancel-edit"
                                          className="action-btn"
                                          onClick={this.resetState}
                                        >
                                          <Cancel />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="action-icon">
                                        <button
                                          name="edit"
                                          className="action-btn"
                                          disabled
                                        >
                                          <Edit />
                                        </button>
                                        <button
                                          name="delete"
                                          className="action-btn"
                                          disabled
                                        >
                                          <Delete />
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
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
