import React, { Component } from "react";
import "./style.css";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Course: "",
      
    };
  }

  // componentDidMount = async () => {
  //   await this.props.setMintBtnTimer();
  // };

  

  callCreateCertFromApp = (e) => {
    e.preventDefault();

    this.props.createCertificate(
      this.state.Name,
      this.state.Course,
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
