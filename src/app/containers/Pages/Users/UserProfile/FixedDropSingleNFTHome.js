import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardMedia,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Web3 from "web3";
import {
  finalizeAuctionBid,
  getBuyNFTTxCostSummary,
  getBuyNFTTxCostSummarySSO,
  getDropDetails,
  getNFTDetailInDrop,
  getTradeHistory,
  marketplaceBuy,
  marketplaceBuyVersioned,
  sendBidData,
  sendBidDataVersioned,
} from "../../../../components/API/AxiosInterceptor";
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
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import TradeHistoryTable from "../../../../components/tables/TradeHistoryTable";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";

const customTheme = createTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "#000",
      },
      expandIcon: {
        color: "white",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "8px 0px 16px",
        backgroundColor: "#000",
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
const styles = {
  border: "1px solid #F64D04",
  borderRadius: "5px",
};
const buttonStyle = {
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "24px",
};

const inputStyle = {
  fontSize: "18px",

  border: "none",
  backgroundColor: "#000",
  color: "white",
  textAlign: "center",
};

const FixedDropSingleNFTHome = () => {
  const [nftData, setNftData] = useState();
  const [theDrop, setTheDrop] = useState();
  const [biddingValue, setBiddingValue] = useState(0);
  const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
  const [orderListing, setOrderListing] = useState();
  const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(
    Math.round(bidExpiryTime.getTime() / 1000)
  );
  const [price, setPrice] = useState();
  const [nftProperties, setNftProperties] = useState({});
  let navigate = useNavigate();
  const location = useLocation();
  let dropID = location.state?.dropId;
  const saleType = location.state?.saleType;
  const imageURL = location.state?.imageURL;
  const bannerURL = location.state?.bannerURL;
  const description = location.state?.description;
  const [modalOpen, setMOdalOpen] = useState(false);
  const [modalOpenBid, setMOdalOpenBid] = useState(false);
  const [tradeHistory, setTradeHistory] = useState([]);

  const [data, setData] = useState();
  const [dataBid, setDataBid] = useState();
  const [dropCloneAddress, setDropCloneAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [versionB, setVersionB] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [nftBlockChainId, setNftBlockChainId] = useState("");
  let account = sessionStorage.getItem("Authorization");
  const { singleNFTid, marketPlace } = useParams();
  let [num, setNum] = useState(1);
  let [tokSupply, setTokSupply] = useState(0);
  let incNum = (max) => {
    if (num < max) {
      setNum(Number(num) + 1);
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Value can't be greater than token supply");
      setSnackbarOpen(true);
    }
  };
  let decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Value can't be negative");
      setSnackbarOpen(true);
    }
  };
  let handleChange = (e) => {
    if (e.target.value <= orderListing?.supply) {
      setNum(e.target.value);
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Value can't be greater than token supply");
      setSnackbarOpen(true);
    }
  };

  const handleGoBack = () => {
    navigate(`/${marketPlace}/fixdropnft/${dropID}`, {
      state: {
        saleType: saleType,
        description: description,
        imageURL: imageURL,
        bannerURL: bannerURL,
        marketplaceId: location.state.marketplaceId,
        dropId: location.state.dropId,
      },
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

    const dropId = nftData?.dropId;
    const nftId = nftData?._id;
    console.log("version", versionB);
    console.log("NFTDETAIL");
    if (biddingValue === 0) {
      setSnackbarMessage("Bidding Value cannot be zero.");
      setSnackbarSeverity("error");
      handleSnackbarOpen();
    } else {
      getBuyNFTTxCostSummarySSO(dropId, nftId).then(
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
    const dropId = nftData?.dropId;
    const nftId = nftData?._id;
    console.log("NFTDETAIL", nftData);

    getBuyNFTTxCostSummary(dropId, nftId)
      .then((response) => {
        console.log("response", response);
        console.log("responeee", response.data.data.data[0]);
        setData(response.data.data);
        setMOdalOpen(true);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
      });
  };

  let handleBidSubmit = async (event) => {
    event.preventDefault();
    console.log("Bid Expiry Timestamp: ", bidExpiryTime);
    console.log("Drop Expiry Time: ", endTime);

    if (
      bidExpiryTime > endTime ||
      new Date(bidExpiryTime) > new Date(endTime)
    ) {
      setSnackbarMessage(
        "Bid Expiry Time cannot be more than Drop's Expiry Time."
      );
      setSnackbarSeverity("error");
      handleSnackbarOpen();
    }
    if (biddingValue === 0) {
      setSnackbarMessage("Bidding Value cannot be zero.");
      setSnackbarSeverity("error");
      handleSnackbarOpen();
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
          nftId: nftData?._id,
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

        if (nftData?.collectionId.contractType === "1155") {
          contractAddress = Addresses.AuctionDropFactory1155;
          contractAbi = AuctionDropFactory1155ABI;
          console.log(
            "hello",
            contractAddress,
            nftData?.collectionId.contractType
          );
        } else if (nftData?.collectionId.contractType === "721") {
          contractAddress = Addresses.AuctionDropFactory721;
          contractAbi = AuctionDropFactory721ABI;
        }

        let myContractInstance = await new web3.eth.Contract(
          contractAbi,
          contractAddress
        );
        let trxHash;

        sendBidData(bidData)
          .then((response) => {
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

                finalizeAuctionBid(finalizeBidData)
                  .then((response) => {
                    console.log("Response from finalize bid: ", response);
                    setSnackbarMessage("Bid Placed Successfully.");
                    setSnackbarSeverity("success");
                    handleSnackbarOpen();
                  })
                  .catch((error) => {
                    setSnackbarMessage("Unable To Bid.");
                    setSnackbarSeverity("error");
                    handleSnackbarOpen();
                    console.log("Err from finalize bid: ", error);
                    console.log("Err response from finalize bid: ", error);
                  });
                handleCloseBackdrop();
              });
          })
          .catch((error) => {
            console.log("Error from sending bid data to backend: ", error);
            handleCloseBackdrop();
          });
      }
    }
  };

  let handleBidSubmitSSO = async (event) => {
    event.preventDefault();
    if (
      bidExpiryTime > endTime ||
      new Date(bidExpiryTime) > new Date(endTime)
    ) {
      setSnackbarMessage(
        "Bid Expiry Time cannot be more than Drop's Expiry Time."
      );
      setSnackbarSeverity("error");
      handleSnackbarOpen();
    }
    if (biddingValue === 0) {
      setSnackbarMessage("Bidding Value cannot be zero.");
      setSnackbarSeverity("error");
      handleSnackbarOpen();
    } else {
      handleShowBackdrop();
      let bidAmountInWei = Web3.utils.toWei(biddingValue);

      let bidData = {
        nftId: nftData?._id,
        bidAmount: bidAmountInWei,
        expiryTime: bidExpiryTime,
      };

      console.log("Type of time: ", typeof bidExpiryTime, bidExpiryTime);
      console.log("Bid data: ", bidData);

      sendBidDataVersioned(versionB, bidData)
        .then((response) => {
          console.log("nft bid response", response.data);
          setSnackbarMessage(
            "Bid Is Being Finalized. Transactions Are In Process."
          );
          setSnackbarSeverity("success");
          handleSnackbarOpen();
          handleCloseModal();
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            setSnackbarMessage("Unable To Bid On NFT.");
            setSnackbarSeverity("error");
            handleSnackbarOpen();
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
        });
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
            setSnackbarMessage("User Canceled Transaction.");
            setSnackbarSeverity("error");
            handleSnackbarOpen();
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
    if (num <= 0 || num === undefined || num === null || num === "") {
      let variant = "error";
      setSnackbarMessage("Supply must be greater than 0");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      console.log("Authorization", sessionStorage.getItem("Authorization"));
      console.log("Nft detail: ", nftData);

      // endpoint body

      let data = {
        supply: num,
        orderListingId: location.state.orderListingId,
      };

      //debugging 

      console.log("Data", data);
      console.log("Purchase Function Called");
      console.log("NFT ID");

      marketplaceBuy(data)
        .then((response) => {
          localStorage.setItem("sessionId", response.data.checkoutSessionId);
          window.location.replace(response.data.stripeSession);
        })
        .catch((error) => {
          console.log("Transaction hash on backend error: ", error.response);
        });
    }
  };

  let handleBuy = async () => {
    console.log("Nft detail: ", nftData);
    console.log("Price", nftData);
    console.log("INSIDE BUY FUNCTION");
    let dropIdHex = getHash(nftData?.dropId);
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
      if (nftData?.collectionId.contractType === "1155") {
        console.log("IN 1155");
        addressApprove = addressDropFactory1155;
      } else if (nftData?.collectionId.contractType === "721") {
        console.log("IN 721");
        addressApprove = addressDropFactory721;
      }

      var erc20Instance = await new web3.eth.Contract(abiERC20, addressERC20);
      let userBalance = await erc20Instance.methods
        .balanceOf(accounts[0])
        .call();
      console.log(userBalance);
      if (userBalance < nftData?.currentOrderListingId.price) {
        setSnackbarMessage("User have insufficient funds to buy this NFT.");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        erc20Instance.methods
          .approve(addressApprove, nftData?.currentOrderListingId.price)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
          })
          .on("receipt", async (receipt) => {
            console.log("approval receipt", receipt);
            if (nftData?.collectionId.contractType === "1155") {
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory1155,
                addressDropFactory1155
              );
              console.log("myContractInstance", myContractInstance);
              await myContractInstance.methods
                .executeOrder(
                  dropIdHex,
                  nftData?.collectionId.nftContractAddress,
                  nftData?.nftId,
                  orderListing?.supply,
                  nftData?.currentOrderListingId.price
                )
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("get transaction", err, response);
                  let data = {
                    dropId: nftData?.dropId,
                    nftId: nftData?._id,
                    txHash: response,
                  };

                  console.log("data", data);
                  marketplaceBuy(data)
                    .then((response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    })
                    .catch((error) => {
                      console.log(
                        "Transaction hash on backend error: ",
                        error.response
                      );
                    });
                  if (err !== null) {
                    console.log("err", err);
                    setSnackbarMessage("User Canceled Transaction.");
                    setSnackbarSeverity("error");
                    handleSnackbarOpen();
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt", receipt);
                  setSnackbarMessage("NFT Bought Successfully");
                  setSnackbarSeverity("success");
                  handleSnackbarOpen();
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            } else if (nftData?.collectionId.contractType === "721") {
              console.log("LAZY MINTING");
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory721,
                addressDropFactory721
              );
              console.log("myContractInstance Drop 721", myContractInstance);
              await myContractInstance.methods
                .executeOrderLazyMint(
                  dropIdHex,
                  nftData?.collectionId.nftContractAddress,
                  nftData?.nftId,
                  nftData?.nftURI,
                  nftData?.currentOrderListingId.price,
                  nftData?.voucherSignature
                )
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("get transaction", err, response);
                  let data = {
                    dropId: nftData?.dropId,
                    nftId: nftData?._id,
                    txHash: response,
                  };

                  console.log("data", data);
                  marketplaceBuyVersioned(versionB, data)
                    .then((response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    })
                    .catch((error) => {
                      console.log(
                        "Transaction hash on backend error: ",
                        error.response
                      );
                    });
                  if (err !== null) {
                    console.log("err", err);
                    setSnackbarMessage("User Canceled Transaction.");
                    setSnackbarSeverity("error");
                    handleSnackbarOpen();
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt lazy mint", receipt);
                  setSnackbarMessage("NFT Bought Successfully");
                  setSnackbarSeverity("success");
                  handleSnackbarOpen();
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
    console.log("Nft detail id: ", nftData?.collectionId._id);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftData?.dropId,
      nftId: nftData?._id,
    };
    handleCloseModal();
    marketplaceBuy(data)
      .then((response) => {
        console.log("nft buy response", response.data);
        setSnackbarMessage("NFT Bought Successfully");
        setSnackbarSeverity("success");
        handleSnackbarOpen();
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          setSnackbarMessage("Unable To Buy NFT.");
          setSnackbarSeverity("error");
          handleSnackbarOpen();
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
      });
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
    getNFTDetailInDrop(singleNFTid)
      .then((response) => {
        console.log(endpoint, " /// Endpoint for V2");
        console.log("finding the price: ... ", response);
        setNftData(response.data.data);
      })
      .catch((error) => {
        console.log("Could not get NFT details: ", error.response);
      });
  };

  let getTheDrop = () => {
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/drop/${dropID}`;
    } else {
      endpoint = `/drop/${dropID}`;
    }
    getDropDetails(dropID)
      .then((response) => {
        setTheDrop(response.data.dropData);
        setStartTime(new Date(response.data.dropData.startTime));
        setEndTime(new Date(response.data.dropData.endTime));
        setDropCloneAddress(response.data.dropData.dropCloneAddress);
      })
      .catch((error) => {
        console.log("could not get the drop ", error.response);
      });
  };

  const getTradeHistoryDetail = (nftId) => {
    getTradeHistory(nftId)
      .then((response) => {
        // console.log("Response from getting trade history: ", response);
        setTradeHistory(response?.data?.history);
      })
      .catch((error) => {
        console.log("Error from getting trade history: ", error);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setVersionB(Cookies.get("Version"));
    console.log("location.state in", location.state);
    setNftData(location.state?.nftDetails);
    setOrderListing(location.state?.orderListing);
    // setNum(location.state?.orderListing?.supply);
    setNftBlockChainId(location.state?.nftDetails?.nftId);
    setNftProperties(Object.entries(location.state?.nftDetails?.properties));
    getTradeHistoryDetail(location.state?.nftDetails?._id);
    getTheDrop();
    let priceCal = location.state?.nftDetails?.currentOrderListingId.price;
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
                    <Card
                      sx={{
                        flexGrow: 1,
                        width: "100%",
                        backgroundColor: "#000",
                      }}
                    >
                      <div style={{ marginTop: "20px" }}>
                        <CardMedia
                          sx={{
                            height: 0,
                            paddingTop: "100%",
                          }}
                          title={nftData?.title}
                          image={
                            nftData.previewImageURI
                              ? nftData?.previewImageURI
                              : nftData?.nftURI
                          }
                        />
                      </div>
                    </Card>
                  </Paper>
                  <div>
                    {nftData.previewImageURI !== "" ? (
                      nftData.nftFormat === "mp3" ? (
                        <div
                          className="w-100"
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <AudioPlayer
                              style={{ borderRadius: "1rem" }}
                              autoPlay
                              layout="horizontal"
                              src={nftData?.nftURI}
                              onPlay={(e) => console.log("onPlay")}
                              showSkipControls={false}
                              showJumpControls={false}
                              header={`Now playing: ${nftData.title}`}
                              showDownloadProgress
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="w-100"
                          style={{
                            display: "flex",
                            margin: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <GLTFModel
                            src={nftData.nftURI}
                            width={250}
                            height={250}
                          >
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
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
                      )
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 col-lg-8 pl-md-3">
                  <FixedDropSingleNFTCard
                    nftData={nftData}
                    orderListing={orderListing}
                    price={price * num}
                    num={num}
                    setNum={setNum}
                    setSnackbarSeverity={setSnackbarSeverity}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    handleChange={handleChange}
                    buttonStyle={buttonStyle}
                    styles={styles}
                    inputStyle={inputStyle}
                    singleNFTPrice={price}
                  />
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col>
                      <Accordion style={{ background: "black" }}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon style={{ color: "white" }} />
                          }
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <BlurLinearIcon />
                            <strong> Properties</strong>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {nftProperties[0][0] !== "" &&
                          nftProperties.length != 0 ? (
                            <Table striped bordered hover>
                              <thead style={{ background: "black" }}>
                                <tr>
                                  <th>Key</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                              <tbody style={{ background: "black" }}>
                                {nftProperties?.map((i, index) => (
                                  <tr key={index}>
                                    <td>{i[0]}</td>
                                    <td>{i[1]}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ) : (
                            <MessageCard msg="No Properties" />
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>

                  {/* DISPLAYING TRADE HISTORY */}
                  <Row>
                    <Col>
                      <Accordion style={{ background: "black" }}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon style={{ color: "white" }} />
                          }
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <BlurLinearIcon />
                            <strong> Trade History</strong>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {tradeHistory !== "" && tradeHistory.length != 0 ? (
                            <TradeHistoryTable tradeHistory={tradeHistory} />
                          ) : (
                            <MessageCard msg="No Trade History" />
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <br></br>
                  {theDrop?.saleType !== "auction" ? (
                    <div className="row no-gutters">
                      {account &&
                      nftData?.currentOrderListingId.isSold === false &&
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
                            {nftData?.supplyType == "Variable" && (
                              <span> {num}</span>
                            )}
                            {nftData?.supplyType == "Variable" && (
                              <span> Now</span>
                            )}
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
                            onClick={(e) => {
                              console.log(e);
                              if (!account) {
                                navigate("/user-account");
                              }
                            }}
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
                          ) : nftData?.currentOrderListingId.isSold === true ? (
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
                                  backgroundColor: "#000",
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
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default FixedDropSingleNFTHome;
