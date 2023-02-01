// REACT
import React, { useState } from "react";
// COMPONENTS
import IntlTelInput from "react-intl-tel-input";
import GoogleButton from "react-google-button";
// STYLESHEETS
import "react-intl-tel-input/dist/main.css";
import { Typography } from "@material-ui/core";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
// GOOGLE
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import googleLogo from "../../assets/img/google.svg";
import { useHistory } from "react-router-dom";

// CUSTOM STYLING
const useStyles = makeStyles((theme) => ({
  signInWithGoogle: {
    margin: "24px auto",
    textAlign: "center",
    fontFamily: "inter",
    color: "#aaa",
    "&::before": {},
  },
}));

// COMPONENT FUNCTION
const UserLoginSignUpForms = () => {
  // States
  const [phoneNum, setPhoneNum] = useState();
  const [isActive, setIsActive] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  // Variables
  const { REACT_APP_CLIENT_ID } = process.env;
  const clientID = `${REACT_APP_CLIENT_ID}`;

  // Hanlders

  const handleSetSignUp = () => {
    setIsActive(true);
    console.log("active set");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let variant = "error";
    enqueueSnackbar("This feature is under development", { variant });
  };

  const handleSetSignIn = () => {
    setIsActive(false);
    console.log("inactive set");
  };

  const handleGoBack = () => {
    history.push(`/`);
  };

  // Content
  return (
    <div className="userLoginWrapper">
      {/* Sign In */}
      <div
        className={
          isActive
            ? "row no-gutters justify-content-center align-items-center userFormWrapper userSignIn formActive"
            : "row no-gutters justify-content-center align-items-center userFormWrapper userSignIn"
        }
        style={{ height: "100%" }}
      >
        <form action="" autoComplete="off">
          <div className="col-12 text-right mb-1">
            <span onClick={handleGoBack} style={{ cursor: "pointer" }}>
              <CloseIcon />
            </span>
          </div>
          <h2>Sign In</h2>
          <div className="userLoginInput-group">
            <div className="form-group">
              <label>Full Name</label>
              <div className="form-group newNftWrapper">
                <input
                  type="text"
                  required
                  // value={name}
                  placeholder="Full Name"
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
          <button type="submit" onClick={handleSubmit}>
            Sign In
          </button>
          <div>
            <Typography variant="body2" className={classes.signInWithGoogle}>
              Or
            </Typography>
          </div>
          <div className="signInGoogleBtn">
            <button
              className="googleTempBtn"
              style={{
                marginTop: 0,
                borderRadius: 5,
                backgroundColor: "white",
                border: "1px solid #dadce0",
                color: "#212529",
                fontSize: "15px",
                // fontWeight: "bold",
                fontFamily: "inter",
                position: "relative",
              }}
              onClick={handleSubmit}
            >
              <img
                src={googleLogo}
                alt="google logo"
                style={{
                  width: "24px",
                  height: "24px",
                  textAlign: "left",
                  left: 8,
                  top: 8,
                  position: "absolute",
                }}
              />
              Sign in with Google{" "}
            </button>
            {/* <GoogleOAuthProvider clientId={clientID}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
                width="258px"
              />
            </GoogleOAuthProvider> */}
          </div>
          <div className="signUp-link">
            <p>
              Don’t have an account?{" "}
              <button
                className="signUpBtn-link"
                onClick={handleSetSignUp}
                type="button"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
      {/* Sign Up */}
      <div
        className={
          isActive
            ? "row no-gutters justify-content-center align-items-center userFormWrapper userSignUp"
            : "row no-gutters justify-content-center align-items-center userFormWrapper userSignUp formActive"
        }
        style={{ height: "100%" }}
      >
        <form action="" autoComplete="off">
          <h2>Sign Up</h2>
          <div className="userLoginInput-group">
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
              <label>Email</label>
              <div className="form-group newNftWrapper">
                <input
                  type="email"
                  required
                  // value={name}
                  placeholder="Email"
                  className="form-control-login  newNftInput"
                  onChange={(e) => {
                    // setName(e.target.value);
                  }}
                />
              </div>
              {/* <label>Phone Number</label>
              <div className="form-group newNftWrapper userPhone">
                <IntlTelInput
                  preferredCountries={["pk"]}
                  onPhoneNumberChange={(e) => setPhoneNum(e)}
                /> */}
              {/* </div>
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
              </div> */}
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

          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <div className="signUp-link">
            <p>
              Already have an account?{" "}
              <button
                className="signUpBtn-link"
                onClick={handleSetSignIn}
                type="button"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginSignUpForms;