import React from "react";
// import NFTDetails from "./NFT-Details";
import { useParams } from "react-router-dom";

const DisplayCert = ({
  AllCert
}) => {
  const { id } = useParams();
  let certId = parseInt(id, 10) - 1;
  let cert = AllCert[certId];
  
  return (
    <>
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
    </>
  );
};

export default DisplayCert;
