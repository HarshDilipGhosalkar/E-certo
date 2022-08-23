import React from "react";
import { useState } from "react";
import "./styles.css";

function Query({ sendEmail, certficateExist, AllCert }) {
  const [certificateHash, setCertificateHash] = useState("");
  const [sapId, setSapId] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [message, setMessage] = useState("");

  const getCertificate = async () => {
    const cert = await certficateExist(certificateHash);
    const alertbox = document.querySelector(".alertbox");

    if (cert) {
      setCertificateUrl("http://localhost:3000/certificate/" + certificateHash);
      alertbox.classList.add("alertbox_display");
    } else {
      console.log("Not Found");
      alertbox.classList.remove("alertbox_display");
      setCertificateUrl("");
    }
  };

  const getCertificateSap = async () => {
    let certificateDetail = "";
    AllCert.forEach((cert) => {
      if (cert.SAP == sapId) {
        document.querySelector(".alertbox_sap").style.display = "none";
        certificateDetail = cert;
        console.log(cert);
        const email = cert.email;
        sendEmail(cert.name, email, cert.transactionHash)
        console.log(email.substr(email.indexOf('@'), email.length));
        setMessage(email.substr(0,3) + '***' + email.substr(email.indexOf('@'), email.length));
        document.querySelector(".message").style.display = "block";

      }
    });
    if (certificateDetail === "") {
      document.querySelector(".alertbox_sap").style.display = "block";
      document.querySelector(".message").style.display = "none";
    }
  };

  const getCertificateBySap = () => {
    document.querySelector(".getcertificate_hash").style.display = "none";
    document.querySelector(".getcertificate_sap").style.display = "block";
  };

  const getCertificateByHash = () => {
    document.querySelector(".getcertificate_hash").style.display = "block";
    document.querySelector(".getcertificate_sap").style.display = "none";
  };

  return (
    <>
      <div className="details_page">
        <div className="details_component">
          <div className="details_grid">
            <div className="details_div">
              <div className="detail_heading">
                <div className="container">
                  <div className="row">
                    <div className="col query_heading">
                      <h2>Lost Your Certificate?</h2>
                      <h6>Don't worry provide follow details. </h6>
                    </div>
                  </div>
                  <hr className="detail_hr" />
                  <div className="getcertificate_hash">
                    <div className="row">
                      <div className="form-group">
                        <label for="text-1542372332072" class="head">
                          Get Certificate
                        </label>
                        <div class="input-group get-input">
                          <input
                            class="form-control"
                            type="text"
                            name="text-1542372332012"
                            id="text-1542372332012"
                            value={certificateHash}
                            placeholder="Enter Certificate Hash"
                            onChange={(e) => setCertificateHash(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <button
                        type="submit"
                        onClick={getCertificate}
                        class="create-btn query-btn"
                      >
                        Get Certificate
                      </button>
                      <div className="alertbox alertbox_display alert alert-danger alert-dissmissible mt-4">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                        >
                          <span>&times;</span>
                        </button>
                        <strong>&nbsp; Non-Existent Certificate Id</strong>
                      </div>
                      <p className="mt-4">
                        <a
                          class="retieved-data"
                          href={""}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {certificateUrl}
                        </a>
                      </p>
                    </div>
                    <button onClick={getCertificateBySap}>
                      Don't Have Certificate Id?
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Query;
