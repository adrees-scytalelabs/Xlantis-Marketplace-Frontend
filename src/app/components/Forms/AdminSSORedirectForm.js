import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Grid, Tooltip, Typography, Alert } from "@mui/material";
import { defaultProfile } from "../../components/ImageURLs/URLs";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import UploadFile from "../Upload/UploadFile";
import InfoIcon from "@mui/icons-material/Info";

function AdminSSORedirectForm({
  handleSubmitDetails,
  inputs,
  handleChangeValues,
  success,
  handleAvailability,
  getIcon,
  setAvailability,
  setUpdate,
  updated,
  setImage,
  setInputs,
}) {
  const indsutries = [
    { industry: "IT" },
    { industry: "Web Development" },
    { industry: "Computer Networking" },
    { industry: "Telecommunications" },
    { industry: "Software Development" },
  ];
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileURL, setFileURL] = useState(defaultProfile);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  let onChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setImage(e.target.files[0]);
      setFileURL(URL.createObjectURL(e.target.files[0]));
      //setInputs((values) => ({ ...values, marketplaceImage: e.target.files[0]}));
      setIsUploading(false);
    }
  };
  const handlePatternValidation = (event) => {
    const value = event.target.value;
    const pattern = /^\S*$/;
    if (!pattern.test(value)) {
      setInputError(true);
      setErrorMessage("Please do not use spaces in the Username");
    } else {
      setInputError(false);
      setErrorMessage("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitDetails} autoComplete="off">
        <h2>Finish Account Setup</h2>
        <label>Select Marketplace Image</label>
        <UploadFile
          fileURL={fileURL}
          isUploading={isUploading}
          changeFile={onChangeFile}
          class="col-12 col-md-auto profile-img mr-3"
          accept=".png,.jpg,.jpeg,.gif"
          inputId="uploadPreviewImg"
        />
        <div className="ssoDetailsInput-group">
          <div className="row no-gutters justify-content-center align-items-center w-100">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="form-group1"></div>
              </Grid>
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
                      className="form-control-login  newNftInput"
                      onChange={handleChangeValues}
                    >
                      <option value="Select Industry">Select Industry</option>
                      {indsutries.map((i, index) => (
                        <option value={i.industry} key={index}>
                          {i.industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label htmlFor="story">Why do you want to join Xmanna?</label>
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
                  <label className="mr-2" htmlFor="domain">
                    Username
                  </label>
                  <Tooltip
                    title={
                      <Typography fontSize={18}>
                        This username will be shown against your marketplace
                        image on the home page
                      </Typography>
                    }
                  >
                    <span style={{ fontSize: "0.9rem" }}>
                      <InfoIcon />
                    </span>
                  </Tooltip>
                  <div className="form-group newNftWrapper position-relative">
                    <input
                      id="domain"
                      name="domain"
                      type="text"
                      required
                      value={inputs?.domain || ""}
                      placeholder="Username"
                      className={`form-control-login -login newNftInput ${
                        inputError ? "input-error" : ""
                      }`}
                      pattern="^\S*$"
                      title="Please do not use spaces in the Username"
                      onChange={(e) => {
                        handleChangeValues(e);
                        handlePatternValidation(e);
                      }}
                      onBlur={(e) => {
                        setAvailability();
                        handleAvailability(e);
                      }}
                    />
                    {getIcon()}

                    {inputError && (
                      <Alert severity="error" style={{ marginTop: "5px" }}>
                        {errorMessage}
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="row no-gutters justify-content-center justify-content-md-end align-items-end w-100 mt-4 pt-md-3">
                  <div className="col-12 col-md-8 col-lg-6">
                    <button className="signUpBtn-link" type="submit">
                      Save
                    </button>
                    {success && <Navigate to="/updatRequestSent" />}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
}

export default AdminSSORedirectForm;
