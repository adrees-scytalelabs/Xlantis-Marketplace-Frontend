import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useNavigate } from "react-router-dom";
import { userLoginThroughSSO } from "../API/AxiosInterceptor";
import WorkInProgressModal from "../Modals/WorkInProgressModal";
const styles = {
  signInOptionLabel: {
    margin: "16px auto",
    color: "#ccc",
  },
  errorVerification: {
    padding: "8px",
    width: "258px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#ff0000",
    marginBottom: "5px",
    fontFamily: "inter",
    transition: "all 3s ease-in-out",
  },
};

const AdminLoginSignupForms = () => {
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [, setPhoneNum] = useState();
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [tokenVerification, setTokenVerification] = useState(true);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);

  const { REACT_APP_CLIENT_ID } = process.env;
  const clientID = `${REACT_APP_CLIENT_ID}`;
  let navigate = useNavigate();

  const handleSuccess = (credentialResponse) =>
    setAccount(credentialResponse.credential);

  const handleSetActive = () => {
    setIsActive(!isActive);
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (account !== null) {
      userLoginThroughSSO({ idToken: account})
        .then((response) => {
          console.log("checker response", response);
          console.log("JWT submitted: ", response.data);
          if (response.status === 200) {
            Cookies.set("Version", "v1-sso", {});
            response.data.raindropToken &&
              sessionStorage.setItem(
                "Authorization",
                response.data.raindropToken,
                {}
              );
            setAdminSignInData(response.data);
          }
        })
        .catch((error) => {
          console.log("JWT could not be submitted,", error);
          if (error) setTokenVerification(false);
        });
    }
    return () => {
      controller.abort();
    };
  }, [account]);

  useEffect(() => {
    const controller = new AbortController();

    if (adminSignInData !== null) {
      let decode = jwtDecode(adminSignInData.raindropToken);
      sessionStorage.setItem("userId", decode.userId);
      navigate(0);
    }

    return () => {
      controller.abort();
    };
  }, [adminSignInData]);

  useEffect(() => {
    if (
      sessionStorage.getItem("Authorization") &&
      sessionStorage.getItem("userId")
    ) {
      navigate(`/`);
    }
  }, []);

  adminSignInData &&
    console.log(
      "user token before refresh /// ",
      sessionStorage.getItem("Authorization", adminSignInData.raindropToken, {})
    );

  return (
    <>
      <div className="row no-gutters w-100">
        <div className="adminCredWrapper">
          <div
            className={
              isActive
                ? "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn formActive"
                : "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn"
            }
          >
            <div className="adminLoginContainer">
              <div>
                <form action="" autoComplete="off">
                  <div className="adminInputFormGroup">
                    <div className="col-12 text-right mb-1 px-0">
                      <span
                        onClick={handleGoBack}
                        style={{ cursor: "pointer" }}
                      >
                        <CloseIcon />
                      </span>
                    </div>
                    <h2>Sign In</h2>
                    <div className="form-group">
                      <label>Email</label>
                      <div className="form-group newNftWrapper">
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          className="form-control-login -login newNftInput"
                          onChange={(e) => {}}
                        />
                      </div>
                      <label>Password</label>
                      <div className="form-group newNftWrapper">
                        <input
                          type="password"
                          required
                          placeholder="Password"
                          className="form-control-login  newNftInput"
                          onChange={(e) => {}}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        setWorkProgressModalShow(true);
                      }}
                    >
                      Sign In
                    </button>
                    <div className="text-center">
                      <Typography variant="body2" sx={styles.signInOptionLabel}>
                        OR
                      </Typography>
                    </div>
                    <GoogleOAuthProvider clientId={clientID}>
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                        width="258px"
                      />
                    </GoogleOAuthProvider>
                    <div className="signUp-link">
                      <p>
                        Don’t have an account?{" "}
                        <button
                          className="signUpBtn-link"
                          onClick={() => {
                            setWorkProgressModalShow(true);
                          }}
                          type="button"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                    {tokenVerification === false && (
                      <div className="text-center">
                        <Typography
                          variant="body2"
                          sx={styles.errorVerification}
                        >
                          <InfoIcon /> ID Token Verification Failed!
                        </Typography>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className={
              isActive
                ? "row no-gutters justify-content-center align-items-center adminCredWrapper userSignUp w-100"
                : "row no-gutters justify-content-center align-items-center adminCredWrapper userSignUp formActive w-100"
            }
          >
            <div className="adminSignupContainer">
              <form action="" autoComplete="off">
                <div className="adminInputFormGroup">
                  <h2>Sign Up</h2>
                  <div className="row no-gutters justify-content-center align-items-center w-100">
                    <div className="col-auto mr-2">
                      <div className="form-group">
                        <label>Full Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {}}
                          />
                        </div>
                        <label>Email</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            className="form-control-login -login newNftInput"
                            onChange={(e) => {}}
                          />
                        </div>
                        <label>Password</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="password"
                            required
                            placeholder="Password"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-auto ml-2">
                      <div className="form-group">
                        <label>Username</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            placeholder="Username"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {}}
                          />
                        </div>
                        <label>Phone Number</label>
                        <div className="form-group newNftWrapper userPhone">
                          <IntlTelInput
                            preferredCountries={["pk"]}
                            onPhoneNumberChange={(e) => setPhoneNum(e)}
                            className="adminSignupPhnum"
                          />
                        </div>
                        <label>Wallet Address</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            placeholder="Wallet Address"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Sign Up</button>
                  </div>
                  <div className="signUp-link">
                    <p>
                      Already have an account?{" "}
                      <button
                        className="signUpBtn-link"
                        onClick={handleSetActive}
                        type="button"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
    </>
  );
};

export default AdminLoginSignupForms;
