import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import Web3 from "web3";
import { Link, useLocation } from "react-router-dom";
import { CardContent, CardMedia, CardHeader } from "@material-ui/core/";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";
import CornerRibbon from "react-corner-ribbon";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";

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
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
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

function MyDropNFTs(props) {
  let location = useLocation();
  const classes = useStyles();

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
  let [audio, setAudio] = useState();
  let [nftDetail, setNftDetail] = useState({});
  let [versionB, setVersionB] = useState("");
  let handleOpenNFTDetailModal = (nftObject) => {
    setNftDetail(nftObject);
    setOpenDialog(true);
  };

  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getNFTs = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    console.log("nftids", location.state.nftId);
    console.log("dropId", location.state.dropId);
    console.log("saleType", location.state.saleType);

    let data = {
      nftIds: location.state.nftId,
    };
    axios
      .get(
        `/drop/nfts/${location.state.dropId}/${start}/${end}`,
        data
      )
      .then(
        (response) => {
          console.log("response", response);
          let nfts = response.data.data;
          let newState = nfts.map((obj) => {
            return { ...obj, isPlaying: false };
          });
          console.log("NFTS", nfts);
          console.log("Updated", newState);
          setTokenList(newState);
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
              Cookies.remove("Version");

              window.location.reload(false);
            }
          }
          handleCloseBackdrop();
        }
      );
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    console.log("Location state: ", location);
    setNftIds(location.state.nftId);
    getNFTs(0, rowsPerPage);
    // getCollections();?

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
  return (
    <div className="backgroundDefault">
    
    <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Drop Nfts</h3>
            <ul className="breadcrumb">
            <Link to={`/dashboard`}>
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              </Link>
              <Link to={`/dashboard/myDrops`}>
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>My Drops</li>
              </Link>
              <li className="breadcrumb-item active">Drop Nfts</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body px-0">
        <form>
          <div className="form-group">
            {open ? (
              <div align="center" className="text-center">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#fbfeff" }}
                ></Spinner>
                <span style={{ color: "#fbfeff" }} className="sr-only">
                  Loading...
                </span>
              </div>
            ) : tokenList.length === 0 ? (
              <Card
                variant="outlined"
                style={{
                  padding: "40px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  backgroundColor:"black"
                }}
              >
                <Typography
                  variant="body2"
                  className="text-center"
                  component="p"
                  style={{color: "white"}}
                >
                  <strong>No items to display </strong>
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={2} direction="row" justify="flex-start">
                {tokenList.map((i, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Link
                      onClick={(e) => handleStop(e)}
                      to={{
                        pathname: `${path}/singleNft`,
                        state: {
                          nftDetail: i,
                          saleType: location.state.saleType,
                          status: location.state.status,
                          nftId: location.state.nftId,
                          dropId:location.state.dropId
                        },
                      }}
                    >
                      <Card
                        style={{ height: "100%", backgroundColor: "black", border: "1px solid white", color: "white" }}
                        variant="outlined"
                        className={classes.cardHeight}
                      >
                        {/* <CardActionArea onClick={() => {
                                                        console.log("nftDetailObject: ", i);
                                                        handleOpenNFTDetailModal(i);
                                                        console.log("Open Dialog Value: ", openDialog); 
                                                }}> */}
                        <div style={{ position: "relative" }}>
                          {/* <CardHeader
                            className="text-center"
                            title={
                              i.title.length > 12 ? (
                                <span>{i.title.slice(0, 7)}...</span>
                              ) : (
                                i.title
                              )
                            }
                          /> */}

                          {i.currentMarketplaceId.isSold === true ? (
                            <CornerRibbon
                              position="top-right"
                              fontColor="#f0f0f0"
                              backgroundColor="#4caf50"
                              style={{ fontWeight: "bold" }}
                            >
                              SOLD
                            </CornerRibbon>
                          ) : null}
                        </div>
                        <div style={{ position: "relative" }}>
                          <CardMedia
                            variant="outlined"
                            style={{
                              border:
                                i.type === "Mastercraft"
                                  ? "4px solid #ff0000"
                                  : i.type === "Legendary"
                                  ? "4px solid #FFD700"
                                  : i.type === "Epic"
                                  ? "4px solid #9400D3"
                                  : i.type === "Rare"
                                  ? "4px solid #0000FF"
                                  : i.type === "Uncommon"
                                  ? "4px solid #008000"
                                  : i.type === "Common"
                                  ? "4px solid #FFFFFF"
                                  : "none",
                            }}
                            className={classes.media}
                            image={
                              i.previewImageURI ? i.previewImageURI : i.nftURI
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
                                    borderRadius: "80%",
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
                        </div>

                        <CardContent>
                          {/* <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Rarity: </strong>{i.type}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Supply: </strong>{i.tokenSupply}
                                                    </Typography> */}
                                                    {/* Title, Description and Price */}
            <div
              className="row no-gutters justify-content-between"
              style={{ minHeight: "60px" }}
            >
              <div className="col-8 align-self-end">
              <Typography
                  variant="h6"
                  className={classes.cardTitle}
                >
                  {
                            i.title.length > 12 ? (
                                <span>{i.title.slice(0, 7)}...</span>
                              ) : (
                                i.title
                              )
                            }
                </Typography>
                <Typography
                            variant="body2"
                            className={classes.cardDescriptions}
                          >
                            <strong>Artwork Description: </strong>
                            {i.description}
                          </Typography>
              </div>
              <div className="col-4 align-self-end text-right p-0">
             
                            <p className="nftPrice mb-0 p-0">
                            {i.currentMarketplaceId.price}{" "}
                            USD
                            </p>
              </div>
            </div>
                          
                          
                        </CardContent>
                        {/* </CardActionArea> */}
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
          <TablePagination
            rowsPerPageOptions={[4, 8, 12, 24]}
            component="div"
            count={totalNfts}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </form>
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

export default MyDropNFTs;
