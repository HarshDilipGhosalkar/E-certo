import React from "react";
import { useParams } from "react-router-dom";

const DisplayCert = ({ AllCert }) => {
  const { id } = useParams();
  const certId = parseInt(id, 10) - 1;
  const cert = AllCert[certId];
  return (
    <>
<<<<<<< HEAD
    {cert.metaData !== undefined ? (
      <>
      {/* <NFTDetails
        cert={cert}
      /> */}
      <h1>{cert.certid.toNumber()}</h1>
      <h1>{cert.transactionHash}</h1>
      <h1>{cert.metaData.name}</h1>
      <h1>{cert.metaData.course}</h1>
      </>
        ) : null}
=======
      {cert !== undefined && cert.metaData !== undefined ? (
        <>
          <h1>{cert.certid.toNumber()}</h1>
          <h1>{cert.metaData.name}</h1>
          <h1>{cert.metaData.course}</h1>
        </>
      ) : null}
>>>>>>> b986188e842621bf6a018aa8a5aa01202b0cfea9
    </>
  );
};

export default DisplayCert;
