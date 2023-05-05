import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import React from "react";
import { Link } from "react-router-dom";

const UpdateRequestSent = () => {
  return (
    <div className="main-wrapper">
      <div className="container px-md-0">
        <div
          className="row no-gutters justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-md-6">
            <div className="redirectInfoBoxWrapper">
              <Typography variant="h3" sx={{
                fontFamily: "orbitron",
                fontWeight: "bold",
                color: "#F64D04",
                textAlign: "center",
              }}>
                <InfoIcon sx={{
                  fontSize: "3rem",
                  color: "#F64D04",
                }} /> Information
              </Typography>
              <Typography variant="body2" sx={{
                marginTop: "16px",
                padding: "8px",
                textAlign: "center",
              }}>
                Your request has been sent to the super admin for approval!{" "}
                <CheckCircleIcon sx={{
                  color: "#009850",
                  marginLeft: "5px",
                }} />
              </Typography>
              <div className="row no-gutters justify-content-end align-items-center w-100 mt-4 detailRedirectWrapper border-0">
                <Link to="/" className="w-100">
                  <button>OK</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRequestSent;
