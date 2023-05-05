import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
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
}

const customTheme = createTheme({
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

function AdminLoginSignInForm({ setWorkProgressModalShow, handleSuccess, adminSignInData, tokenVerification }) {

  let navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/`);
  };

  const { REACT_APP_CLIENT_ID } = process.env;
  const clientID = `${REACT_APP_CLIENT_ID}`;
  return (
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
                onChange={(e) => {

                }}
              />
            </div>
            <label>Password</label>
            <div className="form-group newNftWrapper">
              <input
                type="password"
                required

                placeholder="Password"
                className="form-control-login  newNftInput"
                onChange={(e) => {

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
              sx={styles.signInOptionLabel}
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
                <Navigate to="/admin-signup-details" />
              )}
          </ThemeProvider>
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
  )
}

export default AdminLoginSignInForm