import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
// AXIOS
import axios from "axios";
import IntlTelInput from "react-intl-tel-input";
import GoogleButton from "react-google-button";
import { useSnackbar } from "notistack";
// MUI COMPONENTS
import { Divider, Typography } from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import InfoIcon from "@material-ui/icons/Info";
// CONTEXT
import { UserAuth } from "../../../components/context/AuthContext";
// GOOGLE
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

import "react-intl-tel-input/dist/main.css";
import { async } from "@firebase/util";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import WorkInProgressModal from "../../../components/Modals/WorkInProgressModal";

const useStyles = makeStyles((theme) => ({
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
}));

const customTheme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        margin: "0 !important",
        backgroundColor: "transparent !important",
        border: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
    MuiSvgIcon: {
      root: {
        "&:hover": {
          color: "red",
        },
      },
    },
  },
});

// COMPONENT FUNCTION
const AdminLoginSignupForms = () => {
  // States
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phoneNum, setPhoneNum] = useState();
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [tokenVerification, setTokenVerification] = useState(true);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // Variables
  const { REACT_APP_CLIENT_ID } = process.env;
  const clientID = `${REACT_APP_CLIENT_ID}`;
  let history = useHistory();

  // Methods
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Handlers
  const handleSuccess = (credentialResponse) =>
    setAccount(credentialResponse.credential);

  const handleSetActive = () => {
    setIsActive(!isActive);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleGoBack = () => {
    history.push(`/`);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (account !== null) {
      axios
        .post("/v1-sso/user/auth/admin-login", { idToken: account })
        .then((response) => {
          console.log("JWT submitted: ", response);
          if (response.status === 200) {
            Cookies.set("Version", "v1-sso", {});
            setAdminSignInData(response.data);
            console.log("1");
            response.data.isInfoAdded === true &&
              Cookies.set("InfoAdded", response.data.isInfoAdded, {});
            console.log("2");
            response.data.isVerified === true &&
              Cookies.set("Verified", response.data.isVerified, {});
            console.log("3");
            response.data.raindropToken &&
              sessionStorage.setItem(
                "Authorization",
                response.data.raindropToken,
                {}
              );
            if (
              response.data.isInfoAdded === true &&
              response.data.isVerified === true
            ) {
              window.location.reload(false);
            }
          }
        })
        .catch((error) => {
          // case 4
          console.log("JWT could not be submitted,", error);
          if (error) setTokenVerification(false);
        });
    }
    return () => {
      controller.abort();
    };
  }, [account]);

  useEffect(() => {
    // Case 2
    if (adminSignInData !== null) {
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
        let variant = "info";
        enqueueSnackbar(
          "Your request is under process. Waiting for approval by the Super Admin",
          { variant }
        );
      }
    }
  }, [adminSignInData]);

  adminSignInData &&
    console.log("jwt after submission: //// ", adminSignInData);

  // Content
  return (
    <>
      <div className="row no-gutters w-100">
        <div className="adminCredWrapper">
          {/* Sign in */}
          <div
            className={
              isActive
                ? "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn formActive"
                : "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn"
            }
          >
            <div className="adminLoginContainer">
              <div
              // style={{ height: "100%" }}
              >
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
                          // value={name}
                          placeholder="Email"
                          className="form-control-login -login newNftInput"
                          onChange={(e) => {
                            // setName(e.target.value);
                          }}
                        />
                      </div>
                      <label>Password</label>
                      <div className="form-group newNftWrapper">
                        <input
                          type="password"
                          required
                          // value={name}
                          placeholder="Password"
                          className="form-control-login  newNftInput"
                          onChange={(e) => {
                            // setName(e.target.value);
                          }}
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
                      <Typography
                        variant="body2"
                        className={classes.signInOptionLabel}
                      >
                        OR
                      </Typography>
                    </div>
                    <ThemeProvider theme={customTheme}>
                      <GoogleOAuthProvider clientId={clientID}>
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                          width="258px"
                        />
                      </GoogleOAuthProvider>
                      {adminSignInData !== null &&
                        adminSignInData.isInfoAdded === false && (
                          <Redirect to="/admin-signup-details" />
                        )}
                      {/* {adminSignInData !== null &&
                        adminSignInData.isVerified === true && (
                          <Redirect to="/dashboard" />
                        )} */}
                    </ThemeProvider>
                    <div className="signUp-link">
                      <p>
                        Don’t have an account?{" "}
                        <button
                          className="signUpBtn-link"
                          // onClick={handleSetActive}
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
                          className={classes.errorVerification}
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
          {/* Sign up */}
          <div
            // className="row no-gutters w-100"
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
                            // value={name}
                            placeholder="Full Name"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                        <label>Email</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="email"
                            required
                            // value={name}
                            placeholder="Email"
                            className="form-control-login -login newNftInput"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                        <label>Password</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="password"
                            required
                            // value={name}
                            placeholder="Password"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
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
                            // value={name}
                            placeholder="Username"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
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
                            // value={name}
                            placeholder="Wallet Address"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
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
        {/* <Alert severity="error">This is an error message!</Alert> */}
      </div>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
    </>
  );
};

export default AdminLoginSignupForms;
