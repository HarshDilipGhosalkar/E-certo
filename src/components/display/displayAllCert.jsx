import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./assets/explore.css";
import Loading from "../Loading/Loading";

class DisplayCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // allCert: [],
    };
  }

  // componentDidMount = async () => {
  //  await this.yeppy();
  // };
  // yeppy (){
  //   this.setState({allCert : this.props.allCert});
  // };

  
render() {
    
 console.log("all cert0",this.props.cert1);
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
                          
                          <div
                            key={cert.certid.toNumber()}
                            class="col-4 col-lg-4 col-md-6 col-sm-1 align-items-center nft_card"
                          >
                            {/* <Link
                              to={"/assets/details/" + NFT.tokenId.toNumber()}
                            > */}
                            
                              <div className="details-div">
                                
                                <div class="row nft-details">
                                  <div class="col nft-name-explore">
                                    <p>hello</p>
                                    <p class="n">
                                    
                                      {cert.metaData.name}
                                      
                                    </p>
                                    <p class="nft-owner-name-explore">
                                      <p>jach</p>
                                      {cert.metaData.course}
                                    </p>
                                  </div>
                                 
                                </div>
                                <div class="row buy-details"></div>
                              </div>
                            {/* </Link> */}
                          </div>
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

export default DisplayCert;
