// REACT
import React, { useState } from "react";
// COMPONENTS
import IntlTelInput from "react-intl-tel-input";
// STYLESHEETS
import "react-intl-tel-input/dist/main.css";

// COMPONENT FUNCTION
const UserLoginSignUpForms = () => {
  // States
  const [phoneNum, setPhoneNum] = useState();
  const [isActive, setIsActive] = useState(false);

  // Hanlders
  const handleSetSignUp = () => {
    setIsActive(true);
    console.log("active set");
  };

  const handleSetSignIn = () => {
    setIsActive(false);
    console.log("inactive set");
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
          <button type="submit">Sign In</button>
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

          <button type="submit">Sign Up</button>
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
