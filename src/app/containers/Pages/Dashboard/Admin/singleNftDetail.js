import { ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import {
  getSingleNFTDetail,
  getTradeHistory,
} from "../../../../components/API/AxiosInterceptor";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import SingleNFTDetailCard from "../../../../components/Cards/SingleNFTDetailCard";
import TradeHistoryAccordian from "../../../../components/Accordian/TradeHistoryAccordian";
import NFTSale from "../../../../components/Modals/NFTSale";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import SummaryModal from "../../../../components/Modals/SummaryModal";

const styles = {
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
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
  const { nftId } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [properties, setProperties] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [nftType, setNftType] = useState("1155");
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
  const [summaryModal,setSummaryModal]= useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeStamp, setStartTimeStamp] = useState(
    Math.round(startTime.getTime() / 1000)
  );
  const [endTimeStamp, setEndTimeStamp] = useState(
    Math.round(endTime.getTime() / 1000)
  );
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const handleSummaryModalClose = () => {
    setSummaryModal(false)
    setShowModal(true)
  };
  const handleSummaryModalOpen = () => {
    setSummaryModal(true)
    setShowModal(false)

  }
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

  useEffect(() => {
    getNftDetail();
    getTradeHistoryDetail();
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

        <ThemeProvider theme={makeTheme}>
          <div className="card-body p-0">
            <div
              className="row"
              style={{ position: "sticky", top: "0", zIndex: "1000" }}
            >
              <div className="col-11">
                <Button
                  style={{
                    float: "right",
                    padding: "12px 10px",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                  }}
                  onClick={handleModalOpen}
                >
                  {" "}
                  List for Sale
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-3">
                <NFTMediaCard nftDetail={nftDetail} classes={styles} />
              </div>
              <div className="col-md-12 col-lg-8 mt-3">
                <SingleNFTDetailCard nftDetail={nftDetail} />
                <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <Col>
                    <PropertiesAccordian keys={keys} properties={properties} />
                  </Col>
                </Row>
                <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <Col>
                    <TradeHistoryAccordian tradeHistory={tradeHistory} />
                  </Col>
                </Row>
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
          <SummaryModal show={summaryModal} handleClose={handleSummaryModalClose}></SummaryModal>
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
