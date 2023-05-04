import {Grid } from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  addNFTToDrop,
  finalizeDrop,
  getCollections,
  getDropTxCostSummary,
  getNFTsThroughId,
  getValidateAdminBalance,
  topUpAmount,
  updateDropStartTime,
  updateDropStatus,
  updateDropTxHash,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AddNFTDisplayCard from "../../../../components/Cards/AddNFTDisplayCard";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import PublishDropModal from "../../../../components/Modals/PublishDropModal";
import PublishSuccessfully from "../../../../components/Modals/PublishSuccessfully";
import TopUpModal from "../../../../components/Modals/TopUpModal";
import SelectSupplyAndPrice from "../../../../components/Select/SelectSupplyAndPrice";
import AuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import AuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import UpdateDropAndPublishDrop from "../../../../components/buttons/UpdateDropAndPublishDrop";
import AutocompleteAddNft from "../../../../components/Autocomplete/Autocomplete";

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
  const { enqueueSnackbar } = useSnackbar();
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [nftList, setNftList] = useState([]);
  const [buttonName, setbuttonName] = useState("bttn");
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [collection, setCollection] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [nftContractAddresses, setNftContractAddress] = useState("");
  const [key, setKey] = useState("default");
  const [grid, setGrid] = useState(false);
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
  const [tokenList, setTokenList] = useState([]);
  const [price, setPrice] = useState(null);
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
  const [amount, setAmount] = useState(5);
  const [topUpModal, setTopUpModal] = useState(false);

  const handleCloseTopUpModal = () => {
    setTopUpModal(false);
  };
  const handleOpenModal = async (e) => {
    await handleTimeEvent(e);    
  };
  const handleRedirect = () => {
    setTransactionModal(false);
    navigate(`/dashboard/myDrops`,
    {
      state: {
        value: 1,
      }
    });
  };
  const handleCloseModal = () => {
    setMOdalOpen(false);
    //setTransactionModal(true);
  };
  let getCollection = () => {
    const version = Cookies.get("Version");
    getCollections(location.state.nftType).then(
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
    topUpAmount(data).then(
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
    getNFTsThroughId(id).then(
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
    finalizeDrop(dropData).then(
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
    setGrid(false);
    setVersionB(Cookies.get("Version"));
    setEnableTime(false);
    setDropId(location.state.dropId);
    setSaleType(location.state.saleType);
    let type = location.state.nftType;
    setNftType(type);
    getCollection();
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
    if (isAdded) {
      handleShowBackdrop();
      await handleBuyDetail();
    } else {
      let variant = "error";
      enqueueSnackbar("Please Add NFT to drop first", { variant });
     }
  };
  const getTxCost = async (e) => {
    Axios.get(`/drop/${dropId}/tx-cost-summary`).then(
      (response) => {
        setData(response.data.data);
        setMOdalOpen(true);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        } else {
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        }
      }
    );
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
      updateDropStartTime(data).then(
        (response) => {
          getTxCost(event);
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
    try {
      getValidateAdminBalance(dropId).then(
        (response) => {
          setCostInfo(response.data);
          setIsDisabled(true);
          setEnableTime(true);
          let variant = "success";
          enqueueSnackbar("Transaction Summary received", {
            variant,
          });
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
          enqueueSnackbar(
            "Something went wrong with blockchain trancsaction try again",
            {
              variant,
            }
          );
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
        enqueueSnackbar("Please Select Collection", { variant });
        handleCloseBackdrop();
      } else if (nftName === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Nft", { variant });
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
        enqueueSnackbar("Token Supply cannot be 0 or empty", { variant });
        handleCloseBackdrop();
      } else if (supply < 0) {
        let variant = "error";
        enqueueSnackbar("Token Supply cannot be Negative", { variant });
        handleCloseBackdrop();
      } else if (price === 0 || price === undefined || price === null) {
        let variant = "error";
        enqueueSnackbar("Price cannot be 0 or empty", { variant });
        handleCloseBackdrop();
      } else if (supply > nftTokenSupply) {
        handleCloseBackdrop();
        let variant = "error";
        enqueueSnackbar("Supply cannot be greater than NFT token supply", {
          variant,
        });
      } else if (price < 0) {
        handleCloseBackdrop();
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
        addNFTToDrop(data).then(
          async (response) => {
            setGrid(true);
            setIsAdded(true);
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

              let variant = "success";
              enqueueSnackbar("NFT Added Successfully", { variant });
              setNftName("");
              setNftId("");
              setNftURI("");
              setTokenId("");
              setNftTokenSupply(0);
              setCollection("");
              setCollectionId("");
              setNftContractAddress("");
              setNftList([]);
              setNftDetail({});
              setPrice(0);
              setSupply(1);
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
              <div className="form-group" key={key}>
                <AutocompleteAddNft
                  label={"Select Collection"}
                  options={collectionTypes}
                  isDisabled={isDisabled}
                  placeholder="Select Collection"
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
                  type="collection"
                />

                <AutocompleteAddNft
                  label={"Select NFT"}
                  options={nftList}
                  isDisabled={isDisabled}
                  placeholder="Select NFT"
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
                  type="nft"
                />
                {nftName != "" && (
                  <div
                    className="mb-3"
                    style={{ height: "270px", width: "230px" }}
                  >
                    {console.log("nft detailssss", nftDetail)}
                    <AddNFTDisplayCard nftDetail={nftDetail} classes={styles} />
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
                />
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
            <form>
              <div className="form-group mt-3 mt-lg-0">
                {grid === true && (
                  <div>
                    <h3>Nft's in drop</h3>

                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-start"
                      style={{ height: "50vh", overflowY: "scroll" }}
                    >
                      {tokenList.map((i) => (
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                          style={{ height: "25vh" }}
                        >
                          {console.log("nft details", nftDetail)}
                          <AddNFTDisplayCard nftDetail={i} classes={styles} />
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
          isDisabled={isDisabled}
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
      <PublishSuccessfully
        show={transactionModal}
        handleClose={handleRedirect}
      />

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
