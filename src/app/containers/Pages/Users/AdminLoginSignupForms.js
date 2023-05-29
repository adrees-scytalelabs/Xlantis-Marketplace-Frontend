import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { adminLoginThroughSSO } from "../../../components/API/AxiosInterceptor";
import AdminLoginSignInForm from "../../../components/Forms/AdminLoginSignInForm";
import AdminSignUpForm from "../../../components/Forms/AdminSignUpForm";
import WorkInProgressModal from "../../../components/Modals/WorkInProgressModal";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";

const AdminLoginSignupForms = () => {
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phoneNum, setPhoneNum] = useState();
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [tokenVerification, setTokenVerification] = useState(true);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSuccess = (credentialResponse) =>
    setAccount(credentialResponse.credential);

  const handleSetActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (account !== null) {
      adminLoginThroughSSO({ idToken: account })
        .then((response) => {
          console.log("JWT submitted: ", response);
          if (response.status === 200) {
            Cookies.set("Version", "v1-sso", {});
            setAdminSignInData(response.data);
            console.log("1");
            response.data.isInfoAdded === true &&
              Cookies.set("InfoAdded", response.data.isInfoAdded, {});
            console.log("2");
            response.data.isVerified === true &&
              Cookies.set("Verified", response.data.isVerified, {});
            console.log("3");
            response.data.raindropToken &&
              sessionStorage.setItem(
                "Authorization",
                response.data.raindropToken,
                {}
              );
            if (
              response.data.isInfoAdded === true &&
              response.data.isVerified === true
            ) {
              let variant = "success";
              setSnackbarMessage("Logged in successfully");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              window.location.reload(false);
            }
          }
        })
        .catch((error) => {
          console.log("JWT could not be submitted,", error);
          if (error) setTokenVerification(false);
        });
    }
    return () => {
      controller.abort();
    };
  }, [account]);

  useEffect(() => {
    if (adminSignInData !== null) {
      let decode = jwtDecode(adminSignInData.raindropToken);
      sessionStorage.setItem("userId", decode.userId);
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
        let variant = "info";
        setSnackbarMessage(
          "Your request is under process. Waiting for approval by the Super Admin."
        );
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    }
  }, [adminSignInData]);

  adminSignInData &&
    console.log("jwt after submission: //// ", adminSignInData);

  return (
    <>
      <div className="row no-gutters w-100">
        <div className="adminCredWrapper">
          <div
            className={
              isActive
                ? "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn formActive"
                : "row no-gutters justify-content-center align-items-center adminCredWrapper userSignIn"
            }
          >
            <div className="adminLoginContainer">
              <div>
                <AdminLoginSignInForm
                  setWorkProgressModalShow={setWorkProgressModalShow}
                  handleSuccess={handleSuccess}
                  adminSignInData={adminSignInData}
                  tokenVerification={tokenVerification}
                />
              </div>
            </div>
          </div>

          <div
            className={
              isActive
                ? "row no-gutters justify-content-center align-items-center adminCredWrapper userSignUp w-100"
                : "row no-gutters justify-content-center align-items-center adminCredWrapper userSignUp formActive w-100"
            }
          >
            <div className="adminSignupContainer">
              <AdminSignUpForm
                setPhoneNum={setPhoneNum}
                handleSetActive={handleSetActive}
              />
            </div>
          </div>
        </div>
      </div>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default AdminLoginSignupForms;
