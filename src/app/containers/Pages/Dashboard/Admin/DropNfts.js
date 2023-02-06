import { CardContent, CardHeader, CardMedia, Grid } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import Web3 from "web3";
import CornerRibbon from "react-corner-ribbon";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import { truncate } from "../../../../assets/js/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#000 !important",
    border: "1px solid #fff",
    // backgroundColor: theme.palette.background.paper,
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
}));

const cardStyles = makeStyles((theme) => ({
  cardTheme: {
    // borderRadius: "12px",
    boxShadow: "none",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: "0rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "1rem",
    // marginTop: "0.15rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    // borderRadius: "12px",
    fontSize: "1rem",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    // borderRadius: "12px",
    fontWeight: "bold",
  },
}));

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "orbitron",
    color: "#fff",
  },
  overrides: {
    MuiTablePagination: {
      caption: {
        fontWeight: "bold",
        color: "#fff",
      },
      input: {
        fontWeight: "bold",
        color: "#fff",
      },
      selectIcon: {
        color: "#fff",
      },
      actions: {
        color: "#fff",
      },
    },
    MuiIconButton: {
      root: {
        color: "#fff",
      },
      "&$disabled": {
        color: "#fff",
      },
    },
    Mui: {
      "&$disabled": {
        color: "#fff",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#000",
        color: "#fff",
        border: "1px solid #fff",
      },
    },
  },
});

