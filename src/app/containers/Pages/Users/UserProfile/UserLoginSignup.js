import React from "react";
import HeaderHome from "../../../../components/Headers/NewHeader";
import UserLoginSignUpForms from "../../../../components/LoginSignup/UserLoginSignUpForms";

const UserLoginSignup = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="row no-gutters">
          <HeaderHome selectedNav={""} role={null} />
        </div>
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
