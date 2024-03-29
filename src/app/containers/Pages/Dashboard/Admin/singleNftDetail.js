import { ThemeProvider, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getSingleNFTDetail,
  getTradeHistory,
} from "../../../../components/API/AxiosInterceptor";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import TradeHistoryAccordian from "../../../../components/Accordian/TradeHistoryAccordian";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import SingleNFTDetailCard from "../../../../components/Cards/SingleNFTDetailCard";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
import NFTSale from "../../../../components/Modals/NFTSale";
import SummaryModal from "../../../../components/Modals/SummaryModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import Button from "@mui/material/Button";

const styles = {
  buttons: {
    margin: "5px 0px 5px 7px",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    color: "#fff",
    padding: "10px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
  media: {
    marginTop: "15px",
    width: "100%",
    paddingTop: "100%",
  },
};

const makeTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          border: "1px solid white",
          borderRadius: "0px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          border: "1px solid #fff",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

const SingleNftDetail = (props) => {
  let location = useLocation();
  const { nftId } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [properties, setProperties] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [nftType, setNftType] = useState("1155");
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
  const [summaryModal, setSummaryModal] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeStamp, setStartTimeStamp] = useState(
    Math.round(startTime.getTime() / 1000)
  );
  const [endTimeStamp, setEndTimeStamp] = useState(
    Math.round(endTime.getTime() / 1000)
  );
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [role, setRole] = useState("");

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const handleSummaryModalClose = () => {
    setSummaryModal(false);
    setShowModal(true);
  };
  const handleSummaryModalOpen = () => {
    setSummaryModal(true);
    setShowModal(false);
  };
  let getTradeHistoryDetail = () => {
    getTradeHistory(nftId)
      .then((response) => {
        console.log("Trade History", response.data.history);
        setTradeHistory(response.data.history);
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error in trade history: ", error.response);
      });
  };
  let getNftDetail = () => {
    getSingleNFTDetail(nftId)
      .then((response) => {
        setNftDetail(response.data.data[0]);
        setProperties(response.data.data[0].properties);
        const keys = Object.keys(response.data.data[0].properties);
        setKeys(keys);
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
      });
  };
  const getDecodedJWT = () => {
    let jwtDecoded;
    const jwt = sessionStorage.getItem("Authorization");
    if (jwt) {
      jwtDecoded = jwtDecode(jwt);
    }
    setRole(jwtDecoded.role);
  };
  useEffect(() => {
    getNftDetail();
    getTradeHistoryDetail();
    getDecodedJWT();
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "active",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  return (
    <>
      <div className="backgroundDefault">
        <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">NFT Details</h3>
              <ul className="breadcrumb">
                <Link to={`/dashboard`}>
                  <li
                    className="breadcrumb-item slash"
                    style={{ color: "#777" }}
                  >
                    Dashboard
                  </li>
                </Link>
                <Link to={`/dashboard/myNFTs`}>
                  <li
                    className="breadcrumb-item slash"
                    style={{ color: "#777" }}
                  >
                    NFTs
                  </li>
                </Link>
                <li className="breadcrumb-item active">NFT Details</li>
              </ul>
            </div>
          </div>
        </div>
        {props.isStripeLogin ? null : (
          <StripeAccountMessageCard
            getOnboardingLink={props.getOnboardingLink}
            setIsStripeLogin={props.setIsStripeLogin}
          />
        )}
        <ThemeProvider theme={makeTheme}>
          <div className="card-body p-0">
            {role === "user" ? (
              <div
                className="row"
                style={{ position: "sticky", top: "0", zIndex: "1000" }}
              >
                <div className="col-11">
                  <Button
                    sx={styles.buttons}
                    style={{
                      float: "right",
                      padding: "12px 10px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                    }}
                    // onClick={handleModalOpen}
                    onClick={() => setWorkProgressModalShow(true)}
                  >
                    {" "}
                    List for Sale
                  </Button>
                </div>
              </div>
            ) : null}
            <div className="row">
              <div className="col-md-12 col-lg-3">
                <NFTMediaCard nftDetail={nftDetail} classes={styles} />
              </div>
              <div className="col-md-12 col-lg-8 mt-3">
                <SingleNFTDetailCard
                  nftDetail={nftDetail}
                  supply={location.state.supply}
                />
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <div>
                    <PropertiesAccordian keys={keys} properties={properties} />
                  </div>
                </div>
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <div>
                    <TradeHistoryAccordian tradeHistory={tradeHistory} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NFTSale
            show={showModal}
            handleClose={handleModalClose}
            openSummaryModal={handleSummaryModalOpen}
            setWorkProgressModalShow={setWorkProgressModalShow}
            nftType={nftType}
            setNftType={setNftType}
            nftDetail={nftDetail}
            styles={styles}
            setCurrentTimeStamp={setCurrentTimeStamp}
            setStartTime={setStartTime}
            startTime={startTime}
            setStartTimeStamp={setStartTimeStamp}
            setEndTimeStamp={setEndTimeStamp}
            setEndTime={setEndTime}
            endTime={endTime}
          />
          <SummaryModal
            show={summaryModal}
            handleClose={handleSummaryModalClose}
          ></SummaryModal>
          <WorkInProgressModal
            show={workProgressModalShow}
            handleClose={() => setWorkProgressModalShow(false)}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default SingleNftDetail;
