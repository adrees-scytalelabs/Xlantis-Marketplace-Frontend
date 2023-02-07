// REACT
import React, { useState, useEffect } from "react";
// REACT ROUTER
import { useHistory, useParams, useLocation } from "react-router-dom";
// MUI
import { Grid } from "@material-ui/core/";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// COMPONENTS
import HeaderHome from "../../../components/Headers/Header";
import FixedDropNFTCard from "../../../components/Cards/FixedDropNFTCard";
import Footer from "../../../components/Footers/Footer";
// AXIOS
import axios from "axios";
import Cookies from "js-cookie";
import WhiteSpinner from "../../../components/Spinners/WhiteSpinner";

// COMPONENT FUNCTION
const FixedPriceDropNFTs = () => {
  // States
  const [userSaleData, setUserSaledata] = useState([]);
  const [cubeData, setCubeData] = useState([]);
  const [userAuctionData, setUserAuctiondata] = useState([]);
  const [cubeAuctionData, setCubeAuctionData] = useState([]);
  const [dropData, setDropData] = useState();
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const dropID = useParams();
  const location = useLocation();
  const saleType = location.state.saleType;
  const description = location.state.description;

  // Handlers
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const handleGoBack = () => {
    history.push(`/marketPlace`);
  };

  // Queries
  let getNFTs = (dropId, start, end) => {
    handleShowBackdrop();

    const version = Cookies.get("Version");
    console.log("version", version);
    let endpoint;
    if (version === undefined) {
      endpoint = `/v1-sso/drop/nfts/${dropId}/${start}/${end}`
    }
    else
    {
      endpoint = `/${version}/drop/nfts/${dropId}/${start}/${end}`
    }
    axios.get(endpoint).then(
      (response) => {
        console.log("getting a nft", response);
        setDropData(response.data.data);
        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      }
    );
  };

  // Side Effects
  useEffect(() => {
    getNFTs(dropID.dropId, 0, 4); // eslint-disable-next-line
  }, []);

  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        {/* Header */}
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} />
        </div>
        {/* Body */}
        {/* Banner and Thumb */}
        {!dropData ? (
          <div
            className="row no-gutters w-100 justify-content-center align-items-center"
            style={{ minHeight: "75vh" }}
          >
            <div className="col-12">
              <WhiteSpinner />
            </div>
          </div>
        ) : (
          <>
            <div className="row no-gutters">
              <div className="col-12">
                <div className="bannerWrapper">
                  {/* banner */}
                  <img
                    src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
                    className="bannerImg"
                  />

                  {/* thumbg */}
                  <div className="dropThumbWrapper">
                    <img
                      src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
                      className="thumbImg"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* NFTs */}
            <div className="container-fluid mt-5">
              {/* Heading */}
              <div className="row no-gutters justify-content-start align-items-end my-4 pt-5">
                {/* On Sale */}
                <div className="col-12">
                  <h1 className="marketCatHeadings">
                    NFTs inside Sample Drop{" "}
                  </h1>
                </div>
                <div className="col-12 col-md-6">
                  <h3
                    style={{
                      fontFamily: "inter",
                      textTransform: "capitalize",
                      marginBottom: 0,
                    }}
                  >
                    {saleType} Drop
                  </h3>
                  <p
                    style={{ fontFamily: "inter", textTransform: "capitalize" }}
                  >
                    {description}
                  </p>
                </div>
                <div className="col-12 col-md-6 text-right align-self-md-top">
                  <button className="bidBtn" onClick={handleGoBack}>
                    <ArrowBackIcon />
                    {"  "}
                    Back to Market Place
                  </button>
                </div>
              </div>
              {/* NFT Cards */}
              <div className="row no-gutters w-100">
                <Grid container spacing={3}>
                  {dropData &&
                    dropData.map((i, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={2}
                        spacing={1}
                        direction="row"
                        key={index}
                      >
                        <FixedDropNFTCard
                          data={i}
                          type={"Epic"}
                          saleType={saleType}
                          description={description}
                        />
                      </Grid>
                    ))}
                </Grid>
              </div>
            </div>
          </>
        )}
      </div>
      {/* FOOTER */}
      <div className="row no-gutters">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FixedPriceDropNFTs;
