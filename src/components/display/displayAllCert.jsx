import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./assets/explore.css";
import Loading from "../Loading/Loading";

class DisplayAllCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <>
        <div class="outer-container">
          <div className="main-explore-container">
            <div className="row nft-card-row">
              <div className="container">
                <div class="row nft-container">
                  {this.props.allCert.length !== 0 ? (
                    <>
                      {this.props.allCert.map((cert) => {
                        return (
                          <>
                                <div
                                  key={cert.certid.toNumber()}
                                  class="col-4 col-lg-4 col-md-6 col-sm-1 align-items-center nft_card"
                                >
                                  <Link
                              to={"../certificate/" + cert.transactionHash}
                            >

                                  <div className="details-div">
                                    <div class="row nft-details">
                                      <div class="col nft-name-explore">
                                        <p>Name: {cert.name}</p>
                                        <p>Course: {cert.course}</p>
                                      </div>
                                    </div>
                                  </div>
                                  </Link>
                                </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayAllCert;
