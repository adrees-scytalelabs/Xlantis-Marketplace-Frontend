// REACT
import React from "react";
// COMPONENTS
import HeaderHome from "../../../components/Headers/Header";
import AdminLoginSignupForms from "./AdminLoginSignupForms";

const AdminLoginSignup = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <div className="row no-gutters w-100">
          <HeaderHome selectedNav={""} role="admin" />
        </div>
        {/* Login Signup */}
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
