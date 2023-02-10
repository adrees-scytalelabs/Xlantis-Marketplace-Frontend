// eslint-disable-next-line
import axios from "axios"; // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import StorageIcon from "@material-ui/icons/Storage";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Card,
  CardHeader,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tableHeader: {
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
  },
  approveBtn: {
    backgroundColor: "#F64D04",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&$hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
}));

function SuperAdminSSOScreen(props) {
  const classes = useStyles();
  let [totalAdmins, setTotalAdmins] = useState(0);
  const [open, setOpen] = useState(false);
  let [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  let [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  let [totalEnabled, setTotalEnabled] = useState(0);
  let [totalDisabled, setTotalDisabled] = useState(0);
  let [hover, setHover] = useState(false);

  let getCounts = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    setOpen(true);
    axios

      .get(`/v1-sso/super-admin/admins/counts`)
      .then((response) => {
        console.log(response);
        setTotalAdmins(response.data.counts.totalAdmins);
        setTotalVerifiedAdmins(response.data.counts.totalVerifiedAdmins);
        setTotalUnverifiedAdmins(response.data.counts.totalUnverifiedAdmins);
        setTotalEnabled(response.data.counts.totalEnabledAdmins);
        setTotalDisabled(response.data.counts.totalDisabledAdmins);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };
  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
    });
    getCounts();
    // eslint-disable-next-line
  }, []);

  console.log("props in super admin dashboard: ", props);
  return (
    <div className="container">
      <div className="row no-gutters justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/accounts`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hover
                          ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                          : "totalNftsAdminDashHeading"
                      }
                    >
                      <span>
                        <ListAltIcon />{" "}
                      </span>
                      Total SSO Admins
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hover
                        ? "totalNftsAdminDashCountHover"
                        : "totalNftsAdminDashCount"
                    }
                  >
                    {totalAdmins}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/manageAccounts`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hover
                          ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                          : "totalNftsAdminDashHeading"
                      }
                    >
                      <span>
                        <ListAltIcon />{" "}
                      </span>
                      SSO Enabled Admins
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hover
                        ? "totalNftsAdminDashCountHover"
                        : "totalNftsAdminDashCount"
                    }
                  >
                    {totalEnabled}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/manageAccounts`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hover
                          ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                          : "totalNftsAdminDashHeading"
                      }
                    >
                      <span>
                        <ListAltIcon />{" "}
                      </span>
                      SSO Disabled Admins
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hover
                        ? "totalNftsAdminDashCountHover"
                        : "totalNftsAdminDashCount"
                    }
                  >
                    {totalDisabled}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/accounts`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hover
                          ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                          : "totalNftsAdminDashHeading"
                      }
                    >
                      <span>
                        <ListAltIcon />{" "}
                      </span>
                      Total SSO Verified Admins
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hover
                        ? "totalNftsAdminDashCountHover"
                        : "totalNftsAdminDashCount"
                    }
                  >
                    {totalVerifiedAdmins}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/accountApproval`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hover
                          ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                          : "totalNftsAdminDashHeading"
                      }
                    >
                      <span>
                        <ListAltIcon />{" "}
                      </span>
                      Total SSO Unverified Admins
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hover
                        ? "totalNftsAdminDashCountHover"
                        : "totalNftsAdminDashCount"
                    }
                  >
                    {totalUnverifiedAdmins}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SuperAdminSSOScreen;
