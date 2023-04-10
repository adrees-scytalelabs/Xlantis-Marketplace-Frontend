import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import transakSDK from "@transak/transak-sdk";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-h5-audio-player/lib/styles.css";
import { useLocation, useParams } from "react-router-dom";
import Web3 from "web3";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AuctionDropFactory1155ABI from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import AuctionDropFactory721ABI from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import ERC20Abi from "../../../../components/blockchain/Abis/AuctionERC20.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import AuctionNFTDetailCard from "../../../../components/Cards/AuctionNFTCards/AuctionNFTDetailCard";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import BidTxModal from "../../../../components/Modals/BidTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";

const customTheme = createTheme({
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
  },
});

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
    paddingTop: "100%",
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

const AuctionNFT = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { nftId, dropId } = useParams();
  const [bidDetail, setBidDetail] = useState([]);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [properties, setProperties] = useState([]);
  const [keys, setKeys] = useState([]);
  const [biddingValue, setBiddingValue] = useState(0);
  const [network, setNetwork] = useState("");
  const [show, setShow] = useState(false);
  const [dropIdObj, setDropIdObj] = useState("");
  const [nftBlockChainId, setNftBlockChainId] = useState("");
  const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
  const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(
    Math.round(bidExpiryTime.getTime() / 1000)
  );
  const [dropExpiryTime, setDropExpiryTime] = useState(new Date());
  const [dropExpiryTimeStamp, setDropExpiryTimeStamp] = useState(
    Math.round(dropExpiryTime.getTime() / 1000)
  );
  const [dropCloneAddress, setDropCloneAddress] = useState("");
  const [contractType, setContractType] = useState("");
  const [price, setPrice] = useState();
  const [versionB, setVersionB] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();

  let getNftDetail = () => {
    // handleShowBackdrop();
    let version = Cookies.get("Version");

    axios
      .get(`/${version}/drop/nft/${nftId}`)
      .then((response) => {
        console.log("Response getting NFT Detail: ", response);
        setNftDetail(response.data.data);
        setDropIdObj(response.data.data.dropId);
        setNftBlockChainId(response.data.data[0].nftId);
        const keys = Object.keys(response.data.data[0].properties);
        console.log("Keys: ", keys);

        setKeys(keys);
        setProperties(response.data.data[0].properties);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  const handleOpenModal = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const dropId = nftDetail.dropId;
    const nftId = nftDetail._id;
    if (
      bidExpiryTimeStamp > dropExpiryTimeStamp ||
      new Date(bidExpiryTime) > new Date(dropExpiryTime)
    ) {
      let variant = "error";
      enqueueSnackbar(
        "Bid Expiry Time cannot be more than Drop's Expiry Time.",
        { variant }
      );
    }
    if (biddingValue === 0) {
      let variant = "error";
      enqueueSnackbar("Bidding Value cannot be zero.", { variant });
    } else {
      axios
        .get(`v1-sso/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`)
        .then(
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
          }
        );
    }
  };

  let getBidList = (nftId) => {
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

  let getDropCloneAddress = () => {
    axios.get(`/drop/${dropId}`).then(
      (response) => {
        console.log("Response from getting drop details: ", response);
        console.log(
          "Response from getting drop details: ",
          response.data.dropData.dropCloneAddress
        );
        setDropCloneAddress(response.data.dropData.dropCloneAddress);
      },
      (err) => {
        console.log("Err from getting drop details: ", err);
        console.log("Err response from getting drop details: ", err.response);
      }
    );
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
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

    console.log("Auction contract address: ", location);
    setDropExpiryTime(new Date(location.state.endTime));
    setDropExpiryTimeStamp(
      Math.round(new Date(location.state.endTime).getTime())
    );
    setContractType(location.state.contractType);
    getNftDetail();
    getDropCloneAddress();
    console.log("price is", location.state.price);
    setPrice(location.state.price);
    getBidList(nftId);

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

  let handleChangeBiddingValue = (event) => {
    if (event.target.value >= 0) {
      setBiddingValue(event.target.value);
    }
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

  let getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  let giveAuctionErc20Approval = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log("Account 0: ", accounts[0]);
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      handleShow();
    } else {
      const addressErc20Auction = Addresses.AuctionERC20;
      const addressDropClone = dropCloneAddress;
      const abiERC20 = ERC20Abi;

      let bidValue = web3.utils.toWei(biddingValue, "ether");

      console.log("Contract Address: ", addressErc20Auction);
      var myContractInstance = await new web3.eth.Contract(
        abiERC20,
        addressErc20Auction
      );
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .approve(addressDropClone, bidValue)
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);

          if (err !== null) {
            console.log("err", err);
            let variant = "error";
            enqueueSnackbar("User Canceled Transaction", { variant });
            handleCloseBackdrop();
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
        });
    }
  };

  let handleBidSubmit = async (event) => {
    event.preventDefault();
    console.log("Bid Expiry Timestamp: ", bidExpiryTimeStamp);
    console.log("Drop Expiry Timestamp: ", dropExpiryTimeStamp);
    console.log("Bid Expiry Time: ", bidExpiryTime);
    console.log("Drop Expiry Time: ", dropExpiryTime);

    if (
      bidExpiryTimeStamp > dropExpiryTimeStamp ||
      new Date(bidExpiryTime) > new Date(dropExpiryTime)
    ) {
      let variant = "error";
      enqueueSnackbar(
        "Bid Expiry Time cannot be more than Drop's Expiry Time.",
        { variant }
      );
    }
    if (biddingValue === 0) {
      let variant = "error";
      enqueueSnackbar("Bidding Value cannot be zero.", { variant });
    } else {
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts[0]: ", accounts[[0]]);
      const network = await web3.eth.net.getNetworkType();
      if (network !== "private") {
        setNetwork(network);
        handleShow();
      } else {
        handleShowBackdrop();
        await giveAuctionErc20Approval();
        let bidData = {
          nftId: nftDetail._id,
          bidAmount: biddingValue.toString(),
          bidderAddress: accounts[0],
          expiryTime: bidExpiryTime,
        };
        console.log("Type of time: ", typeof bidExpiryTime, bidExpiryTime);
        console.log("Bid data: ", bidData);

        let dropIdHash = getHash(dropIdObj);
        let nftId = nftBlockChainId;
        let bidValue = web3.utils.toWei(biddingValue, "ether");

        console.log("NFT id type: ", typeof nftId);
        console.log("Bid Value type: ", typeof bidValue, bidValue);
        console.log("Drop Id Hash: ", dropIdHash);

        let contractAddress;
        let contractAbi;

        if (contractType === "1155") {
          contractAddress = Addresses.AuctionDropFactory1155;
          contractAbi = AuctionDropFactory1155ABI;
          console.log("hello", contractAddress, contractType);
        } else if (contractType === "721") {
          contractAddress = Addresses.AuctionDropFactory721;
          contractAbi = AuctionDropFactory721ABI;
        }

        let myContractInstance = await new web3.eth.Contract(
          contractAbi,
          contractAddress
        );
        let trxHash;

        axios.post(`/auction/bid`, bidData).then(
          (response) => {
            console.log(
              "Response from sending bid data to backend: ",
              response
            );
            let bidIdHash = getHash(response.data.bidId);
            let bidId = response.data.bidId;

            console.log("Bid data for blockchain: ");
            console.log("drop id hash: ", dropIdHash);
            console.log("bid id hash: ", bidIdHash);
            console.log("nft address: ", location.state.nftContractAddress);
            console.log("nft id: ", nftId);
            console.log("bid Value: ", bidValue);

            myContractInstance.methods
              .bid(
                dropIdHash,
                bidIdHash,
                location.state.nftContractAddress,
                nftId,
                bidValue
              )
              .send({ from: accounts[0] }, (err, response) => {
                console.log("get transaction: ", err, response);
                if (err !== null) {
                  console.log("err: ", err);
                  handleCloseBackdrop();
                }
                trxHash = response;
              })
              .on("receipt", (receipt) => {
                console.log("receipt: ", receipt);
                let finalizeBidData = {
                  bidId: bidId,
                  txHash: trxHash,
                };

                axios.put(`/auction/bid/finalize`, finalizeBidData).then(
                  (response) => {
                    console.log("Response from finalize bid: ", response);
                    let variant = "success";
                    enqueueSnackbar("Bid Placed Successfully", { variant });
                  },
                  (err) => {
                    let variant = "error";
                    enqueueSnackbar("Unable To Bid", { variant });
                    console.log("Err from finalize bid: ", err);
                    console.log("Err response from finalize bid: ", err);
                  }
                );
                handleCloseBackdrop();
              });
          },
          (error) => {
            console.log("Error from sending bid data to backend: ", error);
            handleCloseBackdrop();
          }
        );
      }
    }
  };

  let handleBidSubmitSSO = async (event) => {
    event.preventDefault();
    console.log("Bid Expiry Timestamp: ", bidExpiryTimeStamp);
    console.log("Drop Expiry Timestamp: ", dropExpiryTimeStamp);
    console.log("Bid Expiry Time: ", bidExpiryTime);
    console.log("Drop Expiry Time: ", dropExpiryTime);

    if (
      bidExpiryTimeStamp > dropExpiryTimeStamp ||
      new Date(bidExpiryTime) > new Date(dropExpiryTime)
    ) {
      let variant = "error";
      enqueueSnackbar(
        "Bid Expiry Time cannot be more than Drop's Expiry Time.",
        { variant }
      );
    }
    if (biddingValue === 0) {
      let variant = "error";
      enqueueSnackbar("Bidding Value cannot be zero.", { variant });
    } else {
      handleShowBackdrop();
      let bidAmountInWei = Web3.utils.toWei(biddingValue);
      let bidData = {
        nftId: nftDetail._id,
        bidAmount: bidAmountInWei,
        expiryTime: bidExpiryTime,
      };

      console.log("Type of time: ", typeof bidExpiryTime, bidExpiryTime);
      console.log("Bid data: ", bidData);

      axios.post(`/${versionB}/auction/bid`, bidData).then(
        (response) => {
          console.log("nft bid response", response.data);
          let variant = "success";
          enqueueSnackbar(
            "Bid Is Being Finalized. Transactions Are In Process",
            { variant }
          );
          handleCloseModal();
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            let variant = "error";
            enqueueSnackbar("Unable To Bid On NFT.", { variant });
            handleCloseModal();
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
    }
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Market Place</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">Market Place</li>
            </ul>
          </div>
        </div>
      </div>

      <ThemeProvider theme={customTheme}>
        <div className="card-body px-0">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <Paper elevation={5}>
                <NFTMediaCard nftDetail={nftDetail} classes={classes} />
              </Paper>
            </div>
            <div className="col-md-12 col-lg-8">
              <AuctionNFTDetailCard nftDetail={nftDetail} price={price} />
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Accordion style={{ backgroundColor: "black" }}>
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
                            <th>Rarity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {keys?.map((j, index) => (
                            <tr key={index}>
                              <td>{j}</td>
                              <td>{properties[j]}</td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <form>
                    <label style={{ color: "#F64D04", marginTop: "10px" }}>
                      Set Bid Expiry Time
                    </label>
                    <div className="form-group">
                      <DateTimePicker
                        className="form-control"
                        onChange={(e) => {
                          console.log(e);
                          console.log("e.getTime()", Math.round(e.getTime()));
                          setBidExpiryTime(e);
                          setBidExpiryTimeStamp(
                            Number(Math.round(e.getTime()))
                          );
                        }}
                        value={bidExpiryTime}
                        style={{ color: "white", backgroundColor: "black" }}
                      />
                    </div>
                    <label>Bidding value</label>
                    <div className="form-group">
                      <div className="row no-gutters align-items-center">
                        <TextField
                          autoComplete="false"
                          value={biddingValue}
                          variant="outlined"
                          type="number"
                          color="secondary"
                          onChange={(e) => {
                            handleChangeBiddingValue(e);
                          }}
                        />
                        <button
                          className="bidBtn"
                          onClick={(e) => {
                            versionB === "v1-sso"
                              ? handleOpenModal(e)
                              : handleBidSubmit(e);
                          }}
                        >
                          Bid
                        </button>
                      </div>
                    </div>
                  </form>
                </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="body1" style={{ color: "#F64D04" }}>
                        <ListIcon />
                        <strong> Offers</strong>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table striped hover bordered size="sm" responsive>
                        <thead>
                          <tr>
                            <th style={{ padding: "0.75rem" }}>#</th>
                            <th style={{ padding: "0.75rem" }}>Bidder</th>
                            <th style={{ padding: "0.75rem" }}>Bid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bidDetail?.map((bid, index) => (
                            <tr key={index}>
                              <td style={{ padding: "0.75rem" }}>
                                {index + 1}
                              </td>
                              <td style={{ padding: "0.75rem" }}>
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
                              <td style={{ padding: "0.75rem" }}>
                                {bid.bidAmount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </ThemeProvider>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      />
      <BidTxModal
        handleClose={handleCloseModal}
        open={modalOpen}
        handleBid={handleBidSubmitSSO}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
      <CircularBackdrop open={open} />
    </div>
  );
};

export default AuctionNFT;
