import { Grid } from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  addCollectionToDrop,
  addNFTToDrop,
  deleteNFTFromDrop,
  finalizeDrop,
  getCollectionsByCategories,
  getNFTsFromDropPaginatedWOBody,
  getNFTsThroughId,
  getValidateAdminBalance,
  topUpAmount,
  updateDropStartTime,
  updateDropStatus,
  updateDropTxHash,
} from "../../../../components/API/AxiosInterceptor";
import AutocompleteAddNft from "../../../../components/Autocomplete/Autocomplete";
import CollectionAutocomplete from "../../../../components/Autocomplete/CollectionAutocomplete";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AddNFTDisplayCard from "../../../../components/Cards/AddNFTDisplayCard";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import PublishDropModal from "../../../../components/Modals/PublishDropModal";
import PublishSuccessfully from "../../../../components/Modals/PublishSuccessfully";
import TopUpModal from "../../../../components/Modals/TopUpModal";
import SelectSupplyAndPrice from "../../../../components/Select/SelectSupplyAndPrice";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import AuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import AuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import UpdateDropAndPublishDrop from "../../../../components/buttons/UpdateDropAndPublishDrop";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
import AddAllNFTsModal from "../../../../components/Modals/AddAllNFTsModal";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 250,
  },
  media: {
    width: "100%",
    paddingTop: "100%",
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
};

