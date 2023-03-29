import { CardActions, CardContent, Grid } from "@material-ui/core/";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import { Link, useHistory, useParams } from "react-router-dom";
import Web3 from "web3";
import MarketPlaceContract from "../../../../components/blockchain/Abis/MarketPlaceContract.json";
import WethContract from "../../../../components/blockchain/Abis/WethContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NewNFTCard from "../../../../components/Cards/NewNFTCards";
import TxHistory from "../../../../components/Cards/TxHistory";
import CubeComponent from "../../../../components/Cube/CubeComponent";
import HeaderHome from "../../../../components/Headers/Header";
import ConfirmBuyCubeModal from "../../../../components/Modals/ConfirmBuyCubeModal";
import LoginErrorModal from "../../../../components/Modals/LoginErrorModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WethModal from "../../../../components/Modals/WethModal";
import { Alert } from "reactstrap";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckIcon from "@material-ui/icons/Check";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const newStyles = makeStyles((theme) => ({
  dropTitle: {
    fontSize: "1rem",
    fontFamily: "poppins",
    textTransform: "capitalize",
    marginTop: "0rem",
    backgroundImage:
      "linear-gradient(180deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  NftTitle: {
    color: "#04111D",
    fontFamily: "poppins",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "1rem 0 0 0",
  },
}));

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
  textAlert: {
    justifyContent: "center",
    borderRadius: "12px",
    fontSize: "1rem",
  },
}));

