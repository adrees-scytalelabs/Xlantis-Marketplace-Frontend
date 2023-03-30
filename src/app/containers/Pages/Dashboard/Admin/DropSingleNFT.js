import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
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
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import Web3 from "web3";
import DropFactory from "../../../../components/blockchain/Abis/DropFactory.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import { useSnackbar } from "notistack";
import abiAuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import abiAuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import Countdown from "react-countdown";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AcceptBidTxModal from "../../../../components/Modals/AcceptBidTxModal";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import transakSDK from "@transak/transak-sdk";

import Cookies from "js-cookie";
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  noMaxWidth: {
    maxWidth: "none",
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

const DropSingleNFT = (props) => {
  let location = useLocation();
  const classes = useStyles();
  const { nftId } = useParams();
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [properties, setProperties] = useState([]);
  const [keys, setKeys] = useState([]);
  let [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [show, setShow] = useState(false);
  let [bidDetail, setBidDetail] = useState([]);
  let [isHovering, setIsHovering] = useState(false);
  let [contractType, setContractType] = useState("");
  let [versionB, setVersionB] = useState("");
  let [bidId, setBidId] = useState();

  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();
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
  const handleCloseModalTx = () => {
    setMOdalOpen(false);
  };

  const handleOpenModal = async (e, bidId) => {
    setBidId(bidId);
    console.log("NFTDETAIL", nftDetail);
    axios.get(`/auction/bid/accept/tx-cost-summary`).then(
      (response) => {
        console.log("response", response);
        console.log("responeee", response.data.data);
        setData(response.data.data);
        setMOdalOpen(true);

        // data.collections.noOfTxs = response.data.collectionTxSummary.txsCount;
        // data.collections.totalCollectionsToCreate = response.data.collectionTxSummary.collectionCount;
        // data.nfts.noOfTxs = response.data.NFTsTxSummary.txsCount;
        // data.nfts.totalNftsToMint = response.data.NFTsTxSummary.NFTCount;
        // data.approval.noOfTxs = response.data.approvalTxSummary.txsCount;
        // data.drop.noOfTxs = response.data.dropTxSummary.txsCount;
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

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  let handleBuy = async () => {
    // setNftDetail(nftObject);
    console.log("Nft detail: ", nftDetail);
    // setNftDetail(nftDetail);
    // console.log("Nft detail id: ", nftDetail.collectionId._id);
    let dropIdHex = getHash(nftDetail.dropId);
    console.log(dropIdHex);
    setOpenDialog(false);
    setIsSaving(true);
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
      const addressDropFactory = Addresses.FactoryDrop;
      const abiDropFactory = DropFactory;

      var myContractInstance = await new web3.eth.Contract(
        abiDropFactory,
        addressDropFactory
      );
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .executeOrder(
          dropIdHex,
          nftDetail.collectionId.nftContractAddress,
          nftDetail.nftId,
          nftDetail.tokenSupply,
          nftDetail.currentMarketplaceId.price
        )
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);
          let data = {
            dropId: nftDetail.dropId,
            nftId: nftDetail._id,
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
        });
    }
  };

  let getBidList = (nftId) => {
    let version = Cookies.get("Version");
    axios.get(`/auction/bids/${nftId}/${0}/${1000}`).then(
      (response) => {
        console.log("Response from getting bid: ", response);
        console.log("Bid array: ", response.data.data);
        setBidDetail(response.data.data);
      },
      (err) => {
        console.log("Error from getting bids: ", err);
        console.log("Error response from getting bids: ", err);
        setBidDetail([]);
      }
    );
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    // getNftDetail();
    // console.log("hehe",location.state.nftDetail);
    setNftDetail(location.state.nftDetail);
    console.log("NFT detail: ", location.state.nftDetail);
    setContractType(location.state.nftDetail.collectionId.contractType);
    setKeys(Object.keys(location.state.nftDetail.properties));
    setProperties(location.state.nftDetail.properties);
    if (location.state.saleType === "auction") {
      getBidList(location.state.nftDetail._id);
    }
    console.log("saleType", location.state.saleType);

    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myCubes: "",
      myDrops: "active",
      settings: "",
      mySeason: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
      marketPlace: "",
    });
  }, []);

  let handleCloseModal = () => {
    setShow(false);
  };

  let handleAcceptBid = async (e, bidIdd) => {
    e.preventDefault();
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetworkModal();
    } else {
      // if (contractType === "1155"){
      //sending call on blockchain
      let abiAuctionFactory;
      let addressAuctionFactory;

      if (contractType === "1155") {
        abiAuctionFactory = abiAuctionDropFactory1155;
        addressAuctionFactory = Addresses.AuctionDropFactory1155;
      } else if (contractType === "721") {
        abiAuctionFactory = abiAuctionDropFactory721;
        addressAuctionFactory = Addresses.AuctionDropFactory721;
      }

      //getting data to send call
      let dropIdHash = getHash(nftDetail.dropId);
      let nftAddress = nftDetail.collectionId.nftContractAddress; //to be confirmed to send request
      let tokenId = nftDetail.nftId;
      let uri = nftDetail.nftURI;
      let signature = nftDetail.voucherSignature;
      let bidIdHash = getHash(bidIdd); //get bid object id and get hash to send to blockchain
      let trxHash;

      let myContractInstance = await new web3.eth.Contract(
        abiAuctionFactory,
        addressAuctionFactory
      );
      console.log("My auction drop factory instance: ", myContractInstance);

      //Call for auction drop factory 1155
      if (contractType === "1155") {
        await myContractInstance.methods
          .acceptBid(dropIdHash, nftAddress, tokenId, bidIdHash)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get Transaction: ", err, response);

            if (err !== null) {
              console.log("Err: ", err);
            }
            trxHash = response;
          })
          .on("receipt", (receipt) => {
            console.log("receipt: ", receipt);
          });
      }
      //Call for auction drop factory 721
      else if (contractType === "721") {
        await myContractInstance.methods
          .acceptBidLazyMint(
            dropIdHash,
            nftAddress,
            tokenId,
            uri,
            bidIdHash,
            signature
          )
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get Transaction: ", err, response);

            if (err !== null) {
              console.log("Err: ", err);
            }
            trxHash = response;
          })
          .on("receipt", (receipt) => {
            console.log("receipt: ", receipt);
          });
      }

      //sending call on backend to update data

      let data = {
        bidId: bidIdd,
        txHash: trxHash,
      };

      axios.post(`/auction/bid/accept`, data).then(
        (response) => {
          console.log("response", response);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );

      // }
      // else if (contractType === "721") {
      //     //sending call on backend to update data

      //     let data = {
      //         "bidId": bidId
      //     }

      //     axios.post("/auction/bid/accept", data).then(
      //         (response) => {
      //             console.log("response", response);
      //         },
      //         (error) => {
      //             console.log("Error: ", error);
      //         }
      //     )
      // }
    }
  };

  let handleAcceptBidSSO = async (e) => {
    e.preventDefault();

    handleShowBackdrop();
    let data = {
      bidId: bidId,
    };
    handleCloseModal();
    axios.post(`/auction/bid/accept`, data).then(
      (response) => {
        console.log("nft bid response", response.data);
        let variant = "success";
        enqueueSnackbar("Bid Accepted Successfully", { variant });
        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Unable To Accept Bid On NFT.", { variant });
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
      }
    );
  };

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">NFT</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/myDrops`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  My Drops
                </li>
              </Link>
              <Link
                to={{
                  pathname: `/dashboard/myDrops/nfts`,
                  state: {
                    nftId: location.state.nftId,
                    dropId: location.state.dropId,
                    saleType: location.state.saleType,
                    status: location.state.status,
                  },
                }}
              >
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Drop Nfts
                </li>
              </Link>
              <li className="breadcrumb-item active">NFT Detail</li>
            </ul>
          </div>
        </div>
      </div>
      <ThemeProvider theme={customTheme}>
        <div className="card-body px-0">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <Paper elevation={5}>
                <Card className={classes.root}>
                  <div>
                    {nftDetail.nftFormat === "glb" ||
                    nftDetail.nftFormat === "gltf" ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            margin: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <GLTFModel
                            src={nftDetail.nftURI}
                            width={250}
                            height={250}
                          >
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            {/* <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} /> */}
                            <DirectionLight
                              color={0xffffff}
                              position={{ x: 100, y: 200, z: 100 }}
                            />
                            <DirectionLight
                              color={0xffffff}
                              position={{ x: 50, y: 200, z: 100 }}
                            />
                            <DirectionLight
                              color={0xffffff}
                              position={{ x: 0, y: 0, z: 0 }}
                            />
                            <DirectionLight
                              color={0xffffff}
                              position={{ x: 0, y: 100, z: 200 }}
                            />
                            <DirectionLight
                              color={0xffffff}
                              position={{ x: -100, y: 200, z: -100 }}
                            />
                          </GLTFModel>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <CardMedia
                            className={classes.media}
                            title="NFT Artwork"
                            image={nftDetail.previewImageURI}
                          ></CardMedia>
                        </div>
                      </div>
                    ) : nftDetail.nftFormat === "mp3" ? (
                      <div>
                        <CardMedia
                          className={classes.media}
                          title="NFT Artwork"
                          image={
                            nftDetail.previewImageURI
                              ? nftDetail.previewImageURI
                              : nftDetail.nftURI
                          }
                        ></CardMedia>
                        <div>
                          <AudioPlayer
                            // style={{ width: "300px" }}
                            style={{ borderRadius: "1rem" }}
                            autoPlay={false}
                            layout="horizontal"
                            src={nftDetail.nftURI}
                            onPlay={(e) => console.log("onPlay")}
                            showSkipControls={false}
                            showJumpControls={false}
                            // header={`Now playing: ${name}`}
                            showDownloadProgress
                            // onClickPrevious={handleClickPrevious}
                            // onClickNext={handleClickNext}
                            // onEnded={handleClickNext}
                            // other props here
                          />
                        </div>
                      </div>
                    ) : (
                      <CardMedia
                        className={classes.media}
                        title="NFT Artwork"
                        image={nftDetail.nftURI}
                      ></CardMedia>
                    )}
                  </div>
                </Card>
              </Paper>
            </div>
            <div className="col-md-12 col-lg-8">
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
                    <Col style={{ color: "white", fontFamily: "inter" }}>
                      {nftDetail.title}
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
                    <Col style={{ color: "white", fontFamily: "inter" }}>
                      {nftDetail.description}
                    </Col>
                  </Row>
                  {/* <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Rarity </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row> */}
                  {/* <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Supply Type </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.supplyType}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Token Supply </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.tokenSupply}
                                    </Col>
                                </Row> */}
                </CardContent>
              </Card>
              <Row style={{ marginTop: "5px" }}>
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
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {keys?.map((j, index) => (
                            <tr key={index}>
                              <td>{j}</td>
                              <td>{properties[j]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Col>
              </Row>
              {location.state.saleType === "auction" ? (
                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          variant="body1"
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          <ListIcon />
                          <strong> Offers</strong>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table striped hover bordered size="sm" responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Bidder</th>
                              <th>Bid</th>
                              <th>Expiration</th>
                              <th colSpan={2}></th>
                              {/* <th>
                                                            <button className="btn" onClick={props.acceptBid}>
                                                                Accept
                                                            </button>
                                                        </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {bidDetail?.map((bid, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <Tooltip
                                    classes={{ tooltip: classes.noMaxWidth }}
                                    leaveDelay={1500}
                                    title={bid.bidderAddress}
                                    arrow
                                  >
                                    <span>
                                      {bid.bidderAddress.slice(0, 8)}...
                                    </span>
                                  </Tooltip>
                                </td>
                                <td>{bid.bidAmount}</td>
                                <td>
                                  {bid.isAccepted ? (
                                    <span>Accepted</span>
                                  ) : new Date() > new Date(bid.expiryTime) ? (
                                    <span>Expired</span>
                                  ) : (
                                    <Countdown
                                      daysInHour
                                      date={new Date(bid.expiryTime)}
                                    ></Countdown>
                                  )}
                                </td>
                                <td>
                                  {new Date() > new Date(bid.expiryTime) ? (
                                    <button className="btn" disabled>
                                      Accept
                                    </button>
                                  ) : bid.isAccepted ||
                                    location.state.nftDetail
                                      .currentMarketplaceId.isSold ? (
                                    <button className="btn" disabled>
                                      Accept
                                    </button>
                                  ) : (
                                    <button
                                      className="btn"
                                      onClick={(e) => {
                                        versionB === "v1-sso"
                                          ? handleOpenModal(e, bid._id)
                                          : handleAcceptBid(e, bid._id);
                                      }}
                                    >
                                      Accept
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  </Col>
                </Row>
              ) : null}
            </div>
          </div>
        </div>
      </ThemeProvider>
      <AcceptBidTxModal
        handleClose={handleCloseModalTx}
        open={modalOpen}
        handleAcceptBid={handleAcceptBidSSO}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
    </div>
  );
};

export default DropSingleNFT;
