import { Typography, makeStyles } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../../../../components/Headers/Header";

const useStyles = makeStyles((theme) => ({
  mainInfoHeading: {
    fontFamily: "orbitron",
    fontWeight: "bold",
    color: "#F64D04",
    textAlign: "center",
  },
  infoIcon: {
    fontSize: "3rem",
    color: "#F64D04",
  },
  infoMessage: {
    marginTop: "16px",
    padding: "8px",
    textAlign: "center",
  },
  infoOK: {
    color: "#009850",
    marginLeft: "5px",
  },
}));

function Failed() {
  const classes = useStyles();
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
                <Typography variant="h3" className={classes.mainInfoHeading}>
                  Payment Unsuccessful!{" "}
                  <CancelIcon className={classes.infoIcon} />
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

export default Failed;
