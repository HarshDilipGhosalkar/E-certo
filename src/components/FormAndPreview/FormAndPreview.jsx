import React, { Component } from "react";
import "./style.css";

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Course: "",
      gmail: "",
      collegeName: "",
      passout_year: "",
      percentage: "",
      SAPId: "",
      rollNo: "",
      contact: ""
    };
  }
  callCreateCertFromApp = (e) => {
    e.preventDefault();

    this.props.createCertificate(
      this.state.Name,
      this.state.Course,
      this.state.gmail,
      this.state.collegeName,
      this.state.passout_year,
      this.state.percentage,
      this.state.SAPId,
      this.state.rollNo,
      this.state.contact,
    );
  };

  render() {
    return (
      <div>
        <div class="main-u">
          <div class="inner-u">
            <div class="form-c">
              <form onSubmit={this.callCreateCertFromApp}>
                <h1>Create New Certificate</h1>
                <p class="sub-head">
                  <span class="highlight">* </span>Required fields{" "}
                </p>

                <label for="text-1542372332072" class="head">
                  Name <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332012"
                    id="text-1542372332012"
                    required="required"
                    value={this.state.Name}
                    placeholder="Name"
                    onChange={(e) => this.setState({ Name: e.target.value })}
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>
                <br />
                <label for="text-1542372332072" class="head">
                  Course <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332032"
                    id="text-1542372332032"
                    required="required"
                    value={this.state.Course}
                    placeholder="Course"
                    onChange={(e) =>
                      this.setState({ Course: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  Gmail <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332000"
                    id="text-1542372332000"
                    required="required"
                    value={this.state.gmail}
                    placeholder="Gmail"
                    onChange={(e) =>
                      this.setState({ gmail: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  CollegeName <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332001"
                    id="text-1542372332001"
                    required="required"
                    value={this.state.collegeName}
                    placeholder="College Name"
                    onChange={(e) =>
                      this.setState({ collegeName: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  Passout year <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332031"
                    id="text-1542372332031"
                    required="required"
                    value={this.state.passout_year}
                    placeholder="passout year"
                    onChange={(e) =>
                      this.setState({ passout_year: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  percentage <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332022"
                    id="text-1542372332022"
                    required="required"
                    value={this.state.percentage}
                    placeholder="Percentage"
                    onChange={(e) =>
                      this.setState({ percentage: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  SAPId <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332932"
                    id="text-1542372332092"
                    required="required"
                    value={this.state.SAPId}
                    placeholder="College Name"
                    onChange={(e) =>
                      this.setState({ SAPId: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  Roll No <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332035"
                    id="text-1542372332035"
                    required="required"
                    value={this.state.rollNo}
                    placeholder="Roll No"
                    onChange={(e) =>
                      this.setState({ rollNo: e.target.value })
                    }
                  ></input>
                </div>

                <br />
                <label for="text-1542372332072" class="head">
                  Contact <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332054"
                    id="text-1542372332054"
                    required="required"
                    value={this.state.contact}
                    placeholder="Contact"
                    onChange={(e) =>
                      this.setState({ contact: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <hr></hr>
                <br />

                <div className="mt-4">
                  <button
                    type="submit"
                    class="create-btn create-btn-disabled"

                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormAndPreview;
