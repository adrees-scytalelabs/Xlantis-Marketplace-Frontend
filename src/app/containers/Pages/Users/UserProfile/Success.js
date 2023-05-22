import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import React from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../../../../components/Headers/NewHeader";

function Success() {
  return (
    <>
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} role={null} />
      </div>
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
                  color: "#009850",
                  textAlign: "center",
                }}>
                  Payment Successful!{" "}
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
    </>
  );
}

export default Success;
