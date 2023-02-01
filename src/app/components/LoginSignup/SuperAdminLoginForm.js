// REACT
import React, { useState } from "react";
// COMPONENTS
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
// STYLESHEETS
import "react-intl-tel-input/dist/main.css";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";

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
const SuperAdminLoginForms = () => {
  // States
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [msg, setMsg] = useState("");


  const classes = useStyles();

  // Hanlders
  const handleSetSignUp = () => {
    setIsActive(true);
    console.log("active set");
  };

  const handleSetSignIn = () => {
    setIsActive(false);
    console.log("inactive set");
  };

  const handleSignIn = (e) => {

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
        let variant = "success";
        enqueueSnackbar('Logged In Successfully', { variant });
        // history.push("/");
        window.location.reload();

        },
        (error) => {
        if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
        }
        let variant = "error";
        enqueueSnackbar('Unable To Login', { variant });
        setIsLoading(false);
        }
    );

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
        <form action="" autoComplete="off" onSubmit={(e) => handleSignIn(e)}>
          <h2>Sign In</h2>
          <div className="userLoginInput-group">
            <div className="form-group">
            <label>Email</label>
              <div className="form-group newNftWrapper">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="Email"
                  autoComplete="user-email"
                  className="form-control-login  newNftInput"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <label>Password</label>
              <div className="form-group newNftWrapper">
                <input
                  type="password"
                  autoComplete="off"
                  required
                  value={password}
                  placeholder="Password"
                  className="form-control-login  newNftInput"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button type="submit" >Sign In</button>
         
         
          <div className="signUp-link">
            {/* <p>
              Don’t have an account?{" "}
              <button
                className="signUpBtn-link"
                onClick={handleSetSignUp}
                type="button"
              >
                Sign Up
              </button>
            </p> */}
          </div>
        </form>
      </div>
      {/* Sign Up */}
     
    </div>
  );
};

export default SuperAdminLoginForms;
