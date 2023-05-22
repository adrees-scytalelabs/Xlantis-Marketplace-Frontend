import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import failure from "../../../assets/img/failure.png";
import success from "../../../assets/img/success.png";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { getUserEmailVerification } from "../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../components/Backdrop/Backdrop";
import Header from "../../../components/Headers/NewHeader";

function EmailVerification(props) {
  const { email, token } = useParams();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  let handleEmailVerification = () => {
    setIsSuccess("");
    setIsConfirming(true);
    getUserEmailVerification(email, token)
      .then((response) => {
        setIsSuccess(true);
        setIsConfirming(false);
      })
      .catch((error) => {
        setIsConfirming(false);
        setIsSuccess(false);
        console.log(error);
      });
  };

  useEffect(() => {
    handleEmailVerification();
  }, []);
  return (
    <div className="main-wrapper">
      <div
        style={{ paddingTop: "10px" }}
        className="home-section home-full-height"
      >
        <Header setlocal={props.setlocal} selectedNav={"home"} />
        {isConfirming ? (
          <>
            <CircularBackdrop open={isConfirming} />
          </>
        ) : null}
        {isSuccess === true ? (
          <div className="container" style={{ marginTop: "10%" }}>
            <div className="row">
              <div className="col-12 text-center booking-success">
                <p>Your Email Verification is successfull</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <img src={success} alt="success" />
              </div>
            </div>
          </div>
        ) : null}
        {isSuccess === false ? (
          <div className="container" style={{ marginTop: "10%" }}>
            <div className="row">
              <div className="col-12 text-center booking-failure">
                <p>Invalid Email Verification URL</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center email-verification-failure">
                <img src={failure} alt="falure" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EmailVerification;
