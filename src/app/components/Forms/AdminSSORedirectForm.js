import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { Grid, Tooltip, Typography, Alert } from "@mui/material";
import { defaultProfile } from "../../components/ImageURLs/URLs";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import UploadFile from "../Upload/UploadFile";
import InfoIcon from "@mui/icons-material/Info";
import ImageCropModal from "../Modals/ImageCropModal";
import getCroppedImg from "../Utils/Crop";

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
  setInputs,
  isDomainAvailable,
  setImage
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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageSrc, setImageSrc] = useState("");
  const [imageCounter, setImageCounter] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("square");
  const [imageFile, setImageFile] = useState(defaultProfile);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setImageSrc("");
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      setIsUploadingCroppedImage(true);
      const image = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        imageCounter,
        0
      );
      setImage(image);
      setImageFile(URL.createObjectURL(image));
      setImageSrc("");
      setAspect(1 / 1);
      setIsUploadingCroppedImage(false);
      setShowCropModal(false);
      setImageCounter(imageCounter + 1);
      setSnackbarMessage("Image Uploaded Succesfully");
      setSnackbarSeverity("success");
    } catch (e) {
      console.log("Error: ", e);
    }
  });
  let onChangeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setCropShape("square");
      setAspect(1 / 1);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      // setImage(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
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
  useEffect(() => {
    handleAvailability();
  }, [inputs?.domain]);
  return (
    <>
      <form onSubmit={handleSubmitDetails} autoComplete="off">
        <h2>Finish Account Setup</h2>
        <label>Select Marketplace Image</label>
        <ImageCropModal
          show={showCropModal}
          handleClose={handleCloseImageCropModal}
          crop={crop}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          imageSrc={imageSrc}
          uploadImage={showCroppedImage}
          isUploadingCroppedImage={isUploadingCroppedImage}
          zoom={zoom}
          setZoom={setZoom}
          aspect={aspect}
          cropShape={cropShape}
        />
        <UploadFile
          fileURL={imageFile}
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
                      className={`form-control-login -login newNftInput ${inputError ? "input-error" : ""
                        }`}
                      pattern="^\S*$"
                      title="Please do not use spaces in the Username"
                      onChange={(e) => {
                        handleChangeValues(e);
                        handlePatternValidation(e);
                        handleAvailability(e);
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
                  {inputs?.domain !== "" &&
                    inputs?.domain !== undefined &&
                    (!isDomainAvailable ? (
                      <Alert severity="success">UserName available</Alert>
                    ) : (
                      <Alert severity="error">UserName not available</Alert>
                    ))}
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
