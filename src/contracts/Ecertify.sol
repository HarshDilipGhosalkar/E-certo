// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// NFT smart contract inherits ERC721 interface
contract Ecertify {
    // total number of NFT minted
    uint256 public certificateCounter;

    struct Certificate {
        uint256 certid;
        string transactionHash;
        string name;
        string course;
        string email;
        uint256 passoutYear;
        uint256 percentage;
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

    function addCertificate(
        string memory _name,
        string memory _course,
        string memory _email,
        uint256 _passoutYear,
        uint256 _percentage,
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
    }

    function updateTransaction(string memory _transactionHash) external {
        Certificate memory cert = allCertificates[certificateCounter];
        cert.transactionHash = _transactionHash;
        allCertificates[certificateCounter] = cert;
        // add the hash value and it's certificate to allCertificate mapping
        allhashedCertificates[_transactionHash] = cert;
    }

    function getValueAtMapping(string memory userAddress)
        public
        view
        returns (Certificate memory)
    {
        return allhashedCertificates[userAddress];
    }
}
