// eslint-disable-next-line
import axios from "axios"; // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StorageIcon from "@material-ui/icons/Storage";
import Card from "@material-ui/core/Card";
import Cookies from "js-cookie";

// COMPONENT FUNCTION
function AdminDashboardDefaultScreen(props) {
  let [totalCubes, setTotalCubes] = useState(0);
  let [totalNFTs, setTotalNFTs] = useState(0);
  let [totalDrops, setTotalDrops] = useState(0);
  let [totalSeasons, setTotalSeasons] = useState(0);
  let [totalCollections, setTotalCollections] = useState(0);
  let [hover, setHover] = useState(false);
  let [hoverCollections, setHoverCollections] = useState(false);

  let getCounts = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "Authorization"
    )}`;
    axios
      .get("user/getcounts")
      .then((response) => {
        console.log(response);
        setTotalCubes(response.data.Cubescount);
        setTotalNFTs(response.data.NFTscount);
        setTotalDrops(response.data.Dropscount);
        setTotalSeasons(response.data.Seasonscount);
        setTotalCollections(response.data.Collectionscount);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myCubes: "",
      myDrops: "",
      mySeason: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
    });
    getCounts();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
      {/* Cards */}
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        {/* Total NFTs */}
        <div className="col-12 col-sm-5 col-xl-4 mr-sm-2 mb-2 mb-sm-0 totalNftsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalNftsAdminDash"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to={`${props.match.url}/myNFTs`}>
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
                      Total NFTs
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
                    {totalNFTs}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
        {/* Total Collections */}
        <div className="col-12 col-sm-5 col-xl-4 ml-sm-2 mt-2 mt-sm-0 totalCollectionsAdminDash">
          <Card
            style={{
              padding: "1rem",
              borderRadius: 0,
            }}
            id="totalCollectionsAdminDash"
            onMouseEnter={() => setHoverCollections(true)}
            onMouseLeave={() => setHoverCollections(false)}
          >
            <Link to={`${props.match.url}/newCollection`}>
              <div className="row no-gutters justify-content-between">
                <div className="col align-self-end">
                  <section>
                    <h4
                      className={
                        hoverCollections
                          ? "totalCollectionsAdminDashHeadingHover totalCollectionsAdminDashHeading"
                          : "totalCollectionsAdminDashHeading"
                      }
                    >
                      <span>
                        <i className="fas fa-layer-group pr-1"></i>
                      </span>
                      Total Collections
                    </h4>
                  </section>
                </div>
                <div className="col">
                  <h1
                    className={
                      hoverCollections
                        ? "totalCollectionsAdminDashCountHover"
                        : "totalCollectionsAdminDashCount"
                    }
                  >
                    {totalCollections}
                  </h1>
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </div>

      {/* <div className="row mt-5">
        <div className="col-12 col-sm-3">
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
      </div> */}
    </>
  );
}

export default AdminDashboardDefaultScreen;
