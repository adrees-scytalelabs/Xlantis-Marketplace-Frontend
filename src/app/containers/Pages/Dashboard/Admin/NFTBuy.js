import { Paper, ThemeProvider, createTheme } from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import Web3 from "web3";
import {
  getBuyNFTTxCostSummarySSO,
  marketplaceBuyVersioned,
} from "../../../../components/API/AxiosInterceptor";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AuctionNFTDetailCard from "../../../../components/Cards/AuctionNFTCards/AuctionNFTDetailCard";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
};

const customTheme = createTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "#000",
      },
      expandIcon: {
        color: "white",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "8px 0px 16px",
        backgroundColor: "#000",
      },
    },
    MuiOutlinedInput: {
      input: {
        border: "1px solid white",
        color: "white",
        borderRadius: "5px",
        padding: "16px 14px",
      },
    },
  },
});

const NFTBuy = (props) => {
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState({});
  const [properties, setProperties] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [price, setPrice] = useState();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [versionB, setVersionB] = useState("");
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();

  const handleOpenModal = async (e) => {
    const dropId = nftDetail.dropId;
    const nftId = nftDetail._id;
    getBuyNFTTxCostSummarySSO(dropId, nftId)
      .then((response) => {
        setData(response.data.data);
        setMOdalOpen(true);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
      });
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);
  let loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412",
    environment: "STAGING",
    cryptoCurrencyCode: "MATIC",
    network: "private",
    defaultNetwork: "polygon",
    walletAddress: "0xE66a70d89D44754f726A4B463975d1F624530111",
    fiatAmount: 1100,
    isAutoFillUserData: true,
    themeColor: "000000",
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };


  function openTransak() {
    handleCloseModal();
    const transak = new transakSDK(settings);

    transak.init();
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      console.log(eventData);
      transak.close();
      handleOpenModal();
    });
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      window.alert("Payment Success");
      transak.close();
      handleOpenModal();
    });
  }
  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    setNftDetail(location.state.nftDetail);
    setPrice(location.state.nftDetail.currentOrderListingId.price);
    setKeys(Object.keys(location.state.nftDetail.properties));
    setProperties(location.state.nftDetail.properties);

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "active",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  function SSOBuy() {
    console.log("SSO BUY");
    console.log("Nft detail: ", nftDetail);
    console.log("Price", nftDetail);
    console.log("Nft detail id: ", nftDetail.collectionId._id);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftDetail.dropId,
      nftId: nftDetail._id,
    };
    handleCloseModal();
    marketplaceBuyVersioned(versionB, data)
      .then((response) => {
        console.log("nft buy response", response.data);
        let variant = "success";
        setSnackbarMessage("NFT Bought Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";

          setSnackbarMessage("Unable To Buy NFT.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          handleCloseBackdrop();
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload();
          }
        }
      });
  }
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">MarketPlace</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/${props.domain}/marketPlace`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place
                </li>
              </Link>
              <Link
                to={`/dashboard/${props.domain}/marketPlace/drops/nfts`}
                state={{
                  nftId: location.state.nftId,
                  dropId: location.state.dropId,
                  startTime: location.state.startTime,
                  endTime: location.state.endTime,
                  saleType: location.state.saleType,
                  bannerURL: location.state.bannerURL,
                  titleURL: location.state.titleURL,
                }}
              >
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  MarketPlace Drops
                </li>
              </Link>
              <li className="breadcrumb-item active">Buy Details</li>
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
      <ThemeProvider theme={customTheme}>
        <div className="card-body px-0">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <Paper elevation={5}>
                <NFTMediaCard nftDetail={nftDetail} classes={styles} />
              </Paper>
            </div>
            <div className="col-md-12 col-lg-8">
              <AuctionNFTDetailCard nftDetail={nftDetail} price={price} />
              <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Col>
                  <PropertiesAccordian
                    keys={Object.keys(location.state.nftDetail.properties)}
                    properties={location.state.nftDetail.properties}
                  />
                </Col>
              </Row>
              <br></br>
              {/* <BuyButton
                isSold={location.state.nftDetail.currentOrderListingId.isSold}
                startTime={location.state.startTime}
                endTime={location.state.endTime}
                versionB={versionB}
                handleOpenModal={handleOpenModal}
                handleBuy={handleBuy}
              /> */}
            </div>
          </div>
        </div>
      </ThemeProvider>
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <BuyTxModal
        handleClose={handleCloseModal}
        open={modalOpen}
        handleBuy={SSOBuy}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
      <CircularBackdrop open={open} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default NFTBuy;
