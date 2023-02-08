// REACT
import React, { useState } from "react";
// COMPONENTS
import HeaderHome from "../../../../components/Headers/Header";
import Select from "react-select";
// AXIOS
import axios from "axios";
// MUI
import { Grid } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const indsutries = [
  { industry: "IT" },
  { industry: "Web Development" },
  { industry: "Computer Networking" },
  { industry: "Telecommunications" },
  { industry: "Software Development" },
];

// COMPONENT FUNCTION
const AdminSSORedirect = () => {
  const [inputs, setInputs] = useState();
  const [success, setSucess] = useState();
  let version = Cookies.get("Version");
  console.log(version, " is the version")

  // Handlers
  const handleChangeValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  if (inputs !== undefined) {
    console.log("inputs are not undefined");
  }

  var testInputs = {
    domain: "Nike",
    companyName: "Nike",
    designation: "CTO",
    industryType: "Sports",
    reasonForInterest: "Seperate domain to use xManna marketplace",
  };

  const handleSubmitDetails = (event) => {
    event.preventDefault();
    addDetails();
    Cookies.remove("Verified");
    console.log(inputs, "the form inputs");
  };

  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("Authorization")}`,
    },
  };

  let route;
  if(version === 'v2-wallet-login') {
    route = "/v2-wallet-login/user/admin/add-info"
  } else route = "/v1-sso/user/admin/add-info"

  const addDetails = async () => {
    // Object.keys(inputs).length === 0
    await axios
      .put(route, inputs, config)
      .then((response) => {
        console.log("The response of axios post: ", response.data.success);
        setSucess(response.data.success);
      })
      .catch((error) => {
        console.log("an error has occured,", error.response);
      });
  };

  // Content
  return (
    <>
      <div className="main-wrapper sso-redirect-wrapper">
        {/* Header */}
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={""} />
        </div>
        <div className="container my-5 px-lg-0">
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="detailRedirectWrapper">
                <form onSubmit={handleSubmitDetails} autoComplete="off">
                  <div className="ssoDetailsInput-group">
                    <h2>Finish Account Setup</h2>
                    <div className="row no-gutters justify-content-center align-items-center w-100">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="form-group newNftWrapper">
                              <input
                                id="fullName"
                                type="text"
                                value={inputs?.fullName || ""}
                                name="fullName"
                                required
                                // value={name}
                                placeholder="Full Name"
                                className="form-control-login -login newNftInput"
                                onChange={handleChangeValues}
                              />
                            </div>
                            <label htmlFor="industry">Industry</label>
                            <div className="form-group newNftWrapper">
                              <select
                                id="industry"
                                name="industryType"
                                value={inputs?.industryType || ""}
                                required
                                // multiple
                                className="form-control-login  newNftInput"
                                onChange={handleChangeValues}
                              >
                                <option value="Select Industry">
                                  Select Industry
                                </option>
                                {indsutries.map((i, index) => (
                                  <option value={i.industry} key={index}>
                                    {i.industry}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <label htmlFor="story">
                              Why do you want to join Xmanna?
                            </label>
                            <div className="form-group newNftWrapper">
                              <textarea
                                id="reasonForInterest"
                                name="reasonForInterest"
                                required
                                value={inputs?.reasonForInterest || ""}
                                className="form-control-login -login newNftInput"
                                onChange={handleChangeValues}
                                rows="6"
                                cols="33"
                                minLength={10}
                                maxLength={500}
                              ></textarea>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label htmlFor="companyName">Company Name</label>
                          <div className="form-group newNftWrapper">
                            <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              required
                              value={inputs?.companyName || ""}
                              placeholder="Company Name"
                              className="form-control-login -login newNftInput"
                              onChange={handleChangeValues}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="designation">Designation</label>
                            <div className="form-group newNftWrapper">
                              <input
                                id="designation"
                                name="designation"
                                type="text"
                                required
                                value={inputs?.designation || ""}
                                placeholder="Designation"
                                className="form-control-login -login newNftInput"
                                onChange={handleChangeValues}
                              />
                            </div>
                            <label htmlFor="domain">Domain</label>
                            <div className="form-group newNftWrapper">
                              <input
                                id="domain"
                                name="domain"
                                type="text"
                                required
                                value={inputs?.domain || ""}
                                placeholder="Domain"
                                className="form-control-login -login newNftInput"
                                onChange={handleChangeValues}
                              />
                            </div>
                          </div>
                          <div className="row no-gutters justify-content-center justify-content-md-end align-items-end w-100 mt-4 pt-md-3">
                            <div className="col-12 col-md-8 col-lg-6">
                              <button className="signUpBtn-link" type="submit">
                                Save
                              </button>
                              {success && <Redirect to="/updatRequestSent" />}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSSORedirect;
