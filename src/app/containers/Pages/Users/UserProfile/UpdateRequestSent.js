// REACT
import React from "react";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// MUI ICONS
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

// CUSTOM STYLING
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

// COMPONENT FUNCTION
const UpdateRequestSent = () => {
  const classes = useStyles();

  // Content
  return (
    <div className="main-wrapper">
      <div className="container px-md-0">
        <div
          className="row no-gutters justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-md-6">
            <div className="redirectInfoBoxWrapper">
              <Typography variant="h3" className={classes.mainInfoHeading}>
                <InfoIcon className={classes.infoIcon} /> Information
              </Typography>
              <Typography variant="body2" className={classes.infoMessage}>
                Your request has been sent to the super admin for approval!{" "}
                <CheckCircleIcon className={classes.infoOK} />
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
