import React from "react";
import { useParams } from "react-router-dom";

const DisplayCert = ({ AllCert }) => {
  const { id } = useParams();
  const certId = parseInt(id, 10) - 1;
  const cert = AllCert[certId];
  return (
    <>
      {cert !== undefined && cert.metaData !== undefined ? (
        <>
          <h1>{cert.certid.toNumber()}</h1>
          <h1>{cert.metaData.name}</h1>
          <h1>{cert.metaData.course}</h1>
        </>
      ) : null}
    </>
  );
};

export default DisplayCert;
