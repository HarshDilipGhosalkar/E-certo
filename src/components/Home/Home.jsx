import React from "react";
import { Link } from "react-router-dom";
import "./assets/style.css";
import banner from "./assets/image/banner.png";
import create from "./assets/image/create.png";
import issue from "./assets/image/issue.png";
import manage from "./assets/image/manage.png";
import share from "./assets/image/share.png";
import verify from "./assets/image/verify.png";

const Home = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="hero">
            <div className="row">
              <div className="col-5 column text-area">
                <h1 className="main-heading">
                  Professional Certificate Maker - create and send certificates
                </h1>
                <p className="sub-heading">
                  Our digital credentials infrastructure has everything you need
                  to generate certificates. A certificate builder, templates,
                  emails, security, and analytics.
                </p>
                <button className="start-btn">Get Started</button>
              </div>
              <div className="col-7">
                <span className="banner-image-area">
                  <img className="banner-image" src={banner} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
