import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
} from "@material-ui/core";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import Web3 from "web3";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";

import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import Collectible721 from "../../../../components/blockchain/Abis/Collectible721.json";

import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import { useSnackbar } from "notistack";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ReactTooltip from "react-tooltip";
import AudioPlayer from "react-h5-audio-player";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import transakSDK from "@transak/transak-sdk";
import "react-h5-audio-player/lib/styles.css";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
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

const NFTBuy = (props) => {
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
  let [price, setPrice] = useState();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [versionB, setVersionB] = useState("");
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();

  const handleOpenModal = async (e) => {
    const dropId = nftDetail.dropId;
    const nftId = nftDetail._id;
    console.log("NFTDETAIL", nftDetail);
    axios.get(`v1-sso/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`).then(
      (response) => {
        console.log("response", response);
        console.log("responeee", response.data.data.data[0]);
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
    // setNftDetail(nftObject);
    console.log("Nft detail: ", nftDetail);
    console.log("Price", nftDetail);
    // setNftDetail(nftDetail);
    // console.log("Nft detail id: ", nftDetail.collectionId._id);
    let dropIdHex = getHash(nftDetail.dropId);
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
      if (nftDetail.collectionId.contractType === "1155") {
        console.log("IN 1155");
        addressApprove = addressDropFactory1155;
      } else if (nftDetail.collectionId.contractType === "721") {
        console.log("IN 721");
        addressApprove = addressDropFactory721;
      }

      var erc20Instance = await new web3.eth.Contract(abiERC20, addressERC20);
      let userBalance = await erc20Instance.methods
        .balanceOf(accounts[0])
        .call();
      console.log(userBalance);
      if (userBalance < nftDetail.currentMarketplaceId.price) {
        let variant = "error";
        enqueueSnackbar("User have insufficient funds to buy this NFT", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        erc20Instance.methods
          .approve(addressApprove, nftDetail.currentMarketplaceId.price)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
          })
          .on("receipt", async (receipt) => {
            console.log("approval receipt", receipt);
            if (nftDetail.collectionId.contractType === "1155") {
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory1155,
                addressDropFactory1155
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
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            } else if (nftDetail.collectionId.contractType === "721") {
              console.log("LAZY MINTING");
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory721,
                addressDropFactory721
              );
              console.log("myContractInstance Drop 721", myContractInstance);
              // let nftVoucher = {
              //     "tokenId" : nftDetail.nftId,
              //     "price" : nftDetail.currentMarketplaceId.price,
              //     "uri" : nftDetail.nftURI,
              //     "signature" : "signature"
              // }
              await myContractInstance.methods
                .executeOrderLazyMint(
                  dropIdHex,
                  nftDetail.collectionId.nftContractAddress,
                  nftDetail.nftId,
                  nftDetail.nftURI,
                  nftDetail.currentMarketplaceId.price,
                  nftDetail.voucherSignature
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
                  console.log("receipt lazy mint", receipt);
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            }
          });
      }

      function handleSSOBuy() {
        // setNftDetail(nftObject);
        console.log("Nft detail: ", nftDetail);
        console.log("Price", nftDetail);
        // setNftDetail(nftDetail);
        // console.log("Nft detail id: ", nftDetail.collectionId._id)
        // setOpenDialog(false);
        // setIsSaving(true);
        // handleShowBackdrop();

        // let data = {
        //   dropId: nftDetail.dropId,
        //   nftId: nftDetail._id,
        // };

        // axios.post(`/${versionB}/marketplace/buy`, data).then(
        //   (response) => {

        //     console.log("nft buy response", response.data);
        //     let variant = "success";
        //     enqueueSnackbar("Purchase Is Being Finalized. Transactions Are In Process", { variant });
        //     handleCloseModal();

        //   },
        //   (error) => {
        //     if (process.env.NODE_ENV === "development") {
        //       console.log(error);
        //       console.log(error.response);
        //       let variant = "error";
        //       enqueueSnackbar("Unable To Buy NFT.", { variant });
        //       handleCloseModal();
        //     }
        //     if (error.response.data !== undefined) {
        //       if (
        //         error.response.data === "Unauthorized access (invalid token) !!"
        //       ) {
        //         Cookies.remove("Authorization");
        //         localStorage.removeItem("Address");
        //         window.location.reload();
        //       }
        //     }
        // })
      }

      // await myContractInstance.methods.executeOrder(dropIdHex, nftDetail.collectionId.nftContractAddress, nftDetail.nftId, nftDetail.tokenSupply, nftDetail.currentMarketplaceId.price).send({from : accounts[0]}, (err, response) => {
      //     console.log('get transaction', err, response);
      //     let data = {
      //         dropId : nftDetail.dropId,
      //         nftId : nftDetail._id,
      //         txHash : response

      //     }

      //     console.log("data",data);
      //     axios.post(`/marketplace/buy`, data).then(
      //         (response) => {
      //             console.log("Transaction Hash sending on backend response: ", response);
      //         },
      //         (error) => {
      //             console.log("Transaction hash on backend error: ", error.response);
      //         }
      //     )

      //     if (err !== null) {
      //         console.log("err", err);
      //         let variant = "error";
      //         enqueueSnackbar('User Canceled Transaction', { variant });
      //         handleCloseBackdrop();
      //         setIsSaving(false);

      //     }

      // })
      // .on('receipt', (receipt) => {
      //     console.log("receipt", receipt);

      // })
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
  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    // getNftDetail();
    console.log("hehe", location.state.nftDetail);
    setNftDetail(location.state.nftDetail);
    console.log(location.state.nftDetail.currentMarketplaceId.isSold);
    console.log("states", location.state);
    let priceCal = Web3.utils.fromWei(
      location.state.nftDetail.currentMarketplaceId.price,
      "ether"
    );
    console.log("price is", priceCal);
    setPrice(priceCal);

    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myCubes: "",
      myDrops: "",
      settings: "",
      mySeason: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
      marketPlace: "active",
    });
  }, []);

  function SSOBuy() {
    console.log("SSO BUY");
    // setNftDetail(nftObject);
    console.log("Nft detail: ", nftDetail);
    console.log("Price", nftDetail);
    // setNftDetail(nftDetail);
    console.log("Nft detail id: ", nftDetail.collectionId._id);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftDetail.dropId,
      nftId: nftDetail._id,
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
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload();
          }
        }
      }
    );
  }

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
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
              <Link to={`/dashboard/marketPlace`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place
                </li>
              </Link>
              <Link
                to={{
                  pathname: `/dashboard/marketPlace/drops/nfts`,
                  state: {
                    nftId: location.state.nftId,
                    dropId: location.state.dropId
                  },
                }}
              >
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place Drops
                </li>
              </Link>
              <li className="breadcrumb-item active">Buy Details</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
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
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Rarity </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row> */}
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
                    <Col style={{ color: "white", fontFamily: "inter" }}>
                      {price} WMATIC
                    </Col>
                  </Row>

                  {nftDetail.nftType === "1155" ? (
                    <span>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>Supply Type </strong>
                          </Typography>
                        </Col>
                        <Col style={{ color: "white", fontFamily: "inter" }}>
                          {nftDetail.supplyType}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>Token Supply </strong>
                          </Typography>
                        </Col>
                        <Col style={{ color: "white", fontFamily: "inter" }}>
                          {nftDetail.tokenSupply}
                        </Col>
                      </Row>
                    </span>
                  ) : null}
                </CardContent>
              </Card>
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
              <br></br>
              {location.state.nftDetail.currentMarketplaceId.isSold === false &&
              new Date() >= new Date(location.state.startTime) &&
              new Date() < new Date(location.state.endTime) ? (
                <Row>
                  <Col
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        versionB === "v1-sso"
                          ? handleOpenModal(e)
                          : handleBuy(e);
                      }}
                      className="bidBtn"
                    >
                      Buy
                    </button>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div data-tip data-for="registerTip">
                      <button
                        type="button"
                        data-tip
                        data-for="registerTip"
                        disabled
                        onClick={(e) => handleBuy(e)}
                        className="bidBtn"
                      >
                        Buy
                      </button>
                      {location.state.nftDetail.currentMarketplaceId.isSold ===
                      true ? (
                        <ReactTooltip
                          id="registerTip"
                          place="top"
                          effect="solid"
                        >
                          NFT Is Sold
                        </ReactTooltip>
                      ) : new Date() < new Date(location.state.startTime) ? (
                        <ReactTooltip
                          id="registerTip"
                          place="top"
                          effect="solid"
                          style={{ color: "white" }}
                        >
                          Sale Has Not Started Yet
                        </ReactTooltip>
                      ) : new Date() > new Date(location.state.endTime) ? (
                        <ReactTooltip
                          id="registerTip"
                          place="top"
                          effect="solid"
                        >
                          Sale Has Ended
                        </ReactTooltip>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              )}
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NFTBuy;
