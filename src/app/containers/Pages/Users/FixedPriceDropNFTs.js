import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNFTsFromDropPaginatedWOBody } from "../../../components/API/AxiosInterceptor";
import FixedDropNFTCard from "../../../components/Cards/FixedDropNFTCard";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import WhiteSpinner from "../../../components/Spinners/WhiteSpinner";
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
  const [userSaleData, setUserSaledata] = useState([]);
  const [cubeData, setCubeData] = useState([]);
  const [userAuctionData, setUserAuctiondata] = useState([]);
  const [cubeAuctionData, setCubeAuctionData] = useState([]);
  const [dropData, setDropData] = useState([]);
  const [orderListing, setOrderListing] = useState([]);
  const [open, setOpen] = useState(false);
  const [dropTitle, setDropTitle] = useState("");
  const [titleImage, setTitleImage] = useState(
    "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
  );
  const [bannerImage, setBannerImage] = useState(
    "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
  );
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
    navigate(`/marketPlace`);
  };
  let getNFTs = (dropId, start, end) => {
    handleShowBackdrop();

    const version = Cookies.get("Version");
    //console.log("version", version);

    getNFTsFromDropPaginatedWOBody(dropId, start, end)
      .then((response) => {
        console.log("data from backend",response);
        setDropData(response.data.data);
        setOrderListing(response.data.orderListingData)
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
    getNFTs(dropID.dropId, 0, 4);
    setTitleImage(location.state.imageURL);
    setBannerImage(location.state.bannerURL);
    setDropTitle(location.state.dropTitle);
  }, []);

  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} role={null} />
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
                  <h1 className="marketCatHeadings">NFTs inside {dropTitle}</h1>
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
              <div className="row no-gutters w-100">
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="flex-start"
                  style={{ marginBottom: "24px" }}
                >
                  {dropData &&
                    dropData.length &&
                    dropData?.map((i, index) => (
                      orderListing?.map((j) => (
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
                          orderListing={j}
                          type={"Epic"}
                          saleType={saleType}
                          description={description}
                          startTime={startTime}
                          endTime={endTime}
                          classes={styles}
                          cardClasses={cardStyles}
                        />
                      </Grid>
                    ))))}
                </Grid>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row no-gutters">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FixedPriceDropNFTs;