function AddNFT(props) {
  let location = useLocation();
  let navigate = useNavigate();
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
  const [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
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
  const [startTime, setStartTime] = useState(
    new Date(new Date().getTime() + 5 * 60 * 1000)
  ); // drop sale start time must be more than 5 minutes then current time
  const [endTime, setEndTime] = useState(new Date());
  const [nftList, setNftList] = useState([]);
  const [buttonName, setbuttonName] = useState("bttn");
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [collection, setCollection] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [nftContractAddresses, setNftContractAddress] = useState("");
  const [key, setKey] = useState("default");
  const [grid, setGrid] = useState(false);
  const [error, setError] = useState(false);
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
  const [disabledUpdateButton, setDisabledUpdateButton] = useState(true);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [price, setPrice] = useState(null);
  const [collectionPrice, setCollectionPrice] = useState(null);
  const [supply, setSupply] = useState(null);
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
  const [amount, setAmount] = useState(0.5);
  const [topUpModal, setTopUpModal] = useState(false);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [isCollectionDisable, setIsCollectionDisable] = useState(false);
  const [isDropUpdated, setIsDropUpdated] = useState(false);
  const [showAddNFTsModal, setShowAddNFTsModal] = useState(false);
  const [isAddingAllNFTs, setIsAddingAllNFTs] = useState(false);
  const [nftDetailModal, setNftDetailModal] = useState(false);
  const [nftDetailModalData, setNftDetailModalData] = useState({});
  const [isPriceDisable, setIsPriceDisable] = useState(false);
  const [isCollectionPriceValid, setIsCollectionPriceValid] = useState(true);
  const [isAddAllDisabled, setIsAddAllDisabled] = useState(false);

  const handleOpenAddAllNFTsModal = () => {
    if (collection && collectionId) {
      if (nftList.length === 0) {
        setSnackbarMessage("There is no NFTs available in the list");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
      } else {
        setShowAddNFTsModal(true);
      }
    } else {
      setSnackbarMessage("Please Select a collection to add all NFTs");
      setSnackbarSeverity("error");
      handleSnackbarOpen();
    }
  };

  const handleOpenNFTDetailModal = (nftDetail) => {
    setNftDetailModalData(nftDetail);
    setNftDetailModal(true);
  };

  const handleCloseNFTDetailModal = () => {
    setNftDetailModal(false);
  };

  const handleCloseAddAllNFTsModal = () => {
    setCollectionPrice(null);
    setIsCollectionPriceValid(true);
    setShowAddNFTsModal(false);
  };

  const handleCloseTopUpModal = () => {
    setTopUpModal(false);
  };
  const handleOpenModal = async (e) => {
    await handleTimeEvent(e);
  };
  const handleRedirect = () => {
    setTransactionModal(false);
    navigate(`/dashboard/myDrops`, {
      state: {
        value: 1,
      },
    });
  };
  const handleCloseModal = () => {
    setMOdalOpen(false);
    setTransactionModal(true);
  };

  let getCollection = async () => {
    const version = Cookies.get("Version");
    await getCollectionsByCategories(
      location.state.dropCategory,
      location.state.marketplaceId
    ).then(
      (response) => {
        console.log("Response from getting collections: ", response);
        setChangeCollectionList(response.data.collectionData);
        setCollectionTypes(response.data.collectionData);
        return response.data.collectionData;
      },
      (error) => {
        console.log("Error from getting collections: ", error.response);
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log("error to get collections", error.response);
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
    handleShowBackdrop();
    console.log("Inside top up function");
    let data = {
      amount: amount,
    };
    topUpAmount(data).then(
      (response) => {
        console.log("Response from top up endpoint: ", response);
        if (response.data.success === false) {
          setSnackbarSeverity(response.data.errorType);
          setSnackbarMessage(response.data.message);
          handleSnackbarOpen();
        } else {
          localStorage.setItem("sessionId", response.data.checkoutSessionId);
          window.location.replace(response.data.sessionUrl);
          handleCloseBackdrop();
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          setSnackbarMessage("Something went wrong.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        }
        let variant = "error";
        setSnackbarMessage("Something went wrong.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  let getNfts = (id) => {
    getNFTsThroughId(id, location.state.marketplaceId).then(
      (response) => {
        // console.log("Response from getting NFTs: ", response);
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
    finalizeDrop(dropData).then(
      (response) => {
        handleCloseModal();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          setSnackbarMessage("Unable To Publish Drop.");
          setSnackbarSeverity(variant);
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

  const getNFTsInDrop = async (dropId) => {
    handleShowBackdrop();
    await getNFTsFromDropPaginatedWOBody(
      dropId,
      0,
      1000,
      location.state.marketplaceId
    )
      .then((response) => {
        console.log("Response from getting drop NFTs: ", response);
        if (response.data.data.length > 0) {
          setTokenList(response.data.data);
          setIsAddAllDisabled(true);
          setGrid(true);
          setIsAdded(true);
          setDisabledUpdateButton(false);
          // setCollectionId(response.data.data[0].collectionId._id);
          const index = collectionTypes.findIndex(
            (collection) =>
              collection._id === response.data.data[0].collectionId._id
          );
          if (index !== -1) {
            let collection = collectionTypes[index];
            setCollection(collection.name);
            setCollectionId(collection._id);
            setNftContractAddress(collection.nftContractAddress);
            setNftList([]);
            setNftName("");
            getNfts(collection._id);
            setIsCollectionDisable(true);
          }
        }
        handleCloseBackdrop();
        console.log("NFT contract address: ", nftContractAddresses);
      })
      .catch((error) => {
        handleCloseBackdrop();
        console.log("Error from getting drop NFTs: ", error.response);
      });
  };

  const handleRemoveNFT = (e, nftId, index) => {
    e.preventDefault();
    handleShowBackdrop();
    console.log("Removing NFTs: ", nftId, index);
    deleteNFTFromDrop(nftId)
      .then((response) => {
        // console.log("Response from deleting nft from drop: ", response);
        let list = [...tokenList];
        list.splice(index, 1);
        setTokenList(list);
        setIsPriceDisable(false);
        if (list.length === 0) {
          setIsCollectionDisable(false);
          setCollection("");
          setCollectionId("");
          setNftContractAddress("");
          setCollectionTypes([]);
          setNftList([]);
          getCollection();
          setIsAddAllDisabled(false);
          setGrid(false);
          setIsAdded(false);
        } else {
          getNfts(collectionId);
        }
        setSnackbarMessage("NFT Removed Successfully");
        setSnackbarSeverity("success");
        handleSnackbarOpen();
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("Error from deleting nft from drop: ", error);
        setSnackbarMessage("Error in removing NFT");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        handleCloseBackdrop();
      });
  };

  const handleAddAllNFTs = (e, price) => {
    if (!price || price < 0.5 || price > 999999.99) {
      setIsCollectionPriceValid(false);
    } else {
      setIsAddingAllNFTs(true);
      const body = { collectionId: collectionId, dropId: dropId, price: price };
      addCollectionToDrop(body)
        .then((response) => {
          // console.log("Response from adding all NFTs in drop: ", response);
          setIsAddingAllNFTs(false);
          setTokenList(nftList);
          handleCloseAddAllNFTsModal();
          setSnackbarMessage("All NFTs Added in drop successfully");
          setSnackbarSeverity("success");
          handleSnackbarOpen();
          setGrid(true);
          setIsAdded(true);
          setDisabledUpdateButton(false);
          setIsPriceDisable(true);
          setCollectionPrice(null);
          setIsCollectionPriceValid(true);
          setIsAddAllDisabled(true);
          setIsCollectionDisable(true);
          let variant = "success";
          setSnackbarMessage("NFT Added Successfully.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setNftName("");
          setNftId("");
          setNftURI("");
          setTokenId("");
          setNftTokenSupply(0);
          setNftList([]);
          getNfts(collectionId);
          setNftDetail({});
          setPrice(0);
          setSupply(0);
          if (key === "default") {
            setKey("refresh");
          } else {
            setKey("default");
          }
          setIsUploadingData(false);
          handleCloseBackdrop();
        })
        .catch((error) => {
          console.log("Error from adding all NFTs in drop: ", error.response);
          let variant = "error";
          setSnackbarMessage(error?.response?.data?.message); // response message in case of error is shown as it is coming from backend
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setIsAddingAllNFTs(false);
          handleCloseAddAllNFTsModal();
        });
    }
  };

  useEffect(() => {
    getNFTsInDrop(location.state.dropId);
  }, [collectionTypes]);

  useEffect(() => {
    setIsDisabled(false);
    setGrid(false);
    setVersionB(Cookies.get("Version"));
    setEnableTime(false);
    setDropId(location.state.dropId);
    setSaleType(location.state.saleType);
    let type = location.state.nftType;
    setNftType(type);
    getCollection();
    console.log("Location.state in Add NFT: ", location.state);
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
    event.preventDefault();

    // resetting start and end time to show current date and time on the date picker
    setStartTime(new Date(new Date().getTime() + 5 * 60 * 1000));
    setEndTime(new Date());

    if (isAdded) {
      handleShowBackdrop();
      await handleBuyDetail();
    } else {
      let variant = "error";
      setSnackbarMessage("Please Add NFT to drop first.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    }
  };

  const getTxCost = async (e) => {
    Axios.get(`/drop/${dropId}/tx-cost-summary`).then(
      (response) => {
        console.log("Summary", response);
        setData(response.data.data);
        setMOdalOpen(true);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          setSnackbarMessage("Something went wrong.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        } else {
          let variant = "error";
          setSnackbarMessage("Something went wrong.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        }
      }
    );
  };

  const handleTimeEvent = async (event) => {
    event.preventDefault();

    // start date must be 5 minutes more than current time to avoid transaction failing.
    if (startTimeStamp < 5 * 60 * 1000 + new Date().getTime()) {
      let variant = "error";
      setSnackbarMessage(
        "Drop start time must be more than 5 minutes than current time."
      );
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
      handleCloseBackdrop();
    } else if (
      startTimeStamp === endTimeStamp ||
      new Date(startTime) === new Date(endTime)
    ) {
      let variant = "error";
      setSnackbarMessage("Drop cannot be Start and End on same time.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
      handleCloseBackdrop();
    } else if (
      startTimeStamp > endTimeStamp ||
      new Date(startTime) > new Date(endTime)
    ) {
      let variant = "error";
      setSnackbarMessage("Drop end time must be greater than Start time.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
      handleCloseBackdrop();
    } else if (
      currentTimeStamp >= startTimeStamp ||
      new Date(Date.now()) >= new Date(startTime)
    ) {
      let variant = "error";
      setSnackbarMessage("Drop start time must be greater than Current time.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
      handleCloseBackdrop();
    } else {
      let data = {
        dropId: dropId,
        startTime: startTime,
        endTime: endTime,
      };
      updateDropStartTime(data).then(
        (response) => {
          console.log("Response from updating drop start time: ", response);
          getTxCost(event);
          let variant = "success";
          setSnackbarMessage("Time Successfully Updated.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        },
        (error) => {
          console.log("Error on drop/start-time: ", error);
          console.log("Error Response of drop/start-time: ", error.response);
          let variant = "error";
          setSnackbarMessage("Unable to set Time.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        }
      );
    }
  };

  const dropStatus = async (event, web3, accounts) => {
    event.preventDefault();
    let data = {
      dropId: dropId,
    };
    updateDropStatus(data).then(
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
        setSnackbarMessage("Unable to Add Nft To Drop.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
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
          updateDropTxHash(data).then(
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
            setSnackbarMessage("User Canceled Transaction.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          let variant = "success";
          setSnackbarMessage("New Drop Created Successfully.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setIsAdded(false);
          handleCloseBackdrop();
          setIsSaving(false);
          navigate(-1);
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
          updateDropTxHash(data).then(
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
            setSnackbarMessage("User Canceled Transaction.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
          let variant = "success";
          setSnackbarMessage("New Drop Created Successfully.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setIsAdded(false);
          handleCloseBackdrop();
          setIsSaving(false);
          navigate(-1);
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
    console.log("dropId", dropId);
    try {
      getValidateAdminBalance(dropId).then(
        (response) => {
          console.log("Get validate admin balance: ", response.data);
          setCostInfo(response.data);
          setIsDisabled(true);
          setDisabledUpdateButton(true);
          setEnableTime(true);
          setIsDropUpdated(true);
          let variant = "success";
          setSnackbarMessage("Drop Updated Successfully.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          // if (response.data.isTopupRequired) {
          //   setTopUpModal(true);
          // }
          handleCloseBackdrop();
          setbuttonName("updatebttn");
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            handleCloseBackdrop();
          }
          let variant = "error";
          setSnackbarMessage(
            "Something went wrong with blockchain trancsaction try again."
          );
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          handleCloseBackdrop();
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
        setSnackbarMessage("Please Select Collection.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      } else if (nftName === "") {
        let variant = "error";
        setSnackbarMessage("Please Select Nft.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      } else if (
        supply === 0 ||
        supply === undefined ||
        supply === null ||
        supply === "" ||
        supply < 0 ||
        supply === "0"
      ) {
        let variant = "error";
        setSnackbarMessage("Token Supply cannot be 0 or empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      } else if (supply < 0) {
        let variant = "error";
        setSnackbarMessage("Token Supply cannot be Negative.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      } else if (price === 0 || price === undefined || price === null) {
        let variant = "error";
        setSnackbarMessage("Price cannot be 0 or empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        handleCloseBackdrop();
      } else if (supply > nftTokenSupply) {
        handleCloseBackdrop();
        let variant = "error";
        setSnackbarMessage("Supply cannot be greater than NFT token supply.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      } else if (price < 0) {
        handleCloseBackdrop();
        let variant = "error";
        setSnackbarMessage("Price cannot be Negative.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
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
        addNFTToDrop(data).then(
          async (response) => {
            console.log("Response from adding NFTs in drop: ", response);
            setGrid(true);
            setIsAdded(true);
            setDisabledUpdateButton(false);
            setTokenList([...tokenList, nftDetail]);
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
                setDropInfo(dropp);
              }

              setIsCollectionDisable(true);
              if (nftList.length === tokenList.length) {
                setIsPriceDisable(true);
              }
              let variant = "success";
              setSnackbarMessage("NFT Added Successfully.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              setNftName("");
              setNftId("");
              setNftURI("");
              setTokenId("");
              setNftTokenSupply(0);
              setNftList([]);
              getNfts(collectionId);
              setNftDetail({});
              setPrice(0);
              setIsAddAllDisabled(true);
              setSupply(0);
              if (key === "default") {
                setKey("refresh");
              } else {
                setKey("default");
              }
            }
            setIsUploadingData(false);
            handleCloseBackdrop();
          },
          (error) => {
            console.log("Error on drop add nft: ", error);
            console.log("Error on drop add nft: ", error.response);
            setIsUploadingData(false);
            handleCloseBackdrop();
            let variant = "error";
            setSnackbarMessage("Unable to Add Nft To Drop.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
          }
        );
      }
    } else if (nftType === "721") {
      if (collection === "") {
        let variant = "error";
        setSnackbarMessage("Please Select Collection.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      } else if (price === 0 || price === undefined || price === null) {
        let variant = "error";
        setSnackbarMessage("Price cannot be 0 or empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      } else if (price < 0) {
        let variant = "error";
        setSnackbarMessage("Price cannot be Negative.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      } else {
        handleShowBackdrop();
        setIsUploadingData(true);
        let Price = price;
        let data;
        let newObject;
        if (nftType === "721") {
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
        addNFTToDrop(data).then(
          (response) => {
            setDisabledUpdateButton(false);
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
              setSnackbarMessage("NFT Added Successfully.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
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
            setSnackbarMessage("Unable to Add Nft To Drop.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
          }
        );
      }
    }
  };

  let handleEdit = () => {
    setOpenDialog(false);
    setOpenEditModal(true);
  };

  let handleEditClose = () => {
    setOpenEditModal(false);
  };

  const removeSelectedNFTItems = () => {
    setNftName("");
    setNftId("");
    setNftURI("");
    setTokenId("");
    setNftTokenSupply(0);
  };

  const removeSelectedCollectionItems = () => {
    setCollection("");
    setCollectionId("");
    setNftContractAddress("");
    setNftList([]);
    removeSelectedNFTItems();
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Add NFT</h3>
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
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard
          getOnboardingLink={props.getOnboardingLink}
          setIsStripeLogin={props.setIsStripeLogin}
        />
      )}
      <div className="card-body p-0">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group" key={key}>
                <CollectionAutocomplete
                  label={"Select Collection"}
                  options={collectionTypes}
                  isDisabled={isCollectionDisable}
                  placeholder="Select Collection"
                  onChange={(e, value) => {
                    if (value == null) {
                      removeSelectedCollectionItems();
                    } else {
                      console.log("hereee");
                      setCollection(value.name);
                      setCollectionId(value._id);
                      setNftContractAddress(value.nftContractAddress);
                      setNftList([]);
                      setNftName("");
                      getNfts(value._id);
                    }
                  }}
                  type="collection"
                  collectionName={collection}
                />

                <AutocompleteAddNft
                  label={"Select NFT"}
                  options={nftList}
                  isDisabled={isDisabled}
                  placeholder="Select NFT"
                  onChange={(e, value) => {
                    if (value == null) {
                      removeSelectedNFTItems();
                    } else {
                      console.log("hereee");
                      console.log("Selected NFT values: ", value);
                      setNftName(value.title);
                      setNftId(value._id);
                      setNftURI(value.nftURI);
                      setTokenId(value.nftId);
                      setNftTokenSupply(value.ownedSupply);
                      setSupply(value.ownedSupply);
                      setNftDetailModalData(value);
                      setNftDetail(value);
                    }
                  }}
                  type="nft"
                  handleOpenAddNFTModal={handleOpenAddAllNFTsModal}
                  isAddAllDisabled={isAddAllDisabled}
                />
                {nftName != "" && (
                  <div
                    className="mb-4"
                    style={{ height: "270px", width: "230px" }}
                  >
                    {console.log("nft detailssss", nftDetail)}
                    <AddNFTDisplayCard
                      nftDetail={nftDetail}
                      classes={styles}
                      place="between"
                      handleRemoveNFT={handleRemoveNFT}
                      isDropUpdated={isDropUpdated}
                      handleOpenNFTDetailModal={handleOpenNFTDetailModal}
                    />
                  </div>
                )}

                <SelectSupplyAndPrice
                  nftType={nftType}
                  nftTokenSupply={nftTokenSupply}
                  values={supply}
                  isDisabled={isDisabled}
                  setSupply={setSupply}
                  saleType={saleType}
                  setPrice={setPrice}
                  AlertMessage={AlertMessage}
                  setAlertMessage={setAlertMessage}
                  price={price}
                  isPriceDisable={isPriceDisable}
                  error={error}
                  setError={setError}
                />
              </div>
              <button
                className="bttn"
                type="button"
                disabled={isDisabled || error}
                onClick={(e) => handleAddClick(e)}
              >
                <i className="fa fa-plus"></i> Add NFT To Drop
              </button>
            </form>
          </div>

          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group mt-3 mt-lg-0">
                {grid === true && (
                  <div>
                    <span className="text-center">
                      <h3>NFTs in drop</h3>
                    </span>

                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-start"
                      style={{ height: "50vh", overflowY: "scroll" }}
                    >
                      {tokenList.map((i, index) => (
                        <Grid
                          key={index}
                          item
                          xs={6}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                          style={{ height: "100%" }}
                        >
                          {console.log("nft details", nftDetail)}
                          <AddNFTDisplayCard
                            nftDetail={i}
                            classes={styles}
                            place="list"
                            handleRemoveNFT={handleRemoveNFT}
                            index={index}
                            isDropUpdated={isDropUpdated}
                            handleOpenNFTDetailModal={handleOpenNFTDetailModal}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <UpdateDropAndPublishDrop
          isDisabled={disabledUpdateButton}
          versionB={versionB}
          handleSubmitEvent={handleSubmitEvent}
          enableTime={enableTime}
          setCurrentTimeStamp={setCurrentTimeStamp}
          setStartTimeStamp={setStartTimeStamp}
          startTime={startTime}
          setStartTime={setStartTime}
          setEndTimeStamp={setEndTimeStamp}
          endTime={endTime}
          setEndTime={setEndTime}
          isSaving={isSaving}
          handlePublishEvent={handlePublishEvent}
          handleOpenModal={handleOpenModal}
          buttonName={buttonName}
        />
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
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
          setMOdalOpen={setMOdalOpen}
          onHide={() => setMOdalOpen(false)}
          setTopUpModal={setTopUpModal}
        />
      )}
      <PublishSuccessfully
        show={transactionModal}
        handleClose={handleRedirect}
      />
      {topUpModal === true && (
        <TopUpModal
          show={topUpModal}
          handleClose={handleCloseTopUpModal}
          amount={costInfo.balance.dollar}
          required={costInfo.estimates.totalCostInDollars}
          topUpAmount={amount}
          setAmount={setAmount}
          topUp={handleTopUpAmount}
          setOpen={setMOdalOpen}
        />
      )}
      <CircularBackdrop open={open} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <AddAllNFTsModal
        show={showAddNFTsModal}
        handleClose={handleCloseAddAllNFTsModal}
        nftList={nftList}
        setPrice={setCollectionPrice}
        price={collectionPrice}
        handleAddAllNFTs={handleAddAllNFTs}
        isUploading={isAddingAllNFTs}
        isPriceDisable={isPriceDisable}
        isPriceValid={isCollectionPriceValid}
        setIsPriceValid={setIsCollectionPriceValid}
      />
      <NFTDetailModal
        show={nftDetailModal}
        handleClose={handleCloseNFTDetailModal}
        nftDetail={nftDetailModalData}
      />
    </div>
  );
}

export default AddNFT;
