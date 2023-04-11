import React from "react";
import windowSize from "react-window-size";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import PrivacyPolicyCard from "../../../components/Cards/PrivacyPolicyCard";
import Footer from "../../../components/Footers/Footer";
import Header from "../../../components/Headers/Header";
import Typography from '../../../components/Typography/TypographyText';

function PrivacyPolicy(props) {

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="home-section home-full-height">
          <Header />
          <div
            className="content"
            style={{ paddingTop: "180px" }}
            position="absolute"
          >
            <div className="container-fluid">
              <div className="row">
                <PrivacyPolicyCard />
              </div>
            </div>
          </div>
        </div>
        <Footer position={"relative"} />
      </div>
    </div>
  );
}

export default windowSize(PrivacyPolicy);
