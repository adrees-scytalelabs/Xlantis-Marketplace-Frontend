import React from "react";
import HeaderHome from "../../../components/Headers/NewHeader";
import AdminLoginSignupForms from "./AdminLoginSignupForms";

const AdminLoginSignup = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="row no-gutters w-100">
          <HeaderHome selectedNav={""} role="admin" />
        </div>
        <div
          className="row no-gutters w-100 justify-content-center align-items-center"
          style={{ minHeight: "100vh", paddingTop: "90px" }}
        >
          <AdminLoginSignupForms />
        </div>
      </div>
    </>
  );
};

export default AdminLoginSignup;
