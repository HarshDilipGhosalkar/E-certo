// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 < 0.8.17;
pragma abicoder v2;

// NFT smart contract inherits ERC721 interface
contract Ecertify {
    // total number of NFT minted
    uint256 public certificateCounter;
    string convertedHash;

    struct Certificate {
        uint256 certid;
        string transactionHash;
        string name;
        string course;
        string email;
        uint256 passoutYear;
        string percentage;
        uint256 SAP;
        uint256 contact;
        string issueDate;
        string gender;
        string highestDegree;
    }

    // map Certificates's id to Certificate
    mapping(uint256 => Certificate) public allCertificates;


    // map Certificates's hash to Certificate
    mapping(string => Certificate) public allhashedCertificates;

    mapping(string => bool) public certficateHashExist;

    mapping(uint256 => bool) public sapIdExist;

    function addCertificate(
        string memory _name,
        string memory _course,
        string memory _email,
        uint256 _passoutYear,
        string memory _percentage,
        uint256 _SAP,
        uint256 _phone,
        string memory _issueDate,
        string memory _gender,
        string memory _highestDegree
    ) external {
        certificateCounter++;
        // require(!_exists(certificateCounter));

        // create a new Certificate (struct) and pass in new values
        Certificate memory newCert = Certificate(
            certificateCounter,
            "0x0",
            _name,
            _course,
            _email,
            _passoutYear,
            _percentage,
            _SAP,
            _phone,
            _issueDate,
            _gender,
            _highestDegree
        );
        // add the id and it's certificate to allCertificate mapping
        allCertificates[certificateCounter] = newCert;

        sapIdExist[_SAP] = true;
    }

    function updateTransaction(string memory _transactionHash) external {
        Certificate memory cert = allCertificates[certificateCounter];
        cert.transactionHash = _transactionHash;
        allCertificates[certificateCounter] = cert;
        // add the hash value and it's certificate to allCertificate mapping
        allhashedCertificates[_transactionHash] = cert;
        certficateHashExist[_transactionHash] = true;
    }

    function getValueAtMapping(string memory userAddress)
        public
        view
        returns (Certificate memory)
    {
        return allhashedCertificates[userAddress];
    }
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
    uint8 i = 0;
    bytes memory bytesArray = new bytes(64);
    for (i = 0; i < bytesArray.length; i++) {

        uint8 _f = uint8(_bytes32[i/2] & 0x0f);
        uint8 _l = uint8(_bytes32[i/2] >> 4);

        bytesArray[i] = toByte(_f);
        i = i + 1;
        bytesArray[i] = toByte(_l);
    }
    return string(bytesArray);
}
function toByte(uint8 _uint8) public pure returns (byte) {
    if(_uint8 < 10) {
        return byte(_uint8 + 48);
    } else {
        return byte(_uint8 + 87);
    }
}
function hash(string memory _string) public pure returns(bytes32) {
     return keccak256(abi.encodePacked(_string));
}
    function addInBulk(Certificate[] memory b) external{
         
         for (uint256 index = 0; index <  b.length; index++) {
          certificateCounter++;
        // require(!_exists(certificateCounter));
        bytes32 unique = hash(b[index].name);
        convertedHash = bytes32ToString(unique);
        // create a new Certificate (struct) and pass in new values
        Certificate memory newCert = Certificate(
            certificateCounter,
            convertedHash,
            b[index].name,
            b[index].course,
            b[index].email,
            b[index].passoutYear,
            b[index].percentage,
            b[index].SAP,
            b[index].contact,
            b[index].issueDate,
            b[index].gender,
            b[index].highestDegree
        );
        // add the id and it's certificate to allCertificate mapping
        allCertificates[certificateCounter] = newCert;
        certficateHashExist[convertedHash] = true;  
         }
        //  allCertificatesInBulk[certificateCounter2] = b;
    }

}
