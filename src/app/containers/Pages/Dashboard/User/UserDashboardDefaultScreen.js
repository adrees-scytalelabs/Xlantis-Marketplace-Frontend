import ListAltIcon from "@material-ui/icons/ListAlt";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";

function UserDashboardDefaultScreen(props) {
  let [totalCubes, setTotalCubes] = useState(0);
  let [totalNFTs, setTotalNFTs] = useState(0);
  let [totalDrops, setTotalDrops] = useState(0);
  let [totalSeasons, setTotalSeasons] = useState(0);
  let [totalCollections, setTotalCollections] = useState(0);
  let [hover, setHover] = useState(false);
  let [userName, setUserName] = useState("");

  let getCounts = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    axios
      .get("user/getcounts")
      .then((response) => {
        setTotalNFTs(response.data.NFTscount);
        setTotalCollections(response.data.Collectionscount);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };
  let getProfile = () => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin != "undefined") {
      let version = Cookies.get("Version");
      axios
        .get(`${version}/user/profile`)
        .then((response) => {
          setUserName(response.data.userData.username);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
    }
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
    getProfile();
  }, []);

  return (
    <>
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome {userName}!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12 col-sm-5 col-xl-4 mr-sm-2 mb-2 mb-sm-0 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${props.match.url}/myNFTs`}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalNFTs}
            message="Total NFTs"
            icon={<ListAltIcon />}
          />
        </div>
      </div>
    </>
  );
}

export default UserDashboardDefaultScreen;
