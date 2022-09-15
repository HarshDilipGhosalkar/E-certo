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
import DisplayAllCert from "./display/displayAllCert";
import StudentDetail from "./StudentDetails/StudentDetail";
import DisplayCert from "./display/displaycert";
import UploadExcelPage from "./uploadExcel/uploadExcel";
import RecipientsList from "./RecipientsList/RecipientsList";
import Query from "./Query/Query";
import emailjs from "emailjs-com";

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
      transactionHash: "",
      excelFile: null,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
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

  getCuurentDate = async () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var currentTime = new Date();
    // returns the month (from 0 to 11)
    var month = months[currentTime.getMonth()];

    // returns the day of the month (from 1 to 31)
    var day = currentTime.getDate();

    // returns the year (four digits)
    var year = currentTime.getFullYear();
    const issueDate = month + " " + day + " " + year;
    return issueDate;
  };

  createCertificate = async (
    name,
    course,
    email,
    passout_year,
    percentage,
    SAPId,
    contact
  ) => {
    const issueDate = await this.getCuurentDate();
    this.setState({ loading: true });
    this.state.EcertoContract.methods
      .addCertificate(
        name,
        course,
        email,
        passout_year,
        percentage,
        SAPId,
        contact,
        issueDate
      )
      .send({ from: this.state.accountAddress })
      .on("transactionHash", (hash) => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());

        this.state.EcertoContract.methods
          .updateTransaction(hash)
          .send({ from: this.state.accountAddress })
          .on("confirmation", () => {
            localStorage.setItem(
              this.state.accountAddress,
              new Date().getTime()
            );
            this.setState({ loading: false });
            window.location.reload();
          });
        // window.location.reload();
        this.setState({ transactionHash: hash });
        // console.log(hash)
      });
    console.log("transactionHash", this.state.transactionHash);
  };

  createBulkCertificate = async (struct) => {
    this.setState({ loading: true });
    const issueDate = await this.getCuurentDate();
    var dataStruc = [];
    struct.map((details) => {
      dataStruc.push({
        certid: 0,
        transactionHash: "0x00",
        name: details.name,
        course: details.course,
        email: details.email,
        passoutYear: details.passoutYear,
        percentage: details.percentage,
        SAP: details.SAP,
        contact: details.contact,
        issueDate: issueDate,
      });
    });

    this.state.EcertoContract.methods
      .addInBulk(dataStruc)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  certficateExist = async (hash) => {
    const exi = await this.state.EcertoContract.methods
      .certficateHashExist(hash)
      .call();

    return exi;
  };

  handleActiveLink = (id) => {
    if (
      this.state.accountAddress ==
        "0x41e5226215F536572DDa181e797Deb1878D94e3D" ||
      this.state.accountAddress == "0xB641B4F1795a4BfA2cC7056E08cFB2b199831248"
    ) {
      document.querySelector("#all").classList.remove("nav-active");
      document.querySelector("#create").classList.remove("nav-active");
      document.querySelector("#upload").classList.remove("nav-active");
    }

    document.querySelector("#query").classList.remove("nav-active");

    if (id.length > 0) {
      const link = document.querySelector(id);
      link.classList.add("nav-active");
    }
  };

  sendEmail = async (name, email, hash) => {
    var sendparams = {
      to_name: name,
      reply_to: email,
      message:
        "Fllow Link for certificate : http://localhost:3000/certificate/" +
        hash,
    };
    emailjs
      .send(
        "service_346hywf",
        "template_rfcp5s2",
        sendparams,
        "lXbz1zzxsBOs8HcSZ"
      )
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
          window.location.reload();
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
  };

  displayRecipientsList = async (excelFile) => {
    this.setState({ excelFile: excelFile });
  };

  render() {
    return (
      <>
        {!this.state.metamaskConnected ? (
          <Home connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navbar accountAddress={this.state.accountAddress} />
                  }
                >
                  <Route
                    index
                    element={
                      <Home
                        handleActiveLink={this.handleActiveLink}
                        connectToMetamask={this.connectToMetamask}
                        isMetamaskConnected={this.state.metamaskConnected}
                      />
                    }
                  />

                  {this.state.accountAddress ==
                    "0x41e5226215F536572DDa181e797Deb1878D94e3D" ||
                  this.state.accountAddress ==
                    "0xB641B4F1795a4BfA2cC7056E08cFB2b199831248" ? (
                    <>
                      <Route
                        path="/dashboard"
                        element={
                          <DisplayAllCert
                            allCert={this.state.certs}
                            sendEmail={this.sendEmail}
                            handleActiveLink={this.handleActiveLink}
                          />
                        }
                      />
                      <Route
                        path="/upload-spreadsheet"
                        element={
                          <UploadExcelPage
                            displayRecipientsList={this.displayRecipientsList}
                            handleActiveLink={this.handleActiveLink}
                          />
                        }
                      />
                      <Route
                        path="certificates/recipients"
                        element={
                          <RecipientsList
                            excelFile={this.state.excelFile}
                            createBulkCertificate={this.createBulkCertificate}
                            handleActiveLink={this.handleActiveLink}
                          />
                        }
                      />
                    </>
                  ) : null}

                  <Route
                    path="details/:hash"
                    element={
                      <StudentDetail
                        AllCert={this.state.certs}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="certificate/:hash"
                    element={
                      <DisplayCert
                        AllCert={this.state.certs}
                        sendEmail={this.sendEmail}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="findmycertificate"
                    element={
                      <Query
                        sendEmail={this.sendEmail}
                        certficateExist={this.certficateExist}
                        AllCert={this.state.certs}
                        handleActiveLink={this.handleActiveLink}
                      />
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <NoPage handleActiveLink={this.handleActiveLink} />
                    }
                  />
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
