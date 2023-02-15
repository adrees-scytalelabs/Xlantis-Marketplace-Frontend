// REACT
import React from "react";
// COMPONENTS
import UserLoginSignUpForms from "../../../../components/LoginSignup/UserLoginSignUpForms";
import HeaderHome from "../../../../components/Headers/Header";

const UserLoginSignup = () => {
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
            <UserLoginSignUpForms />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginSignup;
