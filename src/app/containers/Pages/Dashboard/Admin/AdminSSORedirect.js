import Cookies from "js-cookie";
import React, { useState } from "react";
import "../../../../assets/css/adminStyle.css";
import "../../../../assets/css/bootstrap.min.css";
import "../../../../assets/css/style.css";
import {
  adminLoginAddInfoUsingRoute,
  checkDomain,
} from "../../../../components/API/AxiosInterceptor";
import AdminSSORedirectForm from "../../../../components/Forms/AdminSSORedirectForm";
import HeaderHome from "../../../../components/Headers/Header";
// import HeaderHome from "../../../../components/Headers/Header";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import { defaultProfile } from "../../../../components/ImageURLs/URLs";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";

const AdminSSORedirect = () => {
  const [inputs, setInputs] = useState();
  const [success, setSucess] = useState();
  const [isDomainAvailable, setIsDomainAvailable] = useState(false);
  const [checking, setIsChecking] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [image, setImage] = useState(defaultProfile);
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  // THIS STATE WILL CHECK IF DOMAIN IS VERIFIED OR NOT BEFORE SAVING TO AVOID INCONVENIENCE
  const [updated, setUpdated] = useState(false);
  let version = Cookies.get("Version");

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  if (inputs !== undefined) {
    console.log("inputs are not undefined");
  }

  const handleSubmitDetails = async (event) => {
    event.preventDefault();
    console.log("Inputs are: ", inputs);
    if (image === defaultProfile) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please Upload Marketplace Image");
      handleSnackbarOpen();
    } else if (
      inputs?.industryType === "Select Industry" ||
      inputs?.industryType === null ||
      inputs?.industryType === undefined ||
      inputs?.industryType === "undefined"
    ) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please Select Industry Type");
      handleSnackbarOpen();
    } else {
      handleShowBackdrop();

      // IF USER HAS CHANGED DOMAIN AND IT HAS NOT BEEN UPDATED
      if (!updated) {
        await handleAvailability();
      }

      // CHECK FOR WRONG DOMAIN WHILE PROCEEDING FURTHER
      if (isDomainAvailable) {
        let variant = "error";
        setSnackbarMessage("This Marketplace name has been already taken");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
      await addDetails();
      Cookies.remove("Verified");
      sessionStorage.removeItem("Address");
      console.log(inputs, "the form inputs");
      handleCloseBackdrop();
    }
  };

  const handleAvailability = async (e) => {
    // e.preventDefault();
    if (inputs?.domain) {
      setIsChecking(true);
      const domain = { domain: inputs.domain };
      await checkDomain(domain)
        .then((response) => {
          console.log("Response from checking domain: ", response);
          setIsDomainAvailable(response.data.exists);
          setUpdated(true);
          setIsChecking(false);
        })
        .catch((error) => {
          console.log("In error function");
          console.log("Error from checking domain: ", error);
          setIsDomainAvailable(false);
          setIsChecking(false);
        });
    }
  };

  const getIcon = () => {
    if (checking) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
          }}
        >
          <i className="fa fa-spinner"></i>
        </div>
      );
    } else if (inputs?.domain && !checking) {
      if (!isDomainAvailable) {
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "5px",
              transform: "translateY(-50%)",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>
        );
      } else {
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "5px",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            X
          </div>
        );
      }
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
    },
  };

  let route;
  if (version === "v2-wallet-login") {
    route = "/v2-wallet-login/user/admin/add-info";
  } else route = "/v1-sso/user/admin/add-info";

  const addDetails = async () => {
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("userId");
    const formData = new FormData();
    formData.append("marketplaceImage", image);
    console.log("marketplaceImage",image);
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await adminLoginAddInfoUsingRoute(route, formData, config)
      .then((response) => {
        console.log(
          "Response from admin login add info using route: ",
          response
        );
        setSucess(response.data.success);
      })
      .catch((error) => {
        console.log("Error from admin login add info using route,", error.response);
      });
  };

  return (
    <>
      <div className="main-wrapper sso-redirect-wrapper">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={""} role={null} />
        </div>
        <div className="container my-5 px-lg-0">
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="detailRedirectWrapper">
                <AdminSSORedirectForm
                  handleSubmitDetails={handleSubmitDetails}
                  inputs={inputs}
                  setImage={setImage}
                  handleChangeValues={handleChangeValues}
                  success={success}
                  handleAvailability={handleAvailability}
                  getIcon={getIcon}
                  setAvailability={setIsDomainAvailable}
                  setUpdate={setUpdated}
                  updated={updated}
                  setInputs={setInputs}
                  isDomainAvailable={isDomainAvailable}
                  image={image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <CircularBackdrop open={open} />
    </>
  );
};

export default AdminSSORedirect;
