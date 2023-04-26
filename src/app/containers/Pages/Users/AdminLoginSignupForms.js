import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import "react-intl-tel-input/dist/main.css";
import { adminLoginThroughSSO } from "../../../components/API/AxiosInterceptor";
import AdminLoginSignInForm from "../../../components/Forms/AdminLoginSignInForm";
import AdminSignUpForm from "../../../components/Forms/AdminSignUpForm";
import WorkInProgressModal from "../../../components/Modals/WorkInProgressModal";

const AdminLoginSignupForms = () => {
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phoneNum, setPhoneNum] = useState();
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [tokenVerification, setTokenVerification] = useState(true);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
        let variant = "info";
        enqueueSnackbar(
          "Your request is under process. Waiting for approval by the Super Admin",
          { variant }
        );
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
    </>
  );
};

export default AdminLoginSignupForms;
