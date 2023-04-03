import React from "react";
import windowSize from "react-window-size";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/Footer";
import Header from "../../../components/Headers/Header";
import PersonalDetails from "./PersonalDetails";

function RegisterScreen(props) {
  return (
    <div className="main-wrapper">
      <div className="account-page">
        <Header />

        <div className="container-fluid" style={{ paddingTop: "150px" }}>
          <div
            className="row no-gutters justify-content-center align-items-center"
            style={{ height: "72vh" }}
          >
            <div className="col-6">
              <div className="row no-gutters w-100">
                <div className=" mx-auto">
                  <PersonalDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer
          style={{
            position: "relative",
            height: "200px",
            paddingTop: "-200px",
          }}
        />
      </div>
    </div>
  );
}

export default windowSize(RegisterScreen);
