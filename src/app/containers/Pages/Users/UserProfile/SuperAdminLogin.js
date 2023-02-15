// REACT
import React from "react";
// COMPONENTS
import SuperAdminLoginForm from "../../../../components/LoginSignup/SuperAdminLoginForm";
import HeaderHome from "../../../../components/Headers/Header";

const SuperAdminLogin = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <div className="row no-gutters">
          <HeaderHome selectedNav={""} role={null} />
        </div>
        {/* Login */}
        <div
          className="row no-gutters justify-content-center align-items-center"
          style={{ minHeight: "100vh", paddingTop: "90px" }}
        >
          <div className="col-auto">
            <SuperAdminLoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminLogin;
