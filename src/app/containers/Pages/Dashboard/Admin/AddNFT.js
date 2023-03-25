import {
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
// import { response } from 'express';
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import AuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import AuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import CreateNFTContract from "../../../../components/blockchain/Abis/Collectible1155.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import { ContactSupportOutlined, EventRounded, Web } from "@material-ui/icons";
import crypto from "crypto";
import PublishDropModal from "../../../../components/Modals/PublishDropModal";
import transakSDK from "@transak/transak-sdk";
import Tooltip from "@material-ui/core/Tooltip";

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
  media: {
    // height: 0,
    width: "100%",
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
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.625rem 0rem 0.25rem 0rem",
    lineHeight: "1.2",
    fontSize: "1rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "0.875rem",
    // marginTop: "0.15rem",
  },
}));

const makeTheme = createMuiTheme({
  // overrides: {
  //   MuiOutlinedInput: {
  //     root: {
  //       border: "1px solid #fff",
  //       padding: "6px 15px !important",
  //       borderRadius: "5px",
  //     },
  //   },
  //   MuiAutocomplete: {
  //     inputRoot: {
  //       padding: "6px 15px !important",
  //     },
  //   },
  // },
  overrides: {
    MuiTextField: {
      root: {
        border: "1px solid #fff",
        borderRadius: 5,
      },
    },
    MuiOutlinedInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "1px solid #fff",
        "&$focused": {},
      },
    },
    MuiInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        padding: "6px 15px !important",
        "&$focused": {},
      },
      underline: {
        "&$before": {},
        "&::after": {
          border: "none !important",
        },
      },
    },
    MuiAutocomplete: {
      inputRoot: {},
    },
    MuiIconButton: {
      root: {
        color: "#fff !important",
      },
    },
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
  },
});

function AddNFT(props) {
  let location = useLocation();
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  let [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
  let [isSaving, setIsSaving] = useState(false);
  const [enableTime, setEnableTime] = useState(false);
  let [dropId, setDropId] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  let [nftList, setNftList] = useState([]);
  let [collectionTypes, setCollectionTypes] = useState([]);
  let [collection, setCollection] = useState("");
  let [isAdded, setIsAdded] = useState(false);
  let [nftContractAddresses, setNftContractAddress] = useState("");
  let [collectionId, setCollectionId] = useState("");
  let [changeCollectionList, setChangeCollectionList] = useState([]);
  let [nftName, setNftName] = useState("");
  let [nftURI, setNftURI] = useState("");
  let [nftTokenSupply, setNftTokenSupply] = useState(0);
  let [nftDetail, setNftDetail] = useState({});
  let [openDialog, setOpenDialog] = useState(false);
  let [openEditModal, setOpenEditModal] = useState(false);
  let [nftId, setNftId] = useState("");
  let [tokenId, setTokenId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let [isUploadingData, setIsUploadingData] = useState(false);
  let [price, setPrice] = useState(0);
  let [supply, setSupply] = useState(1);
  let [saleType, setSaleType] = useState("");
  let [nftType, setNftType] = useState("");
  let [versionB, setVersionB] = useState("");
  const [startTimeStamp, setStartTimeStamp] = useState(
    Math.round(startTime.getTime() / 1000)
  );
  const [endTimeStamp, setEndTimeStamp] = useState(
    Math.round(endTime.getTime() / 1000)
  );
  let [dropInfo, setDropInfo] = useState([]);
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();

  const handleOpenModal = async (e) => {
    axios.get(`/drop/${dropId}/tx-cost-summary`).then(
      (response) => {
        console.log("response of tx-cost summary", response);
        console.log("responeee", response.data.data.collectionTxSummary);
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

  const getTxSummary = (dropId) => {
    axios.get(`/drop/${dropId}/tx-cost-summary`).then(
      (response) => {
        console.log("response", response);
        setData(response.data);

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

  let getCollections = () => {
    const version = Cookies.get("Version");
    console.log("version", version);
    console.log("NFT TYPE", location.state.nftType);

    axios.get(`/collection/collections/${location.state.nftType}`).then(
      (response) => {
        console.log("response", response);
        setChangeCollectionList(response.data.collectionData);
        console.log("COLLECTION", changeCollectionList);
        setCollectionTypes(...collectionTypes, response.data.collectionData);
        console.log(collectionTypes);
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

            window.location.reload();
          }
        }
      }
    );
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

  let getNfts = (id) => {
    axios.get(`/nft/${id}`).then(
      (response) => {
        const nft = response.data.data;
        console.log("nft response", nft);
        console.log("nft title response", response.data.data[0].title);

        setNftList(response.data.data);
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

            window.location.reload();
          }
        }
      }
    );
  };

  let handlePublish = () => {
    let dropData = {
      dropId,
    };
    axios.post(`/drop/finalize`, dropData).then(
      (response) => {
        console.log("nft title response", response.data);
        let variant = "success";
        enqueueSnackbar(
          "Drop Is Being Finalized. Transactions Are In Process",
          { variant }
        );
        handleCloseModal();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Unable To Publish Drop.", { variant });
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
    // getProfileData();
    setIsDisabled(false);
    setVersionB(Cookies.get("Version"));
    setEnableTime(false);
    setDropId(location.state.dropId);
    // setStartTime(Math.round(location.state.startTime));
    // console.log("START TIME COMING", location.state.startTime);
    // console.log("End TIME COMING", location.state.endTime);

    // setEndTime(location.state.endTime);
    setSaleType(location.state.saleType);
    let type = location.state.nftType;
    setNftType(type);
    console.log("dropid", dropId);

    getCollections();

    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      settings: "",
      myNFTs: "",
      mySeason: "",
      myDrops: "",
      myCubes: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "active",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
    }); // eslint-disable-next-line
  }, []);
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
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setEnableTime(true);
  };
  const handleTimeEvent = async (event) => {
    event.preventDefault();
    if (
      startTimeStamp === endTimeStamp ||
      new Date(startTime) === new Date(endTime)
    ) {
      let variant = "error";
      enqueueSnackbar("Drop cannot be Start and End on same time.", {
        variant,
      });
      setIsSaving(false);
      handleCloseBackdrop();
    } else if (
      startTimeStamp > endTimeStamp ||
      new Date(startTime) > new Date(endTime)
    ) {
      let variant = "error";
      enqueueSnackbar("Drop end time must be greater than Start time.", {
        variant,
      });
      setIsSaving(false);
      handleCloseBackdrop();
    } else if (
      currentTimeStamp >= startTimeStamp ||
      new Date(Date.now()) >= new Date(startTime)
    ) {
      let variant = "error";
      enqueueSnackbar("Drop start time must be greater than Current time.", {
        variant,
      });
      setIsSaving(false);
      handleCloseBackdrop();
    } else {
      let data = {
        dropId: dropId,
        startTime: startTime,
        endTime: endTime,
      };

      axios.patch(`/drop/start-time`, data).then(
        (response) => {
          console.log("response of drop/start-time: ", response);
          let variant = "success";
          enqueueSnackbar("Time Successfully Updated.", { variant });
        },
        (error) => {
          console.log("Error on drop/start-time: ", error);
          console.log("Error Response of drop/start-time: ", error.response);
          let variant = "error";
          enqueueSnackbar("Unable to set Time", { variant });
        }
      );
    }
  };
  const dropStatus = async (event, web3, accounts) => {
    event.preventDefault();
    let data = {
      dropId: dropId,
    };

    console.log("data", data);

    axios.put(`/drop/status/pending`, data).then(
      (response) => {
        console.log("drop status pending response: ", response);
        setIsUploadingData(false);
        handleCloseBackdrop();
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);

        setIsUploadingData(false);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Add Nft To Drop.", { variant });
      }
    );
  };
  const handleFixedPrice = async (
    event,
    web3,
    accounts,
    address,
    abi,
    dropCloneId
  ) => {
    event.preventDefault();
    if (nftType === "721") {
      address = Addresses.FactoryDrop721;
      abi = DropFactory721;
    } else if (nftType === "1155") {
      address = Addresses.FactoryDrop1155;
      abi = DropFactory1155;
    }

    console.log("Contract Address: ", address);
    var myContractInstance = await new web3.eth.Contract(abi, address);
    console.log("myContractInstance", myContractInstance);

    console.log("Start TIME", startTime);
    console.log("end time", endTime);
    console.log("drop", dropInfo);
    try {
      await myContractInstance.methods
        .createDrop(
          dropCloneId,
          Math.round(startTimeStamp),
          endTimeStamp,
          dropInfo
        )
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);
          let data = {
            dropId: dropId,
            txHash: response,
          };
          console.log("data", data);
          axios.put(`/drop/txHash`, data).then(
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
          enqueueSnackbar("New Drop Created Successfully.", { variant });
          setIsAdded(false);
          handleCloseBackdrop();
          setIsSaving(false);
          history.goBack();
        });
    } catch (e) {
      console.log("Fixed Price not work properly", e);
    }
  };
  const handleAuction = async (
    event,
    web3,
    accounts,
    address,
    abi,
    dropCloneId
  ) => {
    if (nftType === "721") {
      address = Addresses.AuctionDropFactory721;
      abi = AuctionDropFactory721;
    } else if (nftType === "1155") {
      address = Addresses.AuctionDropFactory1155;
      abi = AuctionDropFactory1155;
    }

    console.log("Contract Address: ", address);
    var myContractInstance = await new web3.eth.Contract(abi, address);
    console.log("myContractInstance", myContractInstance);

    console.log("Start TIME", startTime);
    console.log("end time", endTime);
    console.log("drop", dropInfo);
    try {
      await myContractInstance.methods
        .createAuctionDrop(
          dropCloneId,
          Math.round(startTimeStamp),
          endTimeStamp,
          dropInfo
        )
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);
          let data = {
            dropId: dropId,
            txHash: response,
          };
          console.log("data", data);
          axios.put(`/drop/txHash`, data).then(
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
          enqueueSnackbar("New Drop Created Successfully.", { variant });
          setIsAdded(false);
          handleCloseBackdrop();
          setIsSaving(false);
          history.goBack();
        });
    } catch (e) {
      console.log("Contract Issue", e);
    }
  };
  const handleResponse = async (event) => {
    event.preventDefault();
    console.log("SaleType", saleType);
    await networkChecker(event);
  };
  const networkChecker = async (event) => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      handleShowBackdrop();
      setIsUploadingData(true);

      // await handleResponse(event);
      await dropStatus(event);
      let dropCloneId = getHash(dropId);
      let address;
      let abi;
      if (saleType === "fixed-price") {
        try {
          await handleFixedPrice(
            event,
            web3,
            accounts,
            address,
            abi,
            dropCloneId
          );
        } catch (e) {
          console.log("Error due to Fixed Price", e);
        }
      } else if (saleType === "auction") {
        try {
          await handleAuction(event, web3, accounts, address, abi, dropCloneId);
        } catch (e) {
          console.log("Error due to Auction", e);
        }
      }
    }
  };

  const handleDropData = async (event, web3, accounts) => {
    event.preventDefault();
    handleResponse(event, web3, accounts);
  };
  const handlePublishEvent = async (event) => {
    event.preventDefault();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log("Checker testing");
    setIsSaving(true);
    await handleTimeEvent(event);
    await handleDropData(event, web3, accounts);
  };
  // approval
  // let giveApproval = async() => {
  //     await loadWeb3();
  //     const web3 = window.web3
  //     const accounts = await web3.eth.getAccounts();
  //     const network = await web3.eth.net.getNetworkType()
  //     if (network !== 'goerli') {
  //         setNetwork(network);
  //         setIsSaving(false);
  //         handleShow();
  //     }
  //     else{

  //     const addressNft = nftContractAddresses;
  //     const addressDropFactory = Addresses.FactoryDrop721;
  //     const addressAuctionFactory = Addresses.AuctionDropFactory;
  //     const abiNft = CreateNFTContract;

  //     console.log("Contract Address: ", nftContractAddresses);
  //     var myContractInstance = await new web3.eth.Contract(abiNft, addressNft);
  //     console.log("myContractInstance", myContractInstance)

  //     await myContractInstance.methods.setApprovalForAll(addressDropFactory, true).send({from : accounts[0]}, (err, response) => {
  //         console.log('get transaction', err, response);

  //         if (err !== null) {
  //             console.log("err", err);
  //             let variant = "error";
  //             enqueueSnackbar('User Canceled Transaction', { variant });
  //             handleCloseBackdrop();
  //             setIsSaving(false);

  //         }

  //     })
  //     .on('receipt', (receipt) => {
  //         console.log("receipt", receipt);
  //     })
  //     }
  // }

  // handle click event of the Add button
  const handleAddClick = async (e) => {
    e.preventDefault();
    console.log("HANDLE ADD");
    if (nftType === "1155") {
      if (collection === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Collection", { variant });
      } else if (nftName === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Nft", { variant });
      } else if (supply === 0 || supply === undefined || supply === null) {
        let variant = "error";
        enqueueSnackbar("Token Supply cannot be 0 or empty", { variant });
      } else if (supply < 0) {
        let variant = "error";
        enqueueSnackbar("Token Supply cannot be Negative", { variant });
      } else if (price === 0 || price === undefined || price === null) {
        let variant = "error";
        enqueueSnackbar("Price cannot be 0 or empty", { variant });
      } else if (supply > nftTokenSupply) {
        let variant = "error";
        enqueueSnackbar("Supply cannot be greater than NFT token supply", {
          variant,
        });
      } else if (price < 0) {
        let variant = "error";
        enqueueSnackbar("Price cannot be Negative", { variant });
      } else {
        console.log("AFTER CHECKS");
        handleShowBackdrop();
        setIsUploadingData(true);

        let Price = price;
        //sending data to backend
        let data;
        let newObject;
        console.log("before check");
        if (nftType === "1155") {
          console.log("ERC1155 DATA");
          data = {
            // "collectionId": collectionId,
            nftId: nftId,
            dropId: dropId,
            price: Price,
            supply: parseInt(supply),
          };

          newObject = {
            nftContractAddress: nftContractAddresses,
            tokenIds: [tokenId],
            amounts: [parseInt(supply)],
            prices: [Price],
          };
        }

        console.log("data", data);

        console.log("new obj", newObject);

        axios.put(`/drop/nft`, data).then(
          (response) => {
            console.log("nft drop add response: ", response);
            console.log("time", startTime, endTime);

            setIsAdded(true);
            let found = false;
            if (nftType === "1155") {
              console.log("SET ERC1155 DATA");

              setDropInfo((current) =>
                current.map((obj) => {
                  if (obj.nftContractAddress === nftContractAddresses) {
                    let tokens = obj.tokenIds.concat(newObject.tokenIds);
                    let amount = obj.amounts.concat(newObject.amounts);
                    let price = obj.prices.concat(newObject.prices);
                    found = true;

                    return {
                      ...obj,
                      tokenIds: tokens,
                      amounts: amount,
                      prices: price,
                    };
                  }

                  return obj;
                })
              );

              if (found === false) {
                const dropp = [...dropInfo, newObject];
                // giveApproval();
                console.log("drop", dropp);
                console.log("here");
                setDropInfo(dropp);
              }

              let variant = "success";
              enqueueSnackbar("NFT Added Successfully", { variant });
            }

            console.log(dropInfo);

            setIsUploadingData(false);
            handleCloseBackdrop();
          },
          (error) => {
            console.log("Error on drop add nft: ", error);
            console.log("Error on drop add nft: ", error.response);

            setIsUploadingData(false);

            handleCloseBackdrop();

            let variant = "error";
            enqueueSnackbar("Unable to Add Nft To Drop.", { variant });
          }
        );
      }
    } else if (nftType === "721") {
      if (collection === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Collection", { variant });
      }
      // else if (nftName === "") {
      //   let variant = "error";
      //   enqueueSnackbar("Please Select Nft", { variant });
      // }
      else if (price === 0 || price === undefined || price === null) {
        let variant = "error";
        enqueueSnackbar("Price cannot be 0 or empty", { variant });
      } else if (price < 0) {
        let variant = "error";
        enqueueSnackbar("Price cannot be Negative", { variant });
      } else {
        console.log("AFTER CHECKS");
        handleShowBackdrop();
        setIsUploadingData(true);

        let Price = price;
        //sending data to backend
        let data;
        let newObject;
        console.log("before check");
        if (nftType === "721") {
          console.log("ERC721 DATA");

          data = {
            // "collectionId": collectionId,
            nftId: nftId,
            dropId: dropId,
            price: Price,
            // "supply": parseInt(supply)
          };

          newObject = {
            nftContractAddress: nftContractAddresses,
            tokenIds: [tokenId],
            // "amounts" : [parseInt(supply)],
            prices: [Price],
          };
        }
        console.log("data", data);

        console.log("new obj", newObject);

        axios.put(`/drop/nft`, data).then(
          (response) => {
            console.log("nft drop add response: ", response);
            console.log("time", startTime, endTime);
            setIsAdded(true);
            let found = false;

            if (nftType === "721") {
              console.log("SET 721 DATA");

              setDropInfo((current) =>
                current.map((obj) => {
                  if (obj.nftContractAddress === nftContractAddresses) {
                    let tokens = obj.tokenIds.concat(newObject.tokenIds);
                    // let amount = obj.amounts.concat(newObject.amounts);
                    let price = obj.prices.concat(newObject.prices);
                    found = true;

                    return {
                      ...obj,
                      tokenIds: tokens,
                      // amounts : amount,
                      prices: price,
                    };
                  }

                  return obj;
                })
              );

              if (found === false) {
                const dropp = [...dropInfo, newObject];
                // giveApproval();
                console.log("drop", dropp);
                console.log("here");
                setDropInfo(dropp);
              }

              let variant = "success";
              enqueueSnackbar("NFT Added Successfully", { variant });
            }

            console.log(dropInfo);

            setIsUploadingData(false);
            handleCloseBackdrop();
          },
          (error) => {
            console.log("Error on drop add nft: ", error);
            console.log("Error on drop add nft: ", error.response);

            setIsUploadingData(false);

            handleCloseBackdrop();

            let variant = "error";
            enqueueSnackbar("Unable to Add Nft To Drop.", { variant });
          }
        );
      }
    }
  };

  let handleOpenNFTDetailModal = (nftObject) => {
    setNftDetail(nftObject);
  };

  let handleCloseNFTDetailModal = () => {
    // setTokenList([...tempTokenList]);
    // setTempTokenList([]);
    console.log("Close button called from modal.");
    setOpenDialog(false);
  };

  let handleEdit = () => {
    // setNftDetail(nftObject);
    console.log("Nft detail: ", nftDetail);
    // setNftDetail(nftDetail);
    setOpenDialog(false);
    setOpenEditModal(true);
  };

  let handleEditClose = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New NFT</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">New NFT</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
      {/* <ThemeProvider theme={makeTheme}> */}
      <div className="card-body p-0">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group">
                <div className="form-group">
                  <label>Select Collection</label>
                  <div className="filter-widget newNftWrapper">
                    <Autocomplete
                      id="combo-dox-demo"
                      required
                      disabled={isDisabled}
                      options={collectionTypes}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        if (value == null) setCollection("");
                        else {
                          console.log("hereee");
                          setCollection(value.name);
                          setCollectionId(value._id);
                          setNftContractAddress(value.nftContractAddress);
                          setNftList([]);
                          setNftName("");
                          getNfts(value._id);
                        }
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        // <TextField {...params} label="Label" variant="outlined" fullWidth />
                        <div>
                          <ThemeProvider theme={makeTheme}>
                            <TextField
                              {...params}
                              // label="Collections"
                              variant="outlined"
                              placeholder="Select Collection"
                            />
                          </ThemeProvider>
                        </div>
                      )}
                      style={{ padding: "6px 15px !important" }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Select NFT</label>
                  <div className="filter-widget newNftWrapper">
                    <Autocomplete
                      id="combo-dox-demo"
                      required
                      disabled={isDisabled}
                      options={nftList}
                      getOptionLabel={(option) => option.title}
                      onChange={(e, value) => {
                        if (value == null) setNftName("");
                        else {
                          console.log("hereee");

                          // value =
                          setNftName(value.title);
                          setNftId(value._id);
                          setNftURI(value.nftURI);
                          setTokenId(value.nftId);
                          setNftTokenSupply(value.tokenSupply);

                          handleOpenNFTDetailModal(value);
                        }
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <div>
                          <ThemeProvider theme={makeTheme}>
                            <TextField
                              {...params}
                              // label="Nfts"
                              variant="outlined"
                              placeholder="Select NFT"
                            />
                          </ThemeProvider>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {nftType === "1155" ? (
                  <span>
                    <label>Supply</label>
                    <div className="form-group">
                      <div className="filter-widget newNftWrapper">
                        <input
                          type="number"
                          required
                          disabled={isDisabled}
                          value={supply}
                          className="form-control"
                          onChange={(e) => {
                            // if (e.target.value > 0) {
                            //   setSupply(e.target.value);
                            // } else {
                            //   setSupply(0);
                            // }
                            setSupply(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </span>
                ) : null}

                {location.state.saleType === "auction" ? (
                  <label>Floor Price (USD)</label>
                ) : (
                  <label>Price (USD)</label>
                )}

                <div className="form-group">
                  <div className="filter-widget newNftWrapper">
                    <input
                      disabled={isDisabled}
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "5px",
                      }}
                      type="number"
                      required
                      placeholder={0}
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value > 0) {
                          setPrice(e.target.value);
                        } else {
                          setPrice(0);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {collection === "" ||
              nftName === 0 ||
              price === "" ||
              supply <= 0 ||
              supply === "" ? (
                <Tooltip
                  title={supply <= 0 ? "Supply Cannot Be Less Than 1" : null}
                >
                  <button className="bttn" type="submit" disabled>
                    <i className="fa fa-plus"></i> Add NFT To Drop
                  </button>
                </Tooltip>
              ) : (
                <button
                  className="bttn"
                  type="button"
                  disabled={isDisabled}
                  onClick={(e) => handleAddClick(e)}
                >
                  <i className="fa fa-plus"></i> Add NFT To Drop
                </button>
              )}
            </form>
          </div>

          <div className="col-md-12 col-lg-6">
            {/* <!-- Change Password Form --> */}
            {nftName != "" ? (
              <form>
                {/* <Scrollbars style={{ height: 1500 }}> */}

                <div className="form-group mt-3 mt-lg-0">
                  <div>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="flex-start"
                      // alignItems="flex-start"
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ height: "100%" }} id="nftCardProps">
                          <CardMedia
                            variant="outlined"
                            // style={{
                            //   height: "100%",
                            //   border: "4px solid #fff",
                            // }}
                            className={classes.media}
                            image={
                              nftDetail.previewImageURI
                                ? nftDetail.previewImageURI
                                : nftDetail.nftURI
                            }
                            title="NFT Image"
                          />
                          <CardContent
                            style={{
                              paddingBottom: 0,
                              paddingTop: 0,
                              width: "100%",
                            }}
                          >
                            <div
                              className="row no-gutters justify-content-start align-items-center"
                              // style={{ minHeight: "60px" }}
                            >
                              <Typography
                                variant="h6"
                                component="p"
                                className={classes.cardTitle}
                              >
                                {nftDetail.title}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                {/* </Scrollbars> */}
              </form>
            ) : null}
          </div>
        </div>
        {isAdded ? (
          <div className="submit-section col-md-12 col-lg-6 col-sm-12">
            <button
              type="button"
              disabled={isDisabled}
              // onClick={(e) => handleSubmitEvent(e)}
              onClick={(e) => {
                versionB === "v1-sso"
                  ? handleSubmitEvent(e)
                  : handleSubmitEvent(e);
              }}
              style={{ float: "right", marginBottom: "5%" }}
              // onClick={handleOpenModal}
              className="bttn"
            >
              Update Drop
            </button>
          </div>
        ) : (
          <div className="submit-section col-md-12 col-sm-12 col-lg-6">
            <button
              type="button"
              disabled
              className="bttn"
              style={{ float: "right" }}
            >
              Update Drop
            </button>
          </div>
        )}
        {enableTime && (
          <div
            className="datePicker col-md-12 col-lg-6 col-sm-12"
            style={{ marginTop: "5%" }}
          >
            <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
              Starts At
            </label>
            <div className="form-group" style={{ borderRadius: "12px" }}>
              <DateTimePicker
                className="form-control"
                onChange={(e) => {
                  console.log(e);
                  console.log("START", Math.round(e.getTime() / 1000));
                  console.log("NOW", Math.round(Date.now() / 1000));

                  setCurrentTimeStamp(Number(Math.round(Date.now()) / 1000));
                  setStartTimeStamp(Number(Math.round(e.getTime()) / 1000));

                  setStartTime(e);
                }}
                value={startTime}
              />
            </div>
            <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
              Ends At
            </label>
            <div className="form-group newNftWrapper">
              <DateTimePicker
                className="form-control"
                onChange={(e) => {
                  console.log(e);
                  console.log("e.getTime()", Math.round(e.getTime() / 1000));
                  setEndTimeStamp(Math.round(e.getTime() / 1000));
                  setEndTime(e);
                }}
                value={endTime}
              />
            </div>
            <div className="submit-section" style={{ marginBottom: "3%" }}>
              {isSaving ? (
                <div className="text-center">
                  <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#fff" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <button
                  type="button"
                  className="bttn"
                  style={{ float: "right" }}
                  onClick={(e) => {
                    versionB === "v1-sso"
                      ? handleOpenModal(e)
                      : handlePublishEvent(e);
                  }}
                  // onClick={handlePublishEvent}
                >
                  Publish Drop
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      ></NetworkErrorModal>
      <NFTDetailModal
        show={openDialog}
        handleClose={handleCloseNFTDetailModal}
        nftDetail={nftDetail}
        handleEdit={handleEdit}
      ></NFTDetailModal>
      <PublishDropModal
        handleClose={handleCloseModal}
        open={modalOpen}
        handlePublish={handlePublish}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AddNFT;
