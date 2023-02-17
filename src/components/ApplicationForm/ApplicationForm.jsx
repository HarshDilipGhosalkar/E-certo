import React, { Component } from "react";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      SAP: "",
      course: "",
      email: "",
      newData: null,
    };
  }
  render() {
    return (
      <div className="excel_page root-div">
        <div className="excel_component">
          <div className="upload_excel_header">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <p className="path">
                    <span className="light_fg">Application Form / </span>
                    {/* Recipients List */}
                  </p>
                  <h5>Application Form</h5>
                </div>
                <div className="col-6">
                  <div className="file_input_area">
                    <br />
                    <button className="publish_btn">Send Application</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="upload_excel_main">
            <div className="container">
              <p>Name</p>
              <input
                type="text"
                // value={this.state.name}
                // onChange={(e) => {
                //   this.setState({
                //     name: e.target.value,
                //   });
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;
