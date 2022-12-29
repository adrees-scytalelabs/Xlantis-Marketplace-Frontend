// REACT
import React, { useState } from "react";
// COMPONENTS
import IntlTelInput from "react-intl-tel-input";
// STYLESHEETS
import "react-intl-tel-input/dist/main.css";

// COMPONENT FUNCTION
const AdminLoginSignupForms = () => {
  // States
  const [isActive, setIsActive] = useState(false);
  const [phoneNum, setPhoneNum] = useState();

  // Handlers
  const handleSetActive = () => {
    setIsActive(!isActive);
  };

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
                    <button type="submit">Sign In</button>
                    <div className="signUp-link">
                      <p>
                        Don’t have an account?{" "}
                        <button
                          className="signUpBtn-link"
                          onClick={handleSetActive}
                          type="button"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
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
                  <button type="submit">Sign Up</button>
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
    </>
  );
};

export default AdminLoginSignupForms;
