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
import { useLocation } from "react-router-dom";
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
import "react-h5-audio-player/lib/styles.css";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

import { BlurLinear, ExpandMore } from "@material-ui/icons";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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

  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">MarketPlace</li>
      </ul>
      <div className="card-body">
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
            <Card>
              <CardContent>
                <Row>
                  <Col>
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ color: "#a70000" }}
                    >
                      <strong>NFT Title </strong>
                    </Typography>
                  </Col>
                  <Col>{nftDetail.title}</Col>
                </Row>
                <Row>
                  <Col>
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ color: "#a70000" }}
                    >
                      <strong>NFT Description </strong>
                    </Typography>
                  </Col>
                  <Col>{nftDetail.description}</Col>
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
                      style={{ color: "#a70000" }}
                    >
                      <strong>Price </strong>
                    </Typography>
                  </Col>
                  <Col>{price} WMATIC</Col>
                </Row>

                {nftDetail.nftType === "1155" ? (
                  <span>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{ color: "#a70000" }}
                        >
                          <strong>Supply Type </strong>
                        </Typography>
                      </Col>
                      <Col>{nftDetail.supplyType}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{ color: "#a70000" }}
                        >
                          <strong>Token Supply </strong>
                        </Typography>
                      </Col>
                      <Col>{nftDetail.tokenSupply}</Col>
                    </Row>
                  </span>
                ) : null}
              </CardContent>
            </Card>
            <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
              <Col>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="body1" style={{ color: "#a70000" }}>
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
            new Date() < new Date(location.state.endTime) &&
            versionB !== "v1-sso" ? (
              <Row>
                <Col
                  style={{
                    textAlign: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => handleBuy(e)}
                    className="btn submit-btn "
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
                      className="btn submit-btn "
                    >
                      Buy
                    </button>
                    {location.state.nftDetail.currentMarketplaceId.isSold ===
                    true ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        NFT Is Sold
                      </ReactTooltip>
                    ) : new Date() < new Date(location.state.startTime) ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        Sale Has Not Started Yet
                      </ReactTooltip>
                    ) : new Date() > new Date(location.state.endTime) ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
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
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NFTBuy;
