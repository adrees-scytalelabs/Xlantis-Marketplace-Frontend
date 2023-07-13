import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNFTsFromDropPaginatedWOBody } from "../../../components/API/AxiosInterceptor";
import FixedDropNFTCard from "../../../components/Cards/FixedDropNFTCard";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import WhiteSpinner from "../../../components/Spinners/WhiteSpinner";
import {
  DropBannerDefaultImage,
  defaultProfile,
} from "../../../components/ImageURLs/URLs";
import CircularBackdrop from "../../../components/Backdrop/Backdrop";
const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#000 !important",
    border: "1px solid #fff",
  },
  card: {
    minWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const cardStyles = {
  cardTheme: {
    boxShadow: "none",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: "0rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    fontSize: "1rem",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    fontWeight: "bold",
  },
};

const FixedPriceDropNFTs = () => {
  const { marketPlace } = useParams();
  const [userSaleData, setUserSaledata] = useState([]);
  const [cubeData, setCubeData] = useState([]);
  const [userAuctionData, setUserAuctiondata] = useState([]);
  const [cubeAuctionData, setCubeAuctionData] = useState([]);
  const [dropData, setDropData] = useState([]);
  const [orderListing, setOrderListing] = useState([]);
  const [open, setOpen] = useState(false);
  const [dropTitle, setDropTitle] = useState("");
  const [titleImage, setTitleImage] = useState(defaultProfile);
  const [bannerImage, setBannerImage] = useState(DropBannerDefaultImage);
  let navigate = useNavigate();
  const dropID = useParams();
  const location = useLocation();
  console.log("location", location);
  const saleType = location.state?.saleType;
  const description = location.state?.description;
  const startTime = location.state?.startTime;
  const endTime = location.state?.endTime;

  console.log("dropDatadropData", dropData);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const handleGoBack = () => {
    console.log("Market Place Id before back", location.state.marketplaceId);
    navigate(`/${marketPlace}`, {
      state: {
        marketplaceId: location.state.marketplaceId,
      },
    });
  };
  let getNFTs = (dropId, start, end) => {
    handleShowBackdrop();
    const version = Cookies.get("Version");
    //console.log("version", version);
    let marketplaceId = location.state.marketplaceId;
    getNFTsFromDropPaginatedWOBody(dropId, start, end, marketplaceId)
      .then((response) => {
        console.log("data from backend", response);
        setDropData(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      });
  };

  useEffect(() => {
    console.log("Market Place id in", location.state.marketplaceId);
    getNFTs(dropID.dropId, 0, 4);
    setTitleImage(location.state.imageURL);
    setBannerImage(location.state.bannerURL);
    setDropTitle(location.state.dropTitle);
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flexGrow={1}>
        <div className="home-section home-full-height">
          <div style={{ minHeight: "95px" }}>
          <HeaderHome
            selectedNav={"Home"}
            role={null}
            marketplaceId={location.state.marketplaceId}
          />
          </div>
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
                    <img src={bannerImage} className="bannerImg" />

                    <div className="dropThumbWrapper">
                      <img src={titleImage} className="thumbImg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-5">
                <div className="row no-gutters justify-content-start align-items-end my-4 pt-5">
                  <div className="col-12">
                    <h1 className="marketCatHeadings">
                      NFTs inside {dropTitle}
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
                      style={{
                        fontFamily: "inter",
                        textTransform: "capitalize",
                      }}
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
                <div className="row no-gutters w-100">
                  {open ? (
                    <CircularBackdrop open={open} />
                  ) : (
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justifyContent="flex-start"
                      style={{ marginBottom: "24px" }}
                    >
                      {dropData.length !== 0 ? (
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
                              titleImage={titleImage}
                              dropbanner={bannerImage}
                              data={i}
                              type={"Epic"}
                              saleType={saleType}
                              description={description}
                              startTime={startTime}
                              endTime={endTime}
                              classes={styles}
                              cardClasses={cardStyles}
                              marketplaceId={location.state.marketplaceId}
                            />
                          </Grid>
                        ))
                      ) : (
                        <div className="row no-gutters w-100 justify-content-center align-items-center mt-5">
                          <div className="col-12 mt-5">
                            <Typography variant="h6" align="center">
                              No items to display
                            </Typography>
                          </div>
                        </div>
                      )}
                    </Grid>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default FixedPriceDropNFTs;
