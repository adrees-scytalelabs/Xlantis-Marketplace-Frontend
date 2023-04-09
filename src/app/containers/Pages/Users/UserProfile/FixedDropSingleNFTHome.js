import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardMedia,
  Paper,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListIcon from "@material-ui/icons/List";
import transakSDK from "@transak/transak-sdk";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Web3 from "web3";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import FixedDropSingleNFTCard from "../../../../components/Cards/FixedDropSingleNFTCard";
import Footer from "../../../../components/Footers/Footer";
import HeaderHome from "../../../../components/Headers/Header";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import BidTxModal from "../../../../components/Modals/BidTxModal";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import AuctionDropFactory1155ABI from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import AuctionDropFactory721ABI from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import ERC20Abi from "../../../../components/blockchain/Abis/AuctionERC20.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";

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
    MuiCardContent: {
      root: {
        padding: "16px 0px",
      },
    },
  },
});

const FixedDropSingleNFTHome = () => {
  const [nftData, setNftData] = useState();
  const [theDrop, setTheDrop] = useState();
  const [biddingValue, setBiddingValue] = useState(0);
  const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
  const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(
    Math.round(bidExpiryTime.getTime() / 1000)
  );
  const [price, setPrice] = useState();
  const [nftProperties, setNftProperties] = useState({});
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();
  let dropID = location.state.dropId;
  const saleType = location.state.saleType;
  const description = location.state.description;
  const [modalOpen, setMOdalOpen] = useState(false);
  const [modalOpenBid, setMOdalOpenBid] = useState(false);

  const [data, setData] = useState();
  const [dataBid, setDataBid] = useState();
  let [dropCloneAddress, setDropCloneAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  let [versionB, setVersionB] = useState("");
  let [startTime, setStartTime] = useState();
  let [endTime, setEndTime] = useState();
  const [nftBlockChainId, setNftBlockChainId] = useState("");
  let account = sessionStorage.getItem("Authorization");
  const { singleNFTid } = useParams();
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
  const handleCloseModal = () => {
    setMOdalOpen(false);
  };
  const handleCloseModalBid = () => {
    setMOdalOpenBid(false);
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

  const handleOpenModalBid = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const dropId = nftData.dropId;
    const nftId = nftData._id;
    console.log("version", versionB);
    console.log("NFTDETAIL");
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

  const handleOpenModal = async (e) => {
    const dropId = nftData.dropId;
    const nftId = nftData._id;
    console.log("NFTDETAIL", nftData);
    axios.get(`/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`).then(
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
  };

  let handleBidSubmit = async (event) => {
    event.preventDefault();
    console.log("Bid Expiry Timestamp: ", bidExpiryTime);
    console.log("Drop Expiry Time: ", endTime);

    if (
      bidExpiryTime > endTime ||
      new Date(bidExpiryTime) > new Date(endTime)
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
      } else {
        handleShowBackdrop();
        await giveAuctionErc20Approval();

        let bidData = {
          nftId: nftData._id,
          bidAmount: biddingValue.toString(),
          bidderAddress: accounts[0],
          expiryTime: bidExpiryTime,
        };

        console.log("Type of time: ", typeof bidExpiryTime, bidExpiryTime);
        console.log("Bid data: ", bidData);

        let dropIdHash = getHash(theDrop._id);
        let nftId = nftBlockChainId;
        let bidValue = web3.utils.toWei(biddingValue, "ether");

        console.log("NFT id type: ", typeof nftId);
        console.log("Bid Value type: ", typeof bidValue, bidValue);
        console.log("Drop Id Hash: ", dropIdHash);

        let contractAddress;
        let contractAbi;

        if (nftData.collectionId.contractType === "1155") {
          contractAddress = Addresses.AuctionDropFactory1155;
          contractAbi = AuctionDropFactory1155ABI;
          console.log(
            "hello",
            contractAddress,
            nftData.collectionId.contractType
          );
        } else if (nftData.collectionId.contractType === "721") {
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
    if (
      bidExpiryTime > endTime ||
      new Date(bidExpiryTime) > new Date(endTime)
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
        nftId: nftData._id,
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

  let giveAuctionErc20Approval = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log("Account 0: ", accounts[0]);
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
    } else {
      const addressErc20Auction = Addresses.AuctionERC20;
      const addressDropClone = dropCloneAddress;
      const abiERC20 = ERC20Abi;

      let bidValue = web3.utils.toWei(biddingValue, "ether");
      var myContractInstance = await new web3.eth.Contract(
        abiERC20,
        addressErc20Auction
      );

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
  let handlePurchase = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    console.log("Authorization", sessionStorage.getItem("Authorization"));
    console.log("Nft detail: ", nftData);
    let data = {
      dropId: nftData.dropId,
      nftId: nftData._id,
    };
    console.log("Data", data);
    console.log("Purchase Function Called");
    console.log("NFT ID");
    axios.post(`marketplace/buy`, data).then(
      (response) => {
        console.log("Transaction Hash sending on backend response: ", response);
        console.log("Stripe Url", response.data.stripeSession);
        window.location.replace(response.data.stripeSession);
      },
      (error) => {
        console.log("Transaction hash on backend error: ", error.response);
      }
    );
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
                  axios.post(`/marketplace/buy`, data).then(
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
    console.log("Nft detail: ", nftData);
    console.log("Price", nftData);
    console.log("Nft detail id: ", nftData.collectionId._id);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftData.dropId,
      nftId: nftData._id,
    };
    handleCloseModal();
    axios.post(`/marketplace/buy`, data).then(
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
      }
    );
  }

  const getNFTDetails = () => {
    let version = Cookies.get("Version");

    console.log(version, " /// version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/drop/nft/${singleNFTid}`;
    } else {
      endpoint = `/drop/nft/${singleNFTid}`;
    }
    axios.get(endpoint).then(
      (res) => {
        console.log(endpoint, " /// Endpoint for V2");
        console.log("finding the price: ... ", res);
        setNftData(res.data.data);
      },
      (err) => console.log("Could not get NFT details: ", err.response)
    );
  };

  let getTheDrop = () => {
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/drop/${dropID}`;
    } else {
      endpoint = `/drop/${dropID}`;
    }
    axios.get(endpoint).then(
      (res) => {
        setTheDrop(res.data.dropData);
        setStartTime(new Date(res.data.dropData.startTime));
        setEndTime(new Date(res.data.dropData.endTime));
        setDropCloneAddress(res.data.dropData.dropCloneAddress);
      },
      (err) => {
        console.log("could not get the drop ", err.response);
      }
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    setVersionB(Cookies.get("Version"));
    setNftData(location.state.nftDetails);
    setNftBlockChainId(location.state.nftDetails.nftId);
    setNftProperties(Object.entries(location.state.nftDetails.properties));
    getTheDrop();
    let priceCal = location.state.nftDetails.currentMarketplaceId.price;
    setPrice(priceCal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
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
                <div className="col-md-12 col-lg-4 pr-md-3">
                  <Paper elevation={5}>
                    <Card className={classes.root}>
                      <div style={{ marginTop: "20px" }}>
                        <CardMedia
                          className={classes.media}
                          title={nftData?.title}
                          image={nftData?.nftURI}
                        />
                      </div>
                    </Card>
                  </Paper>
                </div>
                <div className="col-md-12 col-lg-8 pl-md-3">
                  <FixedDropSingleNFTCard nftData={nftData} price={price} />
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
                            </tbody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <br></br>
                  {theDrop?.saleType !== "auction" ? (
                    <div className="row no-gutters">
                      {account &&
                      nftData.currentMarketplaceId.isSold === false &&
                      new Date() >= startTime &&
                      new Date() < endTime ? (
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                          <button
                            className="bidBtn w-100"
                            type="button"
                            onClick={(e) => {
                              versionB === "v1-sso"
                                ? handlePurchase(e)
                                : handleBuy(e);
                            }}
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
                            onClick={(e) => console.log(e)}
                          >
                            Buy
                          </button>

                          {!account ? (
                            <ReactTooltip
                              id="registerTip"
                              place="top"
                              effect="solid"
                            >
                              Please Login First!
                            </ReactTooltip>
                          ) : nftData?.currentMarketplaceId.isSold === true ? (
                            <ReactTooltip
                              id="registerTip"
                              place="top"
                              effect="solid"
                            >
                              NFT has been sold out
                            </ReactTooltip>
                          ) : new Date() < startTime ? (
                            <ReactTooltip
                              id="registerTip"
                              place="top"
                              effect="solid"
                              style={{ color: "white" }}
                            >
                              Sale Has Not Started Yet
                            </ReactTooltip>
                          ) : new Date() > endTime ? (
                            <ReactTooltip
                              id="registerTip"
                              place="top"
                              effect="solid"
                            >
                              Sale Has Ended
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
                                    onClick={(e) => {
                                      versionB === "v1-sso"
                                        ? handleOpenModalBid(e)
                                        : handleBidSubmit(e);
                                    }}
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
                                  </tr>
                                </thead>
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
                <MessageCard msg="No items to display" />
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
      />
      <BidTxModal
        handleClose={handleCloseModalBid}
        open={modalOpenBid}
        handleBid={handleBidSubmitSSO}
        handlePay={openTransak}
        dropData={dataBid}
        isOpen={modalOpenBid}
      />
      <BuyTxModal
        handleClose={handleCloseModal}
        open={modalOpen}
        handleBuy={SSOBuy}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
      <CircularBackdrop open={open} />
    </>
  );
};

export default FixedDropSingleNFTHome;
