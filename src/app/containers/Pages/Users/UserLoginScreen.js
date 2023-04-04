import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useHistory } from "react-router-dom";
import windowSize from "react-window-size";
import Web3 from "web3";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import loginBanner from "../../../assets/img/Login.png";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/Footer";
import Header from "../../../components/Headers/Header";
import NetworkErrorModal from "../../../components/Modals/NetworkErrorModal";

function UserLoginScreen(props) {
  let history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [msg, setMsg] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let Login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let loginData = {
      email: email.toLowerCase(),
      password: password,
    };
    axios.post("/v1-sso/user/auth/login", loginData).then(
      (response) => {
        console.log("response", response);
        Cookies.set("Version", "v1-sso", {});
        sessionStorage.setItem("Authorization", response.data.token, {});
        setIsLoading(false);
        history.push("/");
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            setMsg(error.response.data.message);
          } else {
            setMsg("Unknown Error Occured, try again.");
          }
        } else {
          setMsg("Unknown Error Occured, try again.");
        }
        setIsLoading(false);
      }
    );
  };
  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="home-section home-full-height">
          <Header />
          <div
            className="content"
            style={{ paddingTop: "180px", height: "100vh" }}
            position="absolute"
          >
            <div className="container-fluid">
              <div
                className="row"
                style={{ height: `${props.windowHeight}`, marginRight: "px" }}
              >
                <div className="col-md-8 offset-md-2">
                  <div className="account-content">
                    <div className="row align-items-center justify-content-center">
                      <div
                        className="col-md-8 col-lg-7 login-left"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={loginBanner}
                          className="img-fluid"
                          alt="Doccure Login"
                          style={{ height: "400px", paddingTop: "20px" }}
                        />
                      </div>
                      <div className="col-md-11 col-lg-5 login-right">
                        <div className="login-header">
                          <h3 style={{ textAlign: "center" }}>Sign In</h3>
                        </div>
                        <form onSubmit={(e) => Login(e)}>
                          <div className="form-group form-focus focused">
                            <input
                              type="email"
                              required
                              className="form-control floating"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                            <label className="focus-label">Emaill</label>
                          </div>
                          <div className="form-group form-focus focused">
                            <input
                              type="password"
                              required
                              className="form-control floating"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="focus-label">Password</label>
                          </div>
                          <div className="text-center">
                            <p style={{ color: "red" }}>{msg}</p>
                          </div>
                          <div className="text-right">
                            <Link
                              to="/forgotPassword"
                              className="forgot-link"
                              style={{ color: "#000" }}
                            >
                              Forgot Password ?
                            </Link>
                          </div>

                          {isLoading ? (
                            <div className="text-center">
                              <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#ff0000" }}
                              >
                                <span className="sr-only">Loading...</span>
                              </Spinner>
                            </div>
                          ) : (
                            <button
                              className="btn btn-block btn-lg login-btn"
                              type="submit"
                            >
                              Sign In
                            </button>
                          )}
                          <div className="text-center dont-have">
                            Don’t have an account?{" "}
                            <Link to="/register">Register</Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer position={""} />
      </div>
    
    </div>
  );
}

export default windowSize(UserLoginScreen);
