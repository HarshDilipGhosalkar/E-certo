import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./bootstrap/css/bootstrap.css";
import "./App.css";
import Web3 from "web3";
import Ecertify from "../abis/Ecertify.json";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import NoPage from "./NoPage/NoPage";
import Home from "./Home/Home";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import Navbar from "./Navbar/Navbar";
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import DisplayAllCert from "./display/displayAllCert";
import StudentDetail from "./StudentDetails/StudentDetail";
import DisplayCert from "./display/displaycert";
// const nodemailer = require('nodemailer'); 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      EcertoContract: null,
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      certCount: 0,
      certs: [],
      transactionHash:""
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMetaData();
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });

      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = Ecertify.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const EcertoContract = web3.eth.Contract(
          Ecertify.abi,
          networkData.address
        );
        this.setState({ EcertoContract });
        this.setState({ contractDetected: true });

        this.setState({ loading: false });
        const certCount = await EcertoContract.methods
          .certificateCounter()
          .call();
        this.setState({ certCount });
        for (var i = 1; i <= certCount; i++) {
          const certificate = await EcertoContract.methods
            .allCertificates(i)
            .call();
          this.setState({
            certs: [...this.state.certs, certificate],
          });
        }
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  setMetaData = async () => {
    if (this.state.certs.length !== 0) {
      this.state.certs.map(async (cert) => {
        const result = await fetch(cert.certURI);
        const metaData = await result.json();
        this.setState({
          certs: this.state.certs.map((certificate) =>
            certificate.certid.toNumber() === Number(metaData.certId)
              ? {
                  ...certificate,
                  metaData,
                }
              : certificate
          ),
        });
      });
    }
  };

  // getCertByHash = async (hash) => {
  //   const cert = await this.state.EcertoContract.methods.getValueAtMapping(hash).call();

  //   return cert;
  // };

  createCertificate = async (name, course,email,collegeName,passout_year,percentage,SAPId,rollNo,contact) => {
    this.setState({ loading: true });

    console.log("hi");
    this.state.EcertoContract.methods
      .addCertificate(name, course, email, collegeName, passout_year, percentage, SAPId, rollNo, contact)
      .send({ from: this.state.accountAddress })
      .on("transactionHash", (hash) => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());

        this.state.EcertoContract.methods
          .updateTransaction(hash)
          .send({ from: this.state.accountAddress })
          .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());

          });
        this.setState({ loading: false });
        // window.location.reload();
        this.setState({transactionHash:hash});
        // console.log(hash)
      });
      console.log("transactionHash",this.state.transactionHash);
  };

  render() {
    return (
      <>
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navbar />}>
                  <Route index element={<Home />} />
                  <Route
                    path="create"
                    element={
                      <FormAndPreview
                        createCertificate={this.createCertificate}
                      />
                    }
                  />
                  <Route
                    path="all"
                    element={<DisplayAllCert allCert={this.state.certs} />}
                  />
                  <Route
                    path="details/:hash"
                    element={
                      <StudentDetail
                      AllCert={this.state.certs}
                      />
                    }
                  />
                  <Route
                    path="certificate/:hash"
                    element={
                      <DisplayCert
                      AllCert={this.state.certs}  
                      // getCertByHash={this.getCertByHash}                   
                       />
                    }
                  />
                  <Route path="*" element={<NoPage />} />
                </Route>
                
               
              </Routes>
            </BrowserRouter>
          </>
        )}
      </>
    );
  }
}

export default App;