// COMPONENT FUNCTION
function MyNFTs(props) {
  let location = useLocation();
  const classes = useStyles();
  const cardClasses = cardStyles();
  let { path } = useRouteMatch();
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [nftIds, setNftIds] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let [openDialog, setOpenDialog] = useState(false);
  let [openEditModal, setOpenEditModal] = useState(false);
  let [nftDetail, setNftDetail] = useState({});
  let [audio, setAudio] = useState();
  let [versionB, setVersionB] = useState("");
  let handleOpenNFTDetailModal = (nftObject) => {
    setNftDetail(nftObject);
    setOpenDialog(true);
  };

  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);
  const myRef = useRef();
  let [windowSize, setWindowSize] = useState(window.innerWidth);

  // let loadWeb3 = async () => {
  //     if (window.ethereum) {
  //         window.web3 = new Web3(window.ethereum)
  //         await window.ethereum.enable()
  //     }
  //     else if (window.web3) {
  //         window.web3 = new Web3(window.web3.currentProvider)
  //     }
  //     else {
  //         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //     }
  // }

  // const getHash = (id) => {

  //     const hex = Web3.utils.toHex(id);
  //     console.log('conversion to hex: ', hex);
  //     return hex;

  // }

  // let handleCloseNFTDetailModal = () => {
  //     // setTokenList([...tempTokenList]);
  //     // setTempTokenList([]);
  //     console.log("Close button called from modal.");
  //     setOpenDialog(false);
  // }

  // let handleBuy= async() => {
  //     // setNftDetail(nftObject);
  //     console.log("Nft detail: ", nftDetail);
  //     setNftDetail(nftDetail);
  //     // console.log("Nft detail id: ", nftDetail.collectionId._id);
  //     let dropIdHex = getHash(nftDetail.dropId);
  //     console.log(dropIdHex);
  //     setOpenDialog(false);
  //     setIsSaving(true);
  //     await loadWeb3();
  //     const web3 = window.web3
  //     const accounts = await web3.eth.getAccounts();
  //     const network = await web3.eth.net.getNetworkType()
  //     if (network !== 'goerli') {
  //         setNetwork(network);
  //         setIsSaving(false);
  //         handleShowNetworkModal();
  //     }
  //     else {
  //         handleShowBackdrop();
  //         const addressDropFactory = Addresses.FactoryDrop;
  //         const abiDropFactory = DropFactory;

  //         var myContractInstance = await new web3.eth.Contract(abiDropFactory, addressDropFactory);
  //         console.log("myContractInstance", myContractInstance)

  //         await myContractInstance.methods.executeOrder(dropIdHex, nftDetail.collectionId.nftContractAddress, nftDetail.nftId, nftDetail.tokenSupply, nftDetail.currentMarketplaceId.price).send({from : accounts[0]}, (err, response) => {
  //             console.log('get transaction', err, response);
  //             let data = {
  //                 dropId : nftDetail.dropId,
  //                 nftId : nftDetail._id,
  //                 txHash : response

  //             }

  //             console.log("data",data);
  //             axios.put(`/marketplace/buy`, data).then(
  //                 (response) => {
  //                     console.log("Transaction Hash sending on backend response: ", response);
  //                 },
  //                 (error) => {
  //                     console.log("Transaction hash on backend error: ", error.response);
  //                 }
  //             )

  //             if (err !== null) {
  //                 console.log("err", err);
  //                 let variant = "error";
  //                 enqueueSnackbar('User Canceled Transaction', { variant });
  //                 handleCloseBackdrop();
  //                 setIsSaving(false);

  //             }

  //         })
  //         .on('receipt', (receipt) => {
  //             console.log("receipt", receipt);

  //         })
  //     }

  // }
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let handlePlay = async (e, token) => {
    e.preventDefault();
    let audioPlay = new Audio(token.nftURI);
    // console.log("src", src);
    // console.log("audi play", audioPlay);

    console.log("playing?", token.isPlaying);
    console.log("audio", audio);
    let updateState = tokenList.map((obj) => {
      if (obj._id !== token._id) {
        return { ...obj, isPlaying: false };
      } else if (obj._id === token._id) {
        return { ...obj, isPlaying: true };
      }

      return obj;
    });
    setTokenList(updateState);
    // setIsPlaying({myArray[i] : true});
    if (audio !== undefined) {
      audio.pause();
    }
    audioPlay.play();
    setAudio(audioPlay);
    console.log("Audio", audio);
  };

  let handlePause = async (e, token) => {
    e.preventDefault();
    let updateState = tokenList.map((obj) => {
      if (obj._id === token._id) {
        return { ...obj, isPlaying: false };
      }

      return obj;
    });
    setTokenList(updateState);

    console.log("Audio", audio);
    audio.pause();
  };

  let handleStop = async (e) => {
    if (audio !== undefined) {
      audio.pause();
    }
  };
  let nftIdLen=location.state.nftId.length;

  let getNFTs = (start, end) => {
    handleShowBackdrop();
    console.log("nftids", location.state.nftId);
    console.log("dropId", location.state.dropId);

    console.log("len", location.state.nftId.length);

    let data = {
      nftIds: location.state.nftId,
    };
    const version = Cookies.get("Version");
    console.log("version", version);
    
    
    if (nftIdLen!=0){
      axios
      .get(
        `${version}/drop/nfts/${location.state.dropId}/${start}/${end}`,
        data
      )
      .then(
        (response) => {
          console.log("response", response.data.data);

          let nfts = response.data.data;
          let newState = nfts.map((obj) => {
            return { ...obj, isPlaying: false };
          });
          console.log("NFTS", nfts);
          console.log("Updated", newState);
          setTokenList(newState);
          // setTokenList(tokenList.map())
          // setTokenList(...tokenList, isPlaying : false);
          setTotalNfts(response.data.data.length);

          handleCloseBackdrop();
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          if (error.response.data !== undefined) {
            if (
              error.response.data === "Unauthorized access (invalid token) !!"
            ) {
              sessionStorage.removeItem("Authorization");
              sessionStorage.removeItem("Address");
              window.location.reload(false);
            }
          }
          handleCloseBackdrop();
        }
      );
    }
    else{
      handleCloseBackdrop();
    }
    
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    setNftIds(location.state.nftId);
    getNFTs(0, rowsPerPage);
    setWindowSize(window.innerWidth);
    console.log("width", window.innerWidth);
    // getCollections();?

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
    }); // eslint-disable-next-line
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Market Place Drops</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">Market Place Drops</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="card-body page-height px-0">
        {/* Banner and Thumb */}
        <div className="row no-gutters">
          <div className="col-12">
            <div className="bannerWrapper">
              {/* banner */}
              <img
                src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
                className="bannerImg"
                alt="Drop banner"
              />

              {/* thumbg */}
              <div className="dropThumbWrapper">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
                  className="thumbImg"
                  alt="drop thumb"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          {/* Heading */}
          <div className="row no-gutters justify-content-start align-items-end my-4 pt-5">
            {/* On Sale */}
            <div className="col-12">
              <h1 className="marketCatHeadings">NFTs inside Sample Drop </h1>
            </div>
            <div className="col-12">
              <h3 style={{ fontFamily: "inter" }}>Fixed Price Drop</h3>
            </div>
          </div>
          <ThemeProvider theme={customTheme}>
            <div className="row no-gutters justify-content-center">
              {open ? (
                <div align="center" className="text-center">
                  <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#ff0000" }}
                  ></Spinner>
                  <span style={{ color: "#ff0000" }} className="sr-only">
                    Loading...
                  </span>
                </div>
              ) : (tokenList.length === 0 ) ? (
                <Card
                variant="outlined"
                style={{
                    padding: "40px",
                    paddingTop:"80px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    marginLeft:"20%"
                }}
                >
                <Typography
                    variant="body2"
                    className="text-center"
                    component="p"
                    style={{ color: "#fff" }}
                >
                    <strong>No items to display </strong>
                </Typography>
                </Card>         
              ) : (
                
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="flex-start"
                  style={{ marginBottom: "24px" }}
                >
                  {tokenList.map((i, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={3}
                      spacing={1}
                      direction="row"
                      key={index}
                    >
                      {location.state.saleType === "fixed-price" ? (
                        <Link
                          onClick={(e) => handleStop(e)}
                          to={{
                            pathname: `${path}/buy`,
                            state: {
                              nftDetail: i,
                              startTime: location.state.startTime,
                              endTime: location.state.endTime,
                            },
                          }}
                        >
                          <Card
                            variant="outlined"
                            className={classes.cardHeight}
                            style={{
                              borderRadius: 0,
                              border: "1px solid #fff",
                            }}
                          >
                            {/* <CardActionArea onClick={() => {
                                                         console.log("nftDetailObject: ", i);
                                                         handleOpenNFTDetailModal(i);
                                                         console.log("Open Dialog Value: ", openDialog); 
                                                 }}> */}

                            <div style={{ position: "relative" }}>
                              <CardMedia
                                className={classes.media}
                                image={
                                  i.previewImageURI
                                    ? i.previewImageURI
                                    : i.nftURI
                                }
                                title="NFT Image"
                              />

                              {i.nftFormat === "mp3" ? (
                                // style={{ position: "absolute", top: "80%", left: "75%"  }}
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "75%",
                                    bottom: "5%",
                                  }}
                                >
                                  {i.isPlaying === false ? (
                                    <button
                                      className="btn"
                                      style={{
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(0,0,0,.5)",
                                        border: "#9f9f9f",
                                      }}
                                      onClick={(e) => handlePlay(e, i)}
                                    >
                                      <PlayArrow />
                                    </button>
                                  ) : (
                                    <button
                                      className="btn"
                                      style={{
                                        borderRadius: "80%",
                                        backgroundColor: "rgba(0,0,0,.5)",
                                        border: "#9f9f9f",
                                      }}
                                      onClick={(e) => handlePause(e, i)}
                                    >
                                      <Pause />
                                    </button>
                                  )}
                                </div>
                              ) : null}
                              {i.currentMarketplaceId.isSold === true ? (
                                <CornerRibbon
                                  position="top-right"
                                  fontColor="#f0f0f0"
                                  backgroundColor="#f44336"
                                  style={{ fontWeight: "bold" }}
                                >
                                  SOLD
                                </CornerRibbon>
                              ) : null}
                            </div>

                            <CardContent>
                              {/* <Typography variant="body2" color="textSecondary" component="p">
                                                         <strong>Token Rarity: </strong>{i.type}
                                                     </Typography>
                                                     <Typography variant="body2" color="textSecondary" component="p">
                                                         <strong>Token Supply: </strong>{i.tokenSupply}
                                                     </Typography> */}

                              <div
                                className="row no-gutters justify-content-between"
                                style={{ minHeight: "60px" }}
                              >
                                <div className="col-lg-8 align-self-end">
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    className={cardClasses.cardTitle}
                                  >
                                    {i.title.length > 12 ? (
                                      <span>{i.title.slice(0, 7)}...</span>
                                    ) : (
                                      i.title
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="p"
                                    className={cardClasses.cardDescriptions}
                                  >
                                    {truncate(i.description, 25)}
                                  </Typography>
                                </div>
                                <div className="col-lg-4 align-self-end text-center text-lg-right py-3  p-lg-0">
                                  <p
                                    className="nftPrice mb-0 p-0"
                                    style={{ lineHeight: "1.6" }}
                                  >
                                    {Web3.utils.fromWei(
                                      i.currentMarketplaceId.price
                                    )}{" "}
                                    WMATIC
                                  </p>
                                </div>
                              </div>
                              {/* <Typography
                                variant="body2"
                                // color="textSecondary"
                                component="p"
                                style={{color: "#fff"}}
                              >
                                <strong>Price : </strong>
                                {Web3.utils.fromWei(
                                  i.currentMarketplaceId.price
                                )}{" "}
                                WMATIC
                              </Typography> */}
                              {/* <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Artwork Description: </strong>
                                {i.description}
                              </Typography> */}
                            </CardContent>
                            {/* </CardActionArea> */}
                          </Card>
                        </Link>
                      ) : (
                        <Link
                          onClick={(e) => handleStop(e)}
                          to={{
                            pathname: `/dashboard/marketPlace/${i.dropId}/${i._id}`,
                            state: {
                              nftContractAddress:
                                i.collectionId.nftContractAddress,
                              endTime: location.state.endTime,
                              contractType: i.collectionId.contractType,
                              price: i.currentMarketplaceId.price,
                            },
                          }}
                        >
                          <Card
                            style={{
                              borderRadius: 0,
                              border: "1px solid #fff",
                            }}
                            // variant="outlined"
                            className={classes.cardHeight}
                          >
                            {/* <CardActionArea onClick={() => {
                                                        console.log("nftDetailObject: ", i);
                                                        handleOpenNFTDetailModal(i);
                                                        console.log("Open Dialog Value: ", openDialog); 
                                                }}> */}

                            <div style={{ position: "relative" }}>
                              <CardMedia
                                className={classes.media}
                                image={
                                  i.previewImageURI
                                    ? i.previewImageURI
                                    : i.nftURI
                                }
                                title="NFT Image"
                              />

                              {i.nftFormat === "mp3" ? (
                                // style={{ position: "absolute", top: "80%", left: "75%"  }}
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "75%",
                                    bottom: "5%",
                                  }}
                                >
                                  {i.isPlaying === false ? (
                                    <button
                                      className="btn"
                                      style={{
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(0,0,0,.5)",
                                        border: "#9f9f9f",
                                      }}
                                      onClick={(e) => handlePlay(e, i)}
                                    >
                                      <PlayArrow />
                                    </button>
                                  ) : (
                                    <button
                                      className="btn"
                                      style={{
                                        borderRadius: "80%",
                                        backgroundColor: "rgba(0,0,0,.5)",
                                        border: "#9f9f9f",
                                      }}
                                      onClick={(e) => handlePause(e, i)}
                                    >
                                      <Pause />
                                    </button>
                                  )}
                                </div>
                              ) : null}
                              {i.currentMarketplaceId.isSold === true ? (
                                <CornerRibbon
                                  position="top-right"
                                  fontColor="#f0f0f0"
                                  backgroundColor="#f44336"
                                  style={{ fontWeight: "bold" }}
                                >
                                  SOLD
                                </CornerRibbon>
                              ) : null}
                            </div>
                            <CardContent>
                              {/* <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Rarity: </strong>{i.type}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Supply: </strong>{i.tokenSupply}
                                                    </Typography> */}

                              <div
                                className="row no-gutters justify-content-between"
                                style={{ minHeight: "60px" }}
                              >
                                <div className="col-lg-8 align-self-end">
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    className={cardClasses.cardTitle}
                                  >
                                    {i.title.length > 12 ? (
                                      <span>{i.title.slice(0, 7)}...</span>
                                    ) : (
                                      i.title
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="p"
                                    className={cardClasses.cardDescriptions}
                                  >
                                    {truncate(i.description, 25)}
                                  </Typography>
                                </div>
                                <div className="col-lg-4 align-self-end text-center text-lg-right py-3  p-lg-0">
                                  <p
                                    className="nftPrice mb-0 p-0"
                                    style={{ lineHeight: "1.6" }}
                                  >
                                    {Web3.utils.fromWei(
                                      i.currentMarketplaceId.price,
                                      "ether"
                                    )}{" "}
                                    WMATIC
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            {/* </CardActionArea> */}
                          </Card>
                        </Link>
                      )}
                    </Grid>
                  ))}
                </Grid>
                )}
                
                <TablePagination
                rowsPerPageOptions={[4, 8, 12, 24]}
                component="div"
                count={totalNfts}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
            </ThemeProvider>
         
         
        </div>
      </div>
      {/* <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop> */}
      {/* <NetworkErrorModal
                show={showNetworkModal}
                handleClose={handleCloseNetworkModal}
                network={network}
            >
            </NetworkErrorModal>
            <NFTBuyModal 
                show={openDialog} 
                handleClose={handleCloseNFTDetailModal}
                nftDetail={nftDetail}
                handleBuy={handleBuy}
            >
            </NFTBuyModal> */}
    </div>
  );
}

export default MyNFTs;
