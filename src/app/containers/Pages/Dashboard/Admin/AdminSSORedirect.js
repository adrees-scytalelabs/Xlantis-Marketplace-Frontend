import Cookies from "js-cookie";
import React, { useState } from "react";
import "../../../../assets/css/adminStyle.css";
import "../../../../assets/css/bootstrap.min.css";
import "../../../../assets/css/style.css";
import "../../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { adminLoginAddInfoUsingRoute } from "../../../../components/API/AxiosInterceptor";
import AdminSSORedirectForm from "../../../../components/Forms/AdminSSORedirectForm";
import HeaderHome from "../../../../components/Headers/NewHeader";

const AdminSSORedirect = () => {
  const [inputs, setInputs] = useState();
  const [success, setSucess] = useState();
  let version = Cookies.get("Version");

  const handleChangeValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  if (inputs !== undefined) {
    console.log("inputs are not undefined");
  }

  const handleSubmitDetails = (event) => {
    event.preventDefault();
    addDetails();
    Cookies.remove("Verified");
    sessionStorage.removeItem("Address");
    console.log(inputs, "the form inputs");
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
    await adminLoginAddInfoUsingRoute(route, inputs, config)
      .then((response) => {
        setSucess(response.data.success);
      })
      .catch((error) => {
        console.log("an error has occured,", error.response);
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
                  handleChangeValues={handleChangeValues}
                  success={success}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSSORedirect;
