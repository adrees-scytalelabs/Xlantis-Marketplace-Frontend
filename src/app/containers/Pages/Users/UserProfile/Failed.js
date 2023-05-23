import { Typography } from '@mui/material';
import React from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../../../../components/Headers/NewHeader";
import CancelIcon from '@mui/icons-material/Cancel';

function Failed() {
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
                <Typography variant="h3" style={{
                  fontFamily: "orbitron",
                  fontWeight: "bold",
                  color: "#F64D04",
                  textAlign: "center",
                }}>
                  Payment Unsuccessful!{" "}
                  <CancelIcon style={{
                    fontSize: "3rem",
                    color: "#F64D04",
                  }} />
                </Typography>
                <div className="row no-gutters justify-content-end align-items-center w-100 mt-4 detailRedirectWrapper border-0">
                  <Link to="/" className="w-100">
                    <button style={{
                      color: "#009850",
                      marginLeft: "5px",
                    }}>OK</button>
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

export default Failed;
