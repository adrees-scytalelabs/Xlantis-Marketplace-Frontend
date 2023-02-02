// eslint-disable-next-line
import axios from "axios"; // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StorageIcon from "@material-ui/icons/Storage";
import Cookies from "js-cookie";
import { Card } from "@material-ui/core";

// COMPONENT FUNCTION
function SuperAdminDashboardDefaultScreen(props) {
  let [totalAdmins, setTotalAdmins] = useState(0);
  let [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  let [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  let [totalEnabled, setTotalEnabled] = useState(0);
  let [totalDisabled, setTotalDisabled] = useState(0);
  let [hover, setHover] = useState(false);

  let getCounts = () => {
    let version = Cookies.get("Version");

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
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome SuperAdmin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}

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
                      Total Admins
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
                      Total Enabled
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
                      Total Disabled
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
                      Total Verified
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
                      Total Unverified
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
        {/* <div className="col-12 col-sm-3">
          <Link to={`${props.match.url}/myCubes`}>
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-secondary border-secondary">
                    <i className="fas fa-cubes" />
                  </span>
                  <div className="dash-count">
                    <h3>{totalCubes}</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Total Cubes</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-secondary w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-3">
          <Link to={`${props.match.url}/myDrops`}>
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-danger border-danger">
                    <StorageIcon />
                  </span>
                  <div className="dash-count">
                    <h3>{totalDrops}</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Total Drops</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-danger w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-sm-3">
          <Link to={`${props.match.url}/mySeason`}>
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-success border-success">
                    <i className="fas fa-boxes"></i>
                  </span>
                  <div className="dash-count">
                    <h3>{totalSeasons}</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Total Seasons</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-success w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-sm-3">
          <Link to={`${props.match.url}/newCollection`}>
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-info border-info">
                    <i className="fas fa-layer-group"></i>
                  </span>
                  <div className="dash-count">
                    <h3>{totalCollections}</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Total Collections</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-info w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </>
  );
}

export default SuperAdminDashboardDefaultScreen;
