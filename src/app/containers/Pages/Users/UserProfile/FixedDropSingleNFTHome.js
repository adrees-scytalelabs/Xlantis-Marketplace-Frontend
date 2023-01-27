// REACT
import React, { useEffect, useState } from "react";
// REACT ROUTER
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
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
      // content: {
      //     borderBottom: "1px solid white",
      //     paddingBottom: "12px"
      // },
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
    // MuiIconButton: {
    //     root: {
    //         padding: 0
    //     },
    //     label: {
    //         borderBottom: "1px solid white",
    //         padding: "12px",
    //     }
    // }
  },
});

// COMPONENT FUNCTION
const FixedDropSingleNFTHome = () => {
  // Sates
  const [nftData, setNftData] = useState();
  const [bidableDrop, setBidableDrop] = useState();
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

  // Variables
  const { singleNFTid } = useParams();

  // Handlers
  const handleGoBack = () => {
    history.push(`/fixdropnft/${dropID}`);
  };

  let handleChangeBiddingValue = (event) => {
    if (event.target.value >= 0) {
      setBiddingValue(event.target.value);
    }
  };

  //   let handleBidSubmit = async (event) => {
  //     event.preventDefault();

  //     //conditions checking
  //     console.log("Bid Expiry Timestamp: ", bidExpiryTimeStamp);
  //     console.log("Drop Expiry Timestamp: ", dropExpiryTimeStamp);
  //     console.log("Bid Expiry Time: ", bidExpiryTime);
  //     console.log("Drop Expiry Time: ", dropExpiryTime);

  //     if(bidExpiryTimeStamp > dropExpiryTimeStamp || new Date(bidExpiryTime) > new Date(dropExpiryTime)) {
  //         let variant = 'error';
  //         enqueueSnackbar("Bid Expiry Time cannot be more than Drop's Expiry Time.", { variant });
  //     }
  //     if (biddingValue === 0) {
  //         let variant = "error";
  //         enqueueSnackbar("Bidding Value cannot be zero.", { variant });
  //     }
  //     else {
  //         await loadWeb3();
  //         const web3 = window.web3
  //         const accounts = await web3.eth.getAccounts();
  //         console.log("Accounts[0]: ", accounts[[0]]);
  //         const network = await web3.eth.net.getNetworkType()
  //         if (network !== 'private') {
  //             setNetwork(network);
  //             handleShow();
  //         }
  //         else {
  //             handleShowBackdrop();
  //             await giveAuctionErc20Approval();

  //             //put condition here if badding value is higher than max bid or if there is first bid then it should be higher than floor value
  //             let bidData = {
  //                 nftId: nftDetail._id,
  //                 bidAmount: biddingValue.toString(),
  //                 bidderAddress: accounts[0],
  //                 expiryTime: bidExpiryTime
  //             }

  //             console.log("Type of time: ", typeof(bidExpiryTime), bidExpiryTime);
  //             console.log("Bid data: ", bidData);

  //             let dropIdHash = getHash(dropIdObj);
  //             let nftId = nftBlockChainId;
  //             let bidValue = web3.utils.toWei(biddingValue, 'ether');

  //             console.log("NFT id type: ", typeof(nftId));
  //             console.log("Bid Value type: ", typeof(bidValue), bidValue);
  //             console.log("Drop Id Hash: ", dropIdHash);

  //             let contractAddress;
  //             let contractAbi;

  //             if (contractType === '1155') {
  //                 contractAddress = Addresses.AuctionDropFactory1155;
  //                 contractAbi = AuctionDropFactory1155ABI;
  //                 console.log("hello", contractAddress, contractType);
  //             }
  //             else if (contractType === '721') {
  //                 contractAddress = Addresses.AuctionDropFactory721;
  //                 contractAbi = AuctionDropFactory721ABI;
  //             }

  //             let myContractInstance = await new web3.eth.Contract(contractAbi, contractAddress);
  //             let trxHash;

  //             axios.post(`/${versionB}/auction/bid`, bidData).then(
  //                 (response) => {
  //                     console.log("Response from sending bid data to backend: ", response);
  //                     let bidIdHash = getHash(response.data.bidId);
  //                     let bidId = response.data.bidId;

  //                     //sending call on blockchain

  //                     console.log("Bid data for blockchain: ");
  //                     console.log("drop id hash: ", dropIdHash);
  //                     console.log("bid id hash: ", bidIdHash);
  //                     console.log("nft address: ", location.state.nftContractAddress);
  //                     console.log("nft id: ", nftId);
  //                     console.log("bid Value: ", bidValue);

  //                     myContractInstance.methods.bid(dropIdHash, bidIdHash, location.state.nftContractAddress, nftId, bidValue).send({ from: accounts[0] }, (err, response) => {
  //                         console.log('get transaction: ', err, response);
  //                         if (err !== null) {
  //                             console.log('err: ', err);
  //                             handleCloseBackdrop();
  //                         }
  //                         trxHash = response;

  //                     })
  //                     .on('receipt', (receipt) => {
  //                         console.log('receipt: ', receipt);

  //                         //sending finalize call on backend
  //                         let finalizeBidData = {
  //                             "bidId": bidId,
  //                             "txHash": trxHash
  //                         }

  //                         axios.put(`/${versionB}/auction/bid/finalize`, finalizeBidData).then(
  //                             (response) => {
  //                                 console.log("Response from finalize bid: ", response);
  //                             },
  //                             (err) => {
  //                                 console.log("Err from finalize bid: ", err);
  //                                 console.log("Err response from finalize bid: ", err);
  //                             }
  //                         )
  //                         handleCloseBackdrop();
  //                     });
  //                 },
  //                 (error) => {
  //                     console.log("Error from sending bid data to backend: ", error);
  //                     handleCloseBackdrop();
  //                 }
  //             )
  //         }
  //     }
  // }

  const version = Cookies.get("Version");

  const getNFTDetails = () => {
    axios.get(`/${version}/drop/nft/${singleNFTid}`).then(
      (res) => {
        console.log("finding the price: ... ", res);
        setNftData(res.data.data[0]);
        setNftProperties(Object.entries(res.data.data[0].properties));
      },
      (err) => console.log("Drop could not be get: ", err.response)
    );
  };

  let getBidableDrops = () => {
    let version = Cookies.get("Version");
    axios.get(`/${version}/drop/${dropID}`).then(
      (res) => {
        setBidableDrop(res.data.dropData);
      },
      (err) => {
        console.log("could not get bidable drops ", err.response);
      }
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    getNFTDetails();
    getBidableDrops();
    let priceCal = Web3.utils.fromWei(location.state.price, "ether");
    setPrice(priceCal);

    return () => {
      controller.abort();
    };
  }, []);

  if (bidableDrop !== undefined) {
    console.log("bidding response: ... ", bidableDrop);
  }

  // jsx
  return (
    <>
      {/* Header */}
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} />
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
                  {bidableDrop?.saleType !== "auction" ? (
                    <div className="row no-gutters">
                      {nftData.isMinted === false &&
                      nftData.isOnSale === true ? (
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                          <button
                            className="bidBtn w-100"
                            type="button"
                            // onClick={(e) => handleBuy(e)}
                            onClick={() => console.log("clicked!")}
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
                            className="bidBtn w-100"
                            type="button"
                            data-tip
                            data-for="registerTip"
                            disabled
                            // onClick={(e) => handleBuy(e)}
                            onClick={(e) => console.log(e)}
                          >
                            Buy
                          </button>
                          {/* {nftData.isMinted  ===
                    true ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        NFT Is Sold
                      </ReactTooltip>
                    ) : nftData.isOnSale === false && nftData.isMinted  ===
                    false ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid" style={{color: "white"}}>
                        Sale Has Not Started Yet
                      </ReactTooltip>
                    ) : new Date() > new Date(location.state.endTime) ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        Sale Has Ended
                      </ReactTooltip>
                    ) : null} */}
                        </div>
                      )}
                    </div>
                  ) : bidableDrop?.saleType === "auction" ? (
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
    </>
  );
};

export default FixedDropSingleNFTHome;
