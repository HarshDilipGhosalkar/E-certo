// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;


// NFT smart contract inherits ERC721 interface
contract Ecertify{

 // total number of NFT minted
  uint256 public certificateCounter;

struct Certificate {
    uint256 certid;
    string certURI;
  }
  
// map Certificates's id to Certificate
mapping(uint256 => Certificate) public allCertificates;  

function addCertificate(string memory certURI)external {
  certificateCounter ++;
  // require(!_exists(certificateCounter));

  // create a new Certificate (struct) and pass in new values
    Certificate memory newCert = Certificate(
      certificateCounter,
      certURI
    );
   // add the id and it's certificate to allCertificate mapping
    allCertificates[certificateCounter] = newCert;
}
}
