import React from "react";  
import { useParams } from "react-router-dom";

const StudentDetail = ({
  AllCert
}) => {
  const { id } = useParams();
  const certId = parseInt(id, 10) - 1;
  const linkCertId =parseInt(id, 10);
  const cert = AllCert[certId];

  return (
    <>
         {cert !== undefined && cert.metaData !== undefined? (
      <>
     
      <div>
      <h1>Name : {cert.metaData.name}</h1>
      <h1>Deparment : {cert.metaData.course}</h1>
      <h1>Phone : {cert.metaData.contact}</h1>
     
      </div>
      <br />

       
      </>
        ) : null}
    </>
  );
};

export default StudentDetail;