function SaleCubeNFTs(props) {
  let history = useHistory();
  let jwt = sessionStorage.getItem("Authorization");
  let jwtDecoded;
  if (jwt) {
    jwtDecoded = jwtDecode(jwt);
  }
  const [ownerAudio, setOwnerAudio] = useState(new Audio());
  const [nonOwnerAudio, setNonOwnerAudio] = useState(new Audio()); // eslint-disable-next-line
  const [isClaimingWeth, setIsClaimingWeth] = useState(false);
  const [weth, setWeth] = useState(0);
  const [enableWethButton, setEnableWethButton] = useState(false);
  const [isConfirmingWeth, setIsConfirmingWeth] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      ownerAudio.addEventListener("ended", () => ownerAudio.pause());
      nonOwnerAudio.addEventListener("ended", () => nonOwnerAudio.pause());
      return () => {
        ownerAudio.removeEventListener("ended", () => ownerAudio.pause());
        nonOwnerAudio.addEventListener("ended", () => nonOwnerAudio.pause());
      };
    })(); // eslint-disable-next-line
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const styles = newStyles();
  const { expiresAt, cubeId, auctionId } = useParams();
  const [tokenList, setTokenList] = useState([]);
  const [cubeData, setCubeData] = useState({});
  const [balance, setBalance] = useState();
  const [hide, setHide] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [network, setNetwork] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [openWeth, setOpenWeth] = useState(false);
  const handleCloseWeth = () => {
    setOpenWeth(false);
  };
  const handleShowWeth = () => {
    setOpenWeth(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleShow = () => {
    setOpen(true);
  };
  const [openNetwork, setOpenNetwork] = useState(false);
  const handleCloseNetwork = () => {
    setOpenNetwork(false);
  };
  const handleShowNetwork = () => {
    setOpenNetwork(true);
  };
  const [openBuyCubeModal, setOpenBuyCubeModal] = useState(false);
  const handleCloseBuyCubeModal = () => {
    setOpenBuyCubeModal(false);
  };
  const handleShowBuyCubeModal = () => {
    setOpenBuyCubeModal(true);
  };
  const [openSpinner, setOpenSpinner] = useState(false);
  const handleCloseSpinner = () => {
    setOpenSpinner(false);
  };
  const handleShowSpinner = () => {
    setOpenSpinner(true);
  };
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleShowBackdrop = () => {
    setOpenBackdrop(true);
  };
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
  let BuyCube = async (e) => {
    e.preventDefault();

    let jwt = sessionStorage.getItem("Authorization");
    if (jwt) {
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log("balance", (balance / 10 ** 18).toString());

      const network = await web3.eth.net.getNetworkType();
      if (network !== "ropsten") {
        setNetwork(network);
        handleShowNetwork();
      } else {
        handleShowBuyCubeModal();
      }

      console.log("HELLO");
    } else {
      handleShow();
    }
  };
  let removeFromSale = () => {
    setIsRemoving(true);
    let saleData = {
      auctionId: auctionId,
      tokenId: cubeId,
    };
    console.log("saleData", saleData);

    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.post("auction/deleteauction", saleData).then(
      (response) => {
        console.log("response", response);
        setIsRemoving(false);
        let variant = "success";
        enqueueSnackbar("Removed from Sale Successfully.", { variant });
        history.push("/");
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsRemoving(false);
        let variant = "error";
        enqueueSnackbar("Unable to Remove from Sale.", { variant });
      }
    );
  };

  let ConfirmBuyCube = async () => {
    handleCloseBuyCubeModal();
    setIsSaving(true);
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "ropsten") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetwork();
    } else {
      handleShowBackdrop();
      const wethAddress = Addresses.WethAddress;
      const wethAbi = WethContract;
      const address = Addresses.MarketPlaceAddress;
      const abi = MarketPlaceContract;
      var myWethContractInstance = await new web3.eth.Contract(
        wethAbi,
        wethAddress
      );
      let wethReceipt = await myWethContractInstance.methods
        .balanceOf(accounts[0])
        .call();
      if (wethReceipt < cubeData.SalePrice) {
        let variant = "error";
        enqueueSnackbar("You have insufficient Weth", { variant });
        setEnableWethButton(true);
        setIsSaving(false);

        handleCloseBackdrop();
      } else {
        setEnableWethButton(false);
        await myWethContractInstance.methods
          .approve(address, cubeData.SalePrice.toString())
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
            if (err !== null) {
              console.log("err", err);
              let variant = "error";
              enqueueSnackbar("User Canceled Transaction", { variant });
              handleCloseBackdrop();
            }
          });

        const CubeAddress = Addresses.CreateCubeAddress;
        var myContractInstance = await new web3.eth.Contract(abi, address);
        console.log("myContractInstance", myContractInstance);
        console.log("cubeData.tokenId", cubeData.tokenId);
        let receipt1 = await myContractInstance.methods
          .executeOrder(
            CubeAddress,
            cubeData.tokenId,
            cubeData.SalePrice.toString()
          )
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
            if (err !== null) {
              console.log("err", err);
              let variant = "error";
              enqueueSnackbar("User Canceled Transaction", { variant });
              handleCloseBackdrop();
            }
          });
        let BuyData = {
          auctionId: auctionId,
          tokenId: cubeId,
          owneraddress: accounts[0],
        };
        console.log("BuyData", BuyData);

        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
          "Authorization"
        )}`;
        axios.post("token/buyuserToken", BuyData).then(
          (response) => {
            console.log("response", response);
            setIsSaving(false);
            handleCloseBackdrop();
            getSaleCubeNFTs();
            let variant = "success";
            enqueueSnackbar("Cube Bought Successfully.", { variant });
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            setIsSaving(false);
            handleCloseBackdrop();

            let variant = "error";
            enqueueSnackbar("Unable to Buy Cube.", { variant });
          }
        );
        let TrasactionData = {
          tokenId: cubeData.tokenId,
          from: cubeData.address,
          to: accounts[0],
          transaction: receipt1.transactionHash,
        };

        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
          "Authorization"
        )}`;
        axios.post("/transaction/tokenTransaction ", TrasactionData).then(
          (response) => {
            console.log("response", response);
            setIsSaving(false);
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            setIsSaving(false);
          }
        );
      }
    }
  };
  let getSaleCubeNFTs = () => {
    handleShowSpinner();

    let Data = {
      tokenId: cubeId,
      check: "notdrop",
    };
    console.log("Data", Data);

    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.post("/token/SingleTokenId", Data).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.nftdata);
        setCubeData(response.data.tokensdata);
        setOwnerAudio(new Audio(response.data.tokensdata.ownermusicfile));
        setNonOwnerAudio(new Audio(response.data.tokensdata.nonownermusicfile));
        axios
          .get(
            `/transaction/tokenTransaction/${response.data.tokensdata.tokenId}`
          )
          .then(
            (res) => {
              console.log("res", res);
              if (res.data.success)
                setTransactionHistory(res.data.transactions);
              handleCloseSpinner();
            },
            (error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(error);
                console.log(error.response);
              }
              if (error.response.data !== undefined) {
                if (
                  error.response.data ===
                  "Unauthorized access (invalid token) !!"
                ) {
                  sessionStorage.removeItem("Address");
                  sessionStorage.removeItem("Authorization");
                  window.location.reload(false);
                }
              }
              handleCloseSpinner();
            }
          );
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseSpinner();
      }
    );
  };
  useEffect(() => {
    (async () => {
      getSaleCubeNFTs();
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log("balance", (balance / 10 ** 18).toString());
      setBalance(balance);
    })(); // eslint-disable-next-line
  }, []);
  let getWeth = () => {
    handleShowWeth();
  };
  let confirmGetWeth = async () => {
    await loadWeb3();
    handleShowBackdrop();
    setIsConfirmingWeth(true);
    const web3 = window.web3;
    const wethAddress = Addresses.WethAddress;
    const wethAbi = WethContract;
    const accounts = await web3.eth.getAccounts();
    var myWethContractInstance = await new web3.eth.Contract(
      wethAbi,
      wethAddress
    );
    let wethReceipt = await myWethContractInstance.methods
      .deposit()
      .send({ from: accounts[0], value: weth * 10 ** 18 }, (err, response) => {
        console.log("get transaction", err, response);
        if (err !== null) {
          console.log("err", err);
          let variant = "error";
          enqueueSnackbar("User Canceled Transaction", { variant });
          handleCloseBackdrop();
          setIsConfirmingWeth(false);
        }
      });
    handleCloseBackdrop();
    handleCloseWeth();

    setIsConfirmingWeth(false);
    console.log("wethReceipt", wethReceipt);
    let variant = "Success";
    enqueueSnackbar("Successfully transferred Weth to your account", {
      variant,
    });
  };
  console.log("expiresAt", expiresAt);
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Market"} role={null}/>
        <div className="card">
          <div className="card-body" style={{ marginTop: "110px" }}>
            {openSpinner ? (
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
            ) : (
              <div className="container-fluid">
                <div className="row no-gutters w-100">
                  <div className="col-md-12 col-lg-5 pr-lg-3">
                    <Card className="" id="marketCardProps">
                      <CardActionArea>
                        <CardMedia>
                          <div className="nftImgWrapper">
                            <img
                              src="https://img.freepik.com/free-photo/beautiful-natural-environment-digital-painting_456031-170.jpg?w=1800&t=st=1669708165~exp=1669708765~hmac=c8edc7ac10b670a10a67e1469ab13fec5efa503733f52c7a8faf3fbbfea5e76b"
                              alt="a sample nft"
                              className="nftSaleDetail"
                            />
                          </div>
                        </CardMedia>
                      </CardActionArea>
                    </Card>
                  </div>

                  <div className="col-md-12 col-lg-7 pl-lg-3">
                    {/* Get More WETH */}
                    {enableWethButton ? (
                      isClaimingWeth ? (
                        <div align="center" className="text-center">
                          <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#ff0000" }}
                          ></Spinner>
                          <span
                            style={{ color: "#ff0000" }}
                            className="sr-only"
                          >
                            Loading...
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => getWeth(e)}
                          style={{ float: "right" }}
                          className="uploadLabel"
                        >
                          Get More Weth
                        </button>
                      )
                    ) : null}

                    {new Date() > new Date(expiresAt) ? (
                      jwt ? (
                        <>
                          {cubeData.userId === jwtDecoded.userId ? (
                            isRemoving ? (
                              <div align="center" className="text-center">
                                <Spinner
                                  animation="border"
                                  role="status"
                                  style={{ color: "#ff0000" }}
                                ></Spinner>
                                <span
                                  style={{ color: "#ff0000" }}
                                  className="sr-only"
                                >
                                  Loading...
                                </span>
                              </div>
                            ) : (
                              <button
                                className="uploadLabel"
                                style={{ float: "right" }}
                                onClick={removeFromSale}
                              >
                                Remove from Sale
                              </button>
                            )
                          ) : null}
                        </>
                      ) : null
                    ) : null}
                    <div className="row no-gutters">
                      <Typography
                        variant="p"
                        component="p"
                        className={styles.dropTitle}
                      >
                        {cubeData.title}
                      </Typography>
                    </div>

                    <div className="row no-gutters">
                      <div className="col-12">
                        <Typography
                          variant="h4"
                          component="div"
                          className={styles.NftTitle}
                        >
                          NFT Name
                        </Typography>
                      </div>
                      <div className="col">
                        <Typography
                          variant="p"
                          component="div"
                          className={styles.NftOwner}
                          style={{
                            marginBottom: "1.5rem",
                            fontSize: "1rem",
                          }}
                        >
                          Owned by{" "}
                          <Link to="/">
                            <strong className="gradient-text">IamOwner</strong>
                          </Link>
                        </Typography>
                      </div>
                    </div>
                    <div className="row no-gutters mb-4">
                      <div className="col">
                        <h4>This is Views Section</h4>
                      </div>
                    </div>
                    <Card id="singleNftPriceAndTime">
                      <div className="border-bottom py-3">
                        <CardHeader
                          title={
                            <div className="row no-gutters">
                              {new Date() < new Date(expiresAt) ? (
                                <Typography
                                  variant="p"
                                  component="p"
                                  gutterBottom
                                  style={{
                                    fontFamily: "poppins",
                                    fontSize: "1.125rem",
                                    color: "#777",
                                  }}
                                >
                                  <span>
                                    <AccessTimeIcon />
                                  </span>{" "}
                                  Sale Ends in:{" "}
                                  <span>
                                    <Countdown
                                      daysInHours
                                      date={new Date(expiresAt)}
                                    ></Countdown>
                                  </span>
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "rgb(97, 26, 21)",
                                    fontFamily: "poppins",
                                  }}
                                  component="p"
                                >
                                  <strong>Sale Ended</strong>
                                </Typography>
                              )}
                            </div>
                          }
                        />
                      </div>
                      <CardContent>
                        <div className="row no-gutters py-3">
                          <div className="col-12">
                            <Typography
                              variant="p"
                              component="div"
                              className={styles.NftOwner}
                              style={{
                                fontSize: "1rem",
                              }}
                            >
                              Current Price
                            </Typography>
                          </div>
                          <div className="col-12">
                            <p className="nftPrice mb-0 p-0">
                              {cubeData.SalePrice / 10 ** 18} ETH{" "}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="row no-gutters w-100">
                          <div className="col-6 px-2 ">
                            <button className="singleNftDetailBtn">
                              <span className="btnIcon">
                                <AddShoppingCartIcon />{" "}
                              </span>
                              Add To Cart
                            </button>
                          </div>
                          <div className="col-6 px-2">
                            <button className="singleNftDetailBtn">
                              <span className="btnIcon">
                                <CheckIcon />{" "}
                              </span>
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </CardActions>
                    </Card>

                    <div className="align-self-end">
                      <div className="align-self-end">
                        {cubeData.SalePrice / 10 ** 18 > balance / 10 ** 18 ? (
                          <>
                            <Button variant="primary" block disabled>
                              Insufficient Balance
                            </Button>
                          </>
                        ) : (
                          <>
                            {isSaving ? (
                              <div align="center" className="text-center">
                                <Spinner
                                  animation="border"
                                  role="status"
                                  style={{ color: "#ff0000" }}
                                ></Spinner>
                                <span
                                  style={{ color: "#ff0000" }}
                                  className="sr-only"
                                >
                                  Loading...
                                </span>
                              </div>
                            ) : jwt ? (
                              cubeData.userId === jwtDecoded.userId ? (
                                <Button variant="primary" block disabled>
                                  You cannot buy your own Cube
                                </Button>
                              ) : new Date() < new Date(expiresAt) ? (
                                <Button
                                  variant="primary"
                                  block
                                  onClick={(e) => BuyCube(e)}
                                >
                                  Buy Cube
                                </Button>
                              ) : (
                                <Button variant="primary" block disabled>
                                  Sale Ended
                                </Button>
                              )
                            ) : (
                              <Button variant="primary" block disabled>
                                Buy Cube
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <br></br>

                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                      >
                        {hide
                          ? tokenList.map((i, index) => (
                              <NewNFTCard data={i[0]} key={index}></NewNFTCard>
                            ))
                          : null}
                      </Grid>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography variant="h6" gutterBottom>
                              Tx History
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {transactionHistory.length === 0 ? (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>No Transaction History Found </strong>
                              </Typography>
                            ) : null}
                            <Grid
                              container
                              spacing={2}
                              direction="row"
                              justify="flex-start"
                            >
                              {transactionHistory
                                .slice(0)
                                .reverse()
                                .map((i, index) => (
                                  <TxHistory data={i} key={index} />
                                ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginErrorModal show={open} handleClose={handleClose} />
      <ConfirmBuyCubeModal
        balance={balance}
        salePrice={cubeData.SalePrice}
        show={openBuyCubeModal}
        handleClose={handleCloseBuyCubeModal}
        ConfirmBuyCube={ConfirmBuyCube}
      />
      <WethModal
        isConfirmingWeth={isConfirmingWeth}
        weth={weth}
        balance={balance}
        setWeth={setWeth}
        show={openWeth}
        handleClose={handleCloseWeth}
        confirmGetWeth={confirmGetWeth}
      />
      <NetworkErrorModal
        show={openNetwork}
        handleClose={handleCloseNetwork}
        network={network}
      />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SaleCubeNFTs;
