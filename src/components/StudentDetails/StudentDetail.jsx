import React from "react";
import { useParams } from "react-router-dom";
import "./assets/styles.css";
import logo from "./assets/sbmp-logo.png";
import gif from "./assets/verified.gif";


const StudentDetail = ({ AllCert }) => {
  const { hash } = useParams();
  let certificateDetail;
  AllCert.forEach((cert) => {
    if (cert.transactionHash == hash) {
      certificateDetail = cert;
    }
  });
  console.log(certificateDetail);
  return (
    <>
      {certificateDetail !== undefined ? (
        <>
          {/* <div>
            <h1>Name : {certificateDetail.name}</h1>
            <h1>Deparment : {certificateDetail.course}</h1>
            <h1>Phone : {certificateDetail.contact.toNumber()}</h1>
          </div>
          <br /> */}
          <div className="details_page">
            <div className="details_component">
              <div className="details_grid">
                <div className="details_div">
                  <div className="detail_heading">
                    <div className="container">
                      <div className="row">
                        <div className="col-2">
                          <img className="sbmp_logo" src={logo} alt="" />
                        </div>
                        <div className="col">
                          <h2>Shri Bhagubhai Mafatlal Poltechnic</h2>
                        </div>
                      </div>
                      <hr className="detail_hr" />
                      <div className="verified_gif">
                        <img src={gif} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default StudentDetail;
