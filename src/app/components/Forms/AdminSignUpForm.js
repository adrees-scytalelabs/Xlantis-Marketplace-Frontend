import React from 'react'
import IntlTelInput from "react-intl-tel-input";

function AdminSignUpForm({setPhoneNum,handleSetActive}) {
  return (
    <div>
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
                            onChange={(e) => {
                            }}
                          />
                        </div>
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
                            onChange={(e) => {
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
                            placeholder="Wallet Address"
                            className="form-control-login  newNftInput"
                            onChange={(e) => {
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
  )
}

export default AdminSignUpForm