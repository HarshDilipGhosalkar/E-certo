import React from "react";
import { useParams } from "react-router-dom";

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
          <div>
            <h1>Name : {certificateDetail.name}</h1>
            <h1>Deparment : {certificateDetail.course}</h1>
            <h1>Phone : {certificateDetail.contact.toNumber()}</h1>
          </div>
          <br />
        </>
      ) : null}
    </>
  );
};

export default StudentDetail;
