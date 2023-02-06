// eslint-disable-next-line
import axios from "axios"; // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
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
function SuperAdminSSOScreen(props) {
  let [totalAdmins, setTotalAdmins] = useState(0);
  let [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  let [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  let [totalEnabled, setTotalEnabled] = useState(0);
  let [totalDisabled, setTotalDisabled] = useState(0);
  let [hover, setHover] = useState(false);

  let getCounts = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "Authorization"
    )}`;
    axios

      .get(`/v1-sso/super-admin/admins/counts`)
      .then((response) => {
        console.log(response);
        setTotalAdmins(response.data.counts.totalAdmins);
        setTotalVerifiedAdmins(response.data.counts.totalVerifiedAdmins);
        setTotalUnverifiedAdmins(response.data.counts.totalUnverifiedAdmins);
        setTotalEnabled(response.data.counts.totalEnabledAdmins);
        setTotalDisabled(response.data.counts.totalDisabledAdmins);
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
    <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
      <div className="col-12 col-sm-5 col-xl-4 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
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
      <div className="col-12 col-sm-5 col-xl-4 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
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
      <div className="col-12 col-sm-5 col-xl-4 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
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
      <div className="col-12 col-sm-5 col-xl-4 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
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
      <div className="col-12 col-sm-5 col-xl-4 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
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
  );
}

export default SuperAdminSSOScreen;