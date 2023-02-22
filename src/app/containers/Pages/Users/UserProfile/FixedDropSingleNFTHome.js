// REACT
import React, { useEffect, useState } from "react";
// REACT ROUTER
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import transakSDK from "@transak/transak-sdk";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";

import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import Collectible721 from "../../../../components/blockchain/Abis/Collectible721.json";

import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import { useSnackbar } from "notistack";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ReactTooltip from "react-tooltip";


// MUI
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import { Col, Row, Table } from "react-bootstrap";
// COMPONENTS
import HeaderHome from "../../../../components/Headers/Header";
import Web3 from "web3";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import DateTimePicker from "react-datetime-picker";
import ListIcon from "@material-ui/icons/List";
import Footer from "../../../../components/Footers/Footer";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 1,
    marginTop: "8px",
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "black",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  card: {
    minWidth: 250,
  },
  media1: {
    height: 300,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const customTheme = createMuiTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "black",
      },
      expandIcon: {
        color: "white",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "8px 0px 16px",
        backgroundColor: "black",
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
    MuiCardContent: {
      root: {
        padding: "16px 0px",
      },
    },
  },
});

// COMPONENT FUNCTION
const FixedDropSingleNFTHome = () => {
  // Sates
  const [nftData, setNftData] = useState();
  const [theDrop, setTheDrop] = useState();
  const [biddingValue, setBiddingValue] = useState(0);
  const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
  const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(
    Math.round(bidExpiryTime.getTime() / 1000)
  );
  const [price, setPrice] = useState();
  const [nftProperties, setNftProperties] = useState([]);
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();
  let dropID = location.state.dropId;
  const saleType = location.state.saleType;
  const description = location.state.description;
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  let [versionB, setVersionB] = useState("");
  let account = sessionStorage.getItem("Authorization");


  console.log(dropID, " /// dropID")
  console.log(account, " /// JWT")

  // Variables
  const { singleNFTid } = useParams();
  console.log(singleNFTid, " /// NFT ID")

  // Handlers
  const handleGoBack = () => {
    history.push({
      pathname: `/fixdropnft/${dropID}`,
      state: { saleType: saleType, description: description },
    });
  };

  let handleChangeBiddingValue = (event) => {
    if (event.target.value >= 0) {
      setBiddingValue(event.target.value);
    }
  };

  function openTransak() {
    handleCloseModal();
    const transak = new transakSDK(settings);


    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);

    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      console.log(eventData);
      transak.close();
      handleOpenModal();

    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      window.alert("Payment Success");
      transak.close();
      handleOpenModal();

    });
  }
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


  const handleOpenModal = async (e) => {
    const dropId = nftData.dropId;
    const nftId = nftData._id;
    console.log("NFTDETAIL", nftData);
    axios.get(`v1-sso/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`).then(
      (response) => {
        console.log("response", response);
        console.log("responeee", response.data.data.data[0]);
        setData(response.data.data);
        setMOdalOpen(true);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            // setMsg(error.response.data.message);
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
        } else {
          // setMsg("Unknown Error Occured, try again.");
        }
        // setIsLoading(false);
      }
    );
  };

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    cryptoCurrencyCode: "MATIC",
    network: "private",
    defaultNetwork: "polygon",
    walletAddress: "0xE66a70d89D44754f726A4B463975d1F624530111",
    fiatAmount: 1100,
    isAutoFillUserData: true,
    themeColor: "000000", // App theme color
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  let handleBuy = async () => {
    console.log("Nft detail: ", nftData);
    console.log("Price", nftData);
    console.log("INSIDE BUY FUNCTION");
    let dropIdHex = getHash(nftData.dropId);
    console.log(dropIdHex);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetworkModal();
    } else {
      handleShowBackdrop();

      const addressDropFactory721 = Addresses.FactoryDrop721;
      const abiDropFactory721 = DropFactory721;
      const addressDropFactory1155 = Addresses.FactoryDrop1155;
      const abiDropFactory1155 = DropFactory1155;
      const addressERC20 = Addresses.ERC20SaleDrop;
      const abiERC20 = ERC20SaleDrop;
      let addressApprove;
      if (nftData.collectionId.contractType === "1155") {
        console.log("IN 1155");
        addressApprove = addressDropFactory1155;
      } else if (nftData.collectionId.contractType === "721") {
        console.log("IN 721");
        addressApprove = addressDropFactory721;
      }

      var erc20Instance = await new web3.eth.Contract(abiERC20, addressERC20);
      let userBalance = await erc20Instance.methods
        .balanceOf(accounts[0])
        .call();
      console.log(userBalance);
      if (userBalance < nftData.currentMarketplaceId.price) {
        let variant = "error";
        enqueueSnackbar("User have insufficient funds to buy this NFT", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        erc20Instance.methods
          .approve(addressApprove, nftData.currentMarketplaceId.price)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
          })
          .on("receipt", async (receipt) => {
            console.log("approval receipt", receipt);
            if (nftData.collectionId.contractType === "1155") {
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory1155,
                addressDropFactory1155
              );
              console.log("myContractInstance", myContractInstance);
              await myContractInstance.methods
                .executeOrder(
                  dropIdHex,
                  nftData.collectionId.nftContractAddress,
                  nftData.nftId,
                  nftData.tokenSupply,
                  nftData.currentMarketplaceId.price
                )
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("get transaction", err, response);
                  let data = {
                    dropId: nftData.dropId,
                    nftId: nftData._id,
                    txHash: response,
                  };

                  console.log("data", data);
                  axios.post(`/${versionB}/marketplace/buy`, data).then(
                    (response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    },
                    (error) => {
                      console.log(
                        "Transaction hash on backend error: ",
                        error.response
                      );
                    }
                  );

                  if (err !== null) {
                    console.log("err", err);
                    let variant = "error";
                    enqueueSnackbar("User Canceled Transaction", { variant });
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt", receipt);
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            } else if (nftData.collectionId.contractType === "721") {
              console.log("LAZY MINTING");
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory721,
                addressDropFactory721
              );
              console.log("myContractInstance Drop 721", myContractInstance);
              await myContractInstance.methods
                .executeOrderLazyMint(
                  dropIdHex,
                  nftData.collectionId.nftContractAddress,
                  nftData.nftId,
                  nftData.nftURI,
                  nftData.currentMarketplaceId.price,
                  nftData.voucherSignature
                )
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("get transaction", err, response);
                  let data = {
                    dropId: nftData.dropId,
                    nftId: nftData._id,
                    txHash: response,
                  };

                  console.log("data", data);
                  axios.post(`/${versionB}/marketplace/buy`, data).then(
                    (response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    },
                    (error) => {
                      console.log(
                        "Transaction hash on backend error: ",
                        error.response
                      );
                    }
                  );

                  if (err !== null) {
                    console.log("err", err);
                    let variant = "error";
                    enqueueSnackbar("User Canceled Transaction", { variant });
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt lazy mint", receipt);
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            }
          });
      }
    }
  };



  function SSOBuy() {
    console.log("SSO BUY");
    // setnftData(nftObject);
    console.log("Nft detail: ", nftData);
    console.log("Price", nftData);
    // setnftData(nftData);
    console.log("Nft detail id: ", nftData.collectionId._id)
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftData.dropId,
      nftId: nftData._id,
    };
    handleCloseModal();
    axios.post(`/${versionB}/marketplace/buy`, data).then(
      (response) => {

        console.log("nft buy response", response.data);
        let variant = "success";
        enqueueSnackbar("NFT BOUGHT SUCCESSFULLY", { variant });
        handleCloseBackdrop();

      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Unable To Buy NFT.", { variant });
          handleCloseBackdrop();
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            Cookies.remove("Version");

            sessionStorage.removeItem("Address");
            window.location.reload();
          }
        }
      })

  }

  const getNFTDetails = () => {
    let version = Cookies.get("Version");

    console.log(version, " /// version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/v1-sso/drop/nft/${singleNFTid}`
    }
    else {
      endpoint = `/${version}/drop/nft/${singleNFTid}`
    }
    axios.get(endpoint).then(
      (res) => {
        console.log(endpoint, " /// Endpoint for V2")
        console.log("finding the price: ... ", res);
        setNftData(res.data.data);
        // setNftProperties(Object.entries(res.data.data[0].properties));
      },
      (err) => console.log("Could not get NFT details: ", err.response)
    );
  };

  let getTheDrop = () => {
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/v1-sso/drop/${dropID}`
    }
    else {
      endpoint = `/${version}/drop/${dropID}`
    }
    axios.get(endpoint).then(
      (res) => {
        setTheDrop(res.data.dropData);
      },
      (err) => {
        console.log("could not get the drop ", err.response);
      }
    );
  };

  useEffect(() => {

    const controller = new AbortController();
    setVersionB(Cookies.get("Version"));
    getNFTDetails();
    getTheDrop();
    let priceCal = Web3.utils.fromWei(location.state.price, "ether");
    setPrice(priceCal);

    return () => {
      controller.abort();
    };
  }, []);

  if (theDrop !== undefined) {
    console.log("bidding response: ... ", theDrop);
  }

  if (nftData !== undefined) {
    console.log(nftData, " /// nftData")
  }

  // jsx
  return (
    <>
      {/* Header */}
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} role={null} />
      </div>
      <ThemeProvider theme={customTheme}>
        <div className="card-body px-0">
          {nftData ? (
            <>
              <div
                className="row no-gutters justify-content-end"
                style={{ padding: "1.5rem 1.5rem 0" }}
              >
                <div className="col-4 col-sm-3 col-md-2">
                  <button className="bidBtn w-100" onClick={handleGoBack}>
                    <ArrowBackIcon />
                    {"  "}
                    Back
                  </button>
                </div>
              </div>
              <div
                className="row no-gutters"
                style={{ minHeight: "76vh", padding: "1.5rem" }}
              >
                {/* NFT Image */}
                <div className="col-md-12 col-lg-4 pr-md-3">
                  <Paper elevation={5}>
                    <Card className={classes.root}>
                      <div style={{ marginTop: "20px" }}>
                        <CardMedia
                          className={classes.media}
                          title={nftData?.title}
                          image={nftData?.nftURI}
                        ></CardMedia>
                      </div>
                    </Card>
                  </Paper>
                </div>
                {/* NFT Details */}
                <div className="col-md-12 col-lg-8 pl-md-3">
                  {/* Details */}
                  <Card style={{ backgroundColor: "black" }}>
                    <CardContent>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>NFT Title </strong>
                          </Typography>
                        </Col>
                        <Col>
                          <Typography
                            variant="body1"
                            style={{
                              color: "white",
                              fontFamily: "inter",
                              fontSize: "1rem",
                            }}
                          >
                            {nftData.title}
                          </Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>NFT Description </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.description}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>Price </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {price} WMATIC
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{
                              color: "#F64D04",
                              fontFamily: "orbitron",
                            }}
                          >
                            <strong>Supply Type </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.supplyType ? nftData.supplyType : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{
                              color: "#F64D04",
                              fontFamily: "orbitron",
                            }}
                          >
                            <strong>Token Supply </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.tokenSupply}
                        </Col>
                      </Row>
                    </CardContent>
                  </Card>
                  {/* Porperties */}
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography
                            variant="body1"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <BlurLinear />
                            <strong> Properties</strong>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Key</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {nftProperties?.map((i, index) => (
                                <tr key={index}>
                                  <td>{i[0]}</td>
                                  <td>{i[1]}</td>
                                </tr>
                              ))}
                              {/* {keys?.map((j, index) => (
                          <tr key={index}>
                            <td>{j}</td>
                            <td>{properties[j]}</td>
                          </tr>
                        ))} */}
                            </tbody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <br></br>
                  {/* Buttons */}
                  {theDrop?.saleType !== "auction" ? (
                    <div className="row no-gutters" >
                      {account &&
                        nftData.isOnSale === true ? (
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                          <button
                            className="bidBtn w-100"
                            type="button"
                            // onClick={(e) => handleBuy(e)}
                            onClick={(e) => { versionB === "v1-sso" ? (handleOpenModal(e)) : (handleBuy(e)) }}
                          >
                            Buy
                          </button>
                        </div>
                      ) : (
                        <div
                          className="col-12 col-md-4 mt-2 mt-md-0"
                          data-tip
                          data-for="registerTip"
                        >
                          <button
                            className="bidBtn-disabled w-100"
                            type="button"
                            data-tip
                            data-for="registerTip"
                            disabled
                            // onClick={(e) => handleBuy(e)}
                            onClick={(e) => console.log(e)}
                          >
                            Buy
                          </button>
                          {!account ? (
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                              Please Login First!
                            </ReactTooltip>
                          ) : nftData?.currentMarketplaceId.isSold === true ? (
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                              NFT has been sold out
                            </ReactTooltip>
                          ) : nftData?.isOnSale === false ? (
                            <ReactTooltip id="registerTip" place="top" effect="solid" style={{ color: "white" }}>
                              Sale has ended
                            </ReactTooltip>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ) : theDrop.saleType === "auction" ? (
                    <div className="col-12">
                      <Row style={{ marginTop: "5px" }}>
                        <Col>
                          <form>
                            <label
                              style={{ color: "#F64D04", marginTop: "10px" }}
                            >
                              Set Bid Expiry Time
                            </label>
                            <div className="form-group">
                              <DateTimePicker
                                className="form-control"
                                onChange={(e) => {
                                  console.log(e);
                                  console.log(
                                    "e.getTime()",
                                    Math.round(e.getTime())
                                  );
                                  setBidExpiryTime(e);
                                  setBidExpiryTimeStamp(
                                    Number(Math.round(e.getTime()))
                                  );
                                }}
                                value={bidExpiryTime}
                                style={{
                                  color: "white",
                                  backgroundColor: "black",
                                }}
                              />
                            </div>
                            <label>Bidding value</label>
                            <div className="form-group">
                              <div className="row no-gutters align-items-center justify-content-md-between justify-content-center">
                                <div className="col-12 col-md">
                                  <TextField
                                    autoComplete="false"
                                    value={biddingValue}
                                    variant="outlined"
                                    type="number"
                                    color="secondary"
                                    onChange={(e) => {
                                      handleChangeBiddingValue(e);
                                    }}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <div className="col-12 col-md-4 col-xl-3 mt-3 mt-md-0 pl-md-2">
                                  <button
                                    className="bidBtn w-100 ml-0"
                                  // onClick={(e) => handleBidSubmit(e)}
                                  >
                                    Bid
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "5px" }}>
                        <Col>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography
                                variant="body1"
                                style={{ color: "#F64D04" }}
                              >
                                <ListIcon />
                                <strong> Offers</strong>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Table
                                striped
                                hover
                                bordered
                                size="sm"
                                responsive
                              >
                                <thead>
                                  <tr>
                                    <th style={{ padding: "0.75rem" }}>#</th>
                                    <th style={{ padding: "0.75rem" }}>
                                      Bidder
                                    </th>
                                    <th style={{ padding: "0.75rem" }}>Bid</th>
                                    {/* <th colSpan={2}></th> */}
                                    {/* <th>
                                                            <button className="btn" onClick={props.acceptBid}>
                                                                Accept
                                                            </button>
                                                        </th> */}
                                  </tr>
                                </thead>
                                {/* <tbody>
                                                    {bidDetail?.map((bid, index) => (
                                                        <tr key={index}>
                                                            <td style={{padding: "0.75rem"}}>{index+1}</td>
                                                            <td style={{padding: "0.75rem"}}>
                                                                <Tooltip title={bid.bidderAddress}>
                                                                    <span>{bid.bidderAddress.slice(0,6)}...</span>
                                                                </Tooltip>
                                                            </td>
                                                            <td style={{padding: "0.75rem"}}>{bid.bidAmount}</td>
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody> */}
                              </Table>
                            </AccordionDetails>
                          </Accordion>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : !nftData ? (
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-12">
                <WhiteSpinner />
              </div>
            </div>
          ) : (
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-12 text-center">
                <Card
                  variant="outlined"
                  style={{
                    padding: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                  }}
                >
                  <Typography
                    variant="body2"
                    className="text-center"
                    // color="textSecondary"
                    component="p"
                    style={{ color: "#fff" }}
                  >
                    <strong>No items to display </strong>
                  </Typography>
                </Card>
              </div>
              <div className="col-12 mt-4 text-center">
                <button
                  className="bidBtn"
                  onClick={handleGoBack}
                  style={{ width: "300px" }}
                >
                  <ArrowBackIcon />
                  {"  "}
                  Back
                </button>
              </div>
            </div>
          )}
          {/* FOOTER */}
          <div className="row no-gutters mt-4">
            <div className="col-12">
              <Footer />
            </div>
          </div>
        </div>
      </ThemeProvider>
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <BuyTxModal handleClose={handleCloseModal} open={modalOpen} handleBuy={SSOBuy} handlePay={openTransak} dropData={data} isOpen={modalOpen} />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FixedDropSingleNFTHome;