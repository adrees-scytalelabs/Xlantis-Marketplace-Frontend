import { createTheme, ThemeProvider } from "@material-ui/core";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import transakSDK from "@transak/transak-sdk";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { Link, useHistory, useLocation } from "react-router-dom";
import Web3 from "web3";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import AuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import AddNFTDisplayCard from "../../../../components/Cards/AddNFTDisplayCard";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import PublishDropModal from "../../../../components/Modals/PublishDropModal";
import TopUpModal from "../../../../components/Modals/TopUpModal";

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
    width: "100%",
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
  },
}));

const makeTheme = createTheme({
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
  const [network, setNetwork] = useState(false);
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
  const [isSaving, setIsSaving] = useState(false);
  const [enableTime, setEnableTime] = useState(false);
  const [dropId, setDropId] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [nftList, setNftList] = useState([]);
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [collection, setCollection] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [nftContractAddresses, setNftContractAddress] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [changeCollectionList, setChangeCollectionList] = useState([]);
  const [nftName, setNftName] = useState("");
  const [nftURI, setNftURI] = useState("");
  const [nftTokenSupply, setNftTokenSupply] = useState(0);
  const [nftDetail, setNftDetail] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [nftId, setNftId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState(1);
  const [saleType, setSaleType] = useState("");
  const [nftType, setNftType] = useState("");
  const [versionB, setVersionB] = useState("");
  const [AlertMessage, setAlertMessage] = useState(false);
  const [startTimeStamp, setStartTimeStamp] = useState(
    Math.round(startTime.getTime() / 1000)
  );
  const [endTimeStamp, setEndTimeStamp] = useState(
    Math.round(endTime.getTime() / 1000)
  );
  const [dropInfo, setDropInfo] = useState([]);
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();
  const [costInfo, setCostInfo] = useState({});
  const [amount, setAmount] = useState(5);
  const [topUpModal, setTopUpModal] = useState(false);

  const handleCloseTopUpModal = () => {
    setTopUpModal(false);
  };
  const handleOpenModal = async (e) => {
    await handleTimeEvent(e);
    axios.get(`/drop/${dropId}/tx-cost-summary`).then(
      (response) => {
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

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  let getCollections = () => {
    const version = Cookies.get("Version");

    axios.get(`/collection/collections/${location.state.nftType}`).then(
      (response) => {
        setChangeCollectionList(response.data.collectionData);
        setCollectionTypes(...collectionTypes, response.data.collectionData);
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
    return hex;
  };

  const handleTopUpAmount = () => {
    let data = {
      amount: amount,
    };
    axios.post(`/usd-payments/admin/topup`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Balance Updated", { variant });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        }
        let variant = "error";
        enqueueSnackbar("Something went wrong", { variant });
      }
    );
  };

  let getNfts = (id) => {
    axios.get(`/nft/${id}`).then(
      (response) => {
        const nft = response.data.data;

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
    transak.on(transak.ALL_EVENTS, (data) => {});

    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      transak.close();
      handleOpenModal();
    });
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      window.alert("Payment Success");
      transak.close();
      handleOpenModal();
    });
  }

  useEffect(() => {
    setIsDisabled(false);
    setVersionB(Cookies.get("Version"));
    setEnableTime(false);
    setDropId(location.state.dropId);
    setSaleType(location.state.saleType);
    let type = location.state.nftType;
    setNftType(type);
    getCollections();

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "active",
      myDrops: "",
      topUp: "",
    });
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
    if (isAdded) {
      event.preventDefault();
      setIsDisabled(true);
      setEnableTime(true);
    } else {
      let variant = "error";
      enqueueSnackbar("Please Add NFT to drop first", { variant });
    }
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

    axios.put(`/drop/status/pending`, data).then(
      (response) => {
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

    var myContractInstance = await new web3.eth.Contract(abi, address);
    try {
      await myContractInstance.methods
        .createDrop(
          dropCloneId,
          Math.round(startTimeStamp),
          endTimeStamp,
          dropInfo
        )
        .send({ from: accounts[0] }, (err, response) => {
          let data = {
            dropId: dropId,
            txHash: response,
          };
          axios.put(`/drop/txHash`, data).then(
            (response) => {
              // console.log(
              //   "Transaction Hash sending on backend response: ",
              //   response
              // );
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

    var myContractInstance = await new web3.eth.Contract(abi, address);
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
  const handleBuyDetail = async () => {
    try {
      axios.get(`/drop/validate-admin-balance/${dropId}`).then(
        (response) => {
          setCostInfo(response.data);
          handleCloseBackdrop();
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
        }
      );
    } catch (e) {
      console.log("Cost detail end point not work properly", e);
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
    setIsSaving(true);
    await handleTimeEvent(event);
    await handleDropData(event, web3, accounts);
  };
  const handleAddClick = async (e) => {
    handleShowBackdrop();
    e.preventDefault();
    if (nftType === "1155") {
      if (collection === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Collection", { variant });
      } else if (nftName === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Nft", { variant });
      } else if (
        supply === 0 ||
        supply === undefined ||
        supply === null ||
        supply === "" ||
        supply < 0 ||
        supply === "0"
      ) {
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
        handleShowBackdrop();
        setIsUploadingData(true);

        let Price = price;
        let data;
        let newObject;
        if (nftType === "1155") {
          data = {
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

        axios.put(`/drop/nft`, data).then(
          async (response) => {
            await handleBuyDetail();
            setIsAdded(true);
            let found = false;
            if (nftType === "1155") {
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
                console.log("drop", dropp);
                console.log("here");
                setDropInfo(dropp);
              }

              let variant = "success";
              enqueueSnackbar("NFT Added Successfully", { variant });
            }
            setIsUploadingData(false);
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
      } else if (price === 0 || price === undefined || price === null) {
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
        let data;
        let newObject;
        console.log("before check");
        if (nftType === "721") {
          console.log("ERC721 DATA");

          data = {
            nftId: nftId,
            dropId: dropId,
            price: Price,
          };

          newObject = {
            nftContractAddress: nftContractAddresses,
            tokenIds: [tokenId],
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
                    let price = obj.prices.concat(newObject.prices);
                    found = true;

                    return {
                      ...obj,
                      tokenIds: tokens,
                      prices: price,
                    };
                  }

                  return obj;
                })
              );

              if (found === false) {
                const dropp = [...dropInfo, newObject];
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
    console.log("Close button called from modal.");
    setOpenDialog(false);
  };

  let handleEdit = () => {
    setOpenDialog(false);
    setOpenEditModal(true);
  };

  let handleEditClose = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New NFT</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Add NFT</li>
            </ul>
          </div>
        </div>
      </div>
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
                        <div>
                          <ThemeProvider theme={makeTheme}>
                            <TextField
                              {...params}
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
                          console.log("Selected NFT values: ", value);
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
                    <span style={{ float: "right", fontSize: "12px" }}>
                      Out of ({nftTokenSupply})
                    </span>
                    <div className="form-group">
                      <div className="filter-widget newNftWrapper">
                        <input
                          style={{
                            border:
                              nftTokenSupply === 0
                                ? "none"
                                : nftTokenSupply >= supply
                                ? "3px solid green"
                                : "3px solid red",
                          }}
                          type="number"
                          required
                          disabled={isDisabled}
                          value={supply}
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value >= 0) {
                              if (e.target.value > nftTokenSupply) {
                                setAlertMessage(true);
                              } else {
                                setAlertMessage(false);
                              }
                              setSupply(e.target.value);
                            }
                          }}
                        />
                        {AlertMessage ? (
                          <span style={{ fontSize: "10px", color: "red" }}>
                            Limit of supply is {nftTokenSupply}
                          </span>
                        ) : null}
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
              <button
                className="bttn"
                type="button"
                disabled={isDisabled}
                onClick={(e) => handleAddClick(e)}
              >
                <i className="fa fa-plus"></i> Add NFT To Drop
              </button>
            </form>
          </div>

          <div className="col-md-12 col-lg-6">
            {nftName != "" ? (
              <form>
                <div className="form-group mt-3 mt-lg-0">
                  <div>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Grid item xs={6} sm={4} md={4} lg={4}>
                        <AddNFTDisplayCard
                          nftDetail={nftDetail}
                          classes={classes}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </form>
            ) : null}
          </div>
        </div>
        <div className="submit-section col-md-12 col-lg-6 col-sm-12">
          <button
            type="button"
            disabled={isDisabled}
            onClick={(e) => {
              versionB === "v1-sso"
                ? handleSubmitEvent(e)
                : handleSubmitEvent(e);
            }}
            style={{ float: "right", marginBottom: "5%" }}
            className="bttn"
          >
            Update Drop
          </button>
        </div>

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
      />
      <NFTDetailModal
        show={openDialog}
        handleClose={handleCloseNFTDetailModal}
        nftDetail={nftDetail}
        handleEdit={handleEdit}
      />
      {modalOpen === true && (
        <PublishDropModal
          handleClose={handleCloseModal}
          open={modalOpen}
          handlePublish={handlePublish}
          handlePay={openTransak}
          dropData={data}
          isOpen={modalOpen}
          dropStatus={(e) => dropStatus(e)}
          dropId={dropId}
          cost={costInfo}
          setOpen={setMOdalOpen}
          setTopUpModal={setTopUpModal}
        />
      )}
      <TopUpModal
        show={topUpModal}
        handleClose={handleCloseTopUpModal}
        amount={amount}
        setAmount={setAmount}
        topUp={handleTopUpAmount}
        setOpen={setMOdalOpen}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default AddNFT;
