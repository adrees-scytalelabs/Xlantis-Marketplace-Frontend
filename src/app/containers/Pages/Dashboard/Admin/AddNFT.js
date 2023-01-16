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
import { Web } from "@material-ui/icons";
import crypto from "crypto";
import PublishDropModal from "../../../../components/Modals/PublishDropModal";
import transakSDK from "@transak/transak-sdk";

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

  let [isSaving, setIsSaving] = useState(false);
  let [dropId, setDropId] = useState("");
  let [startTime, setStartTime] = useState(0);
  let [endTime, setEndTime] = useState(0);
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
  let [isUploadingData, setIsUploadingData] = useState(false);
  let [price, setPrice] = useState(0);
  let [supply, setSupply] = useState(0);
  let [saleType, setSaleType] = useState("");
  let [nftType, setNftType] = useState("");
  let [versionB, setVersionB] = useState("");

  let [dropInfo, setDropInfo] = useState([]);
  const [modalOpen, setMOdalOpen] = useState(false);

  const handleOpenModal = () => {
    setMOdalOpen(true);
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  let getCollections = () => {
    const version = Cookies.get("Version");
    console.log("version", version);
    console.log("NFT TYPE", location.state.nftType);

    axios
      .get(`/${version}/collection/collections/${location.state.nftType}`)
      .then(
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
              Cookies.remove("Authorization");
              localStorage.removeItem("Address");
              window.location.reload(false);
            }
          }
        }
      );
  };

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    defaultCryptoCurrency: "ETH",
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
    axios.get(`/${versionB}/nft/${id}`).then(
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
            Cookies.remove("Authorization");
            localStorage.removeItem("Address");
            window.location.reload(false);
          }
        }
      }
    );
  };

  let handlePublish = () => {
    let dropData = {
      dropId,
    };
    axios.post(`/${versionB}/drop/finalize`, dropData).then(
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
            Cookies.remove("Authorization");
            localStorage.removeItem("Address");
            window.location.reload(false);
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
    setVersionB(Cookies.get("Version"));

    setDropId(location.state.dropId);
    setStartTime(Math.round(location.state.startTime));
    console.log("START TIME COMING", Math.round(location.state.startTime));
    console.log("End TIME COMING", location.state.endTime);

    setEndTime(location.state.endTime);
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
    setIsSaving(true);
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

      //sending data to backend
      let data = {
        dropId: dropId,
      };

      console.log("data", data);

      axios.put(`/${versionB}/drop/status/pending`, data).then(
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

      let dropCloneId = getHash(dropId);
      let address;
      let abi;
      if (saleType === "fixed-price") {
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
        console.log("end time", startTime);
        console.log("drop", dropInfo);

        await myContractInstance.methods
          .createDrop(dropCloneId, startTime, endTime, dropInfo)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
            let data = {
              dropId: dropId,
              txHash: response,
            };
            console.log("data", data);
            axios.put(`/${versionB}/drop/txHash`, data).then(
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
      } else if (saleType === "auction") {
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
        console.log("end time", startTime);
        console.log("drop", dropInfo);

        await myContractInstance.methods
          .createAuctionDrop(dropCloneId, startTime, endTime, dropInfo)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
            let data = {
              dropId: dropId,
              txHash: response,
            };
            console.log("data", data);
            axios.put(`/${versionB}/drop/txHash`, data).then(
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
      }
    }
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

        let weiPrice = Web3.utils.toWei(price);
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
            price: weiPrice,
            supply: parseInt(supply),
          };

          newObject = {
            nftContractAddress: nftContractAddresses,
            tokenIds: [tokenId],
            amounts: [parseInt(supply)],
            prices: [weiPrice],
          };
        }

        console.log("data", data);

        console.log("new obj", newObject);

        axios.put(`${versionB}/drop/nft`, data).then(
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
      } else if (nftName === "") {
        let variant = "error";
        enqueueSnackbar("Please Select Nft", { variant });
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

        let weiPrice = Web3.utils.toWei(price);
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
            price: weiPrice,
            // "supply": parseInt(supply)
          };

          newObject = {
            nftContractAddress: nftContractAddresses,
            tokenIds: [tokenId],
            // "amounts" : [parseInt(supply)],
            prices: [weiPrice],
          };
        }
        console.log("data", data);

        console.log("new obj", newObject);

        axios.put(`${versionB}/drop/nft`, data).then(
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
                      options={collectionTypes}
                      // disabled={isDisabledImporter}
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
                      // onChange={(event, value) => {
                      //     if (value == null) setCollection("");
                      //     else {
                      //         if (value.name === "+ Create new Collection") {
                      //             history.push('/dashboard/createNewCollection')
                      //         } else {
                      //             console.log(value);
                      //             setCollection(value.name)
                      //             setCollectionId(value._id)
                      //             setNftContractAddress(value.nftContractAddress);
                      //             console.log("Value: ", value);
                      //         }
                      //     }
                      // }}

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
                      options={nftList}
                      // disabled={isDisabledImporter}
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
                      // onChange={(event, value) => {
                      //     if (value == null) setCollection("");
                      //     else {
                      //         if (value.name === "+ Create new Collection") {
                      //             history.push('/dashboard/createNewCollection')
                      //         } else {
                      //             console.log(value);
                      //             setCollection(value.name)
                      //             setCollectionId(value._id)
                      //             setNftContractAddress(value.nftContractAddress);
                      //             console.log("Value: ", value);
                      //         }
                      //     }
                      // }}

                      filterSelectedOptions
                      renderInput={(params) => (
                        // <TextField {...params} label="Label" variant="outlined" fullWidth />
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
                          value={supply}
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              setSupply(e.target.value);
                            } else {
                              setSupply(0);
                            }
                            // setSupply(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </span>
                ) : null}

                {location.state.saleType === "auction" ? (
                  <label>Floor Price (WMATIC)</label>
                ) : (
                  <label>Price (WMATIC)</label>
                )}

                <div className="form-group">
                  <div className="filter-widget newNftWrapper">
                    <input
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "5px",
                      }}
                      type="number"
                      required
                      value={price}
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
              supply === "" ? (
                <button className="bttn" type="submit" disabled>
                  <i className="fa fa-plus"></i> Add NFT To Drop
                </button>
              ) : (
                <button
                  className="bttn"
                  type="button"
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

                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="flex-start"
                      // alignItems="flex-start"
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        {/* <CardActionArea onClick={() => {
                                                    
                                                    console.log("Open Dialog Value: ", openDialog);
                                                }}> */}
                        <Card style={{ height: "100%" }} id="nftCardProps">
                          {/* <CardHeader
                            className="text-center"
                            title={nftDetail.title}
                          /> */}
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
                            {/* Descriptions */}
                            {/* <div className="row no-gutters justify-content-start align-items-center">
              <Typography
                variant="body2"
                className={classes.cardDescriptions}
                component="p"
                style={{ minHeight: "2.5rem" }}
              >
                {truncate(props.data.description, 35)}
              </Typography>
            </div> */}
                          </CardContent>
                          {/* <CardContent> */}
                          {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Description: </strong>{i.description}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Rarity: </strong>{i.rarity}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Token Supply: </strong>{i.tokensupply}
                                                            </Typography> */}
                          {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Image Artist</Typography> */}
                          {/* <CardHeader
                                                                avatar={<Avatar src={i.ImageArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                                                title={i.ImageArtistName}
                                                                subheader={i.ImageArtistAbout}
                                                            />
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Website URL: </strong>{i.ImageArtistWebsite}
                                                            </Typography>
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Producer</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.ProducerProfile} aria-label="Producer" className={classes.avatar} />}
                                                                title={i.ProducerName}
                                                                subheader={i.ProducerInspiration}
                                                            />
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Executive Producer</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.ExecutiveProducerProfile} aria-label="Executive Producer" className={classes.avatar} />}
                                                                title={i.ExecutiveProducerName}
                                                                subheader={i.ExecutiveProducerInspiration}
                                                            />
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Fan</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.FanProfile} aria-label="Fan" className={classes.avatar} />}
                                                                title={i.FanName}
                                                                subheader={i.FanInspiration}
                                                            />

                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Other: </strong>{i.other}
                                                            </Typography> */}
                          {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>ID: </strong>{nftDetail._id}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Collection: </strong>{collection}
                                                            </Typography> */}
                          {/* </CardContent> */}
                        </Card>
                        {/* <Dialog
                                                        fullWidth={true}
                                                        maxWidth={true}
                                                        open={openDialog}
                                                        onClose={handleClickCloseDialog}
                                                        aria-labelledby="max-width-dialog-title"
                                                    >
                                                        <DialogTitle id="max-width-dialog-title">Edit NFT Details</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText></DialogContentText>
                                                            <form>
                                                                <TextField
                                                                    label="NFT Title"
                                                                    variant="outlined"
                                                                    value={tempTokenList.title}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].title = e.target.value;
                                                                        console.log(tempTokenList);
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="NFT Description"
                                                                    variant="outlined"
                                                                    value={tempTokenList.description}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].description = e.target.value;
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                    style={{ marginLeft: "5px" }}
                                                                />
                                                                <button className="btn submit-btn" onClick={console.log("Submit clicked")} >Save</button> 
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog> */}
                        {/* </CardActionArea> */}
                        {/* <CardActions>

                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            // handleRemoveClick(index);
                                                        }}
                                                        className="btn btn-sm bg-danger-light btn-block"

                                                    >
                                                        Remove NFT
                                                    </Button>
                                                </CardActions> */}
                        {/* <NFTDetailModal 
                                                    show={openDialog} 
                                                    handleClose={handleCloseNFTDetailModal}
                                                    nftDetail={tokenList[index]}
                                                    handleEdit={handleEdit}
                                                >
                                                </NFTDetailModal>
                                                <NFTEditModal
                                                    show={openEditModal}
                                                    handleClose={handleEditClose}
                                                    nftDetail={i}
                                                    index={index}
                                                    onUpdate={onUpdateEditModal}
                                                >
                                                </NFTEditModal> */}
                      </Grid>
                    </Grid>
                  </div>
                </div>
                {/* </Scrollbars> */}
              </form>
            ) : null}
          </div>
        </div>
        {isSaving ? (
          <div className="text-center">
            <Spinner animation="border" role="status" style={{ color: "#fff" }}>
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : isAdded ? (
          <div className="submit-section">
            <button
              type="button"
              // onClick={(e) => handleSubmitEvent(e)}
              onClick={(e) => {
                versionB === "v1-sso"
                  ? handleOpenModal(e)
                  : handleSubmitEvent(e);
              }}
              // onClick={handleOpenModal}
              className="bttn"
            >
              Update Drop
            </button>
          </div>
        ) : (
          <div className="submit-section">
            <button type="button" disabled className="bttn">
              Update Drop
            </button>
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
      />
      {/* <NFTEditModal
                show={openEditModal}
                handleClose={handleEditClose}
                nftDetail={nftDetail}
                // index={index}
                onUpdate={onUpdateEditModal}
                handleChangeCollection={handleChangeCollectionOpen}
                isUploadingData={isUploadingData}
            >
            </NFTEditModal> */}
      {/* <ChangeCollectionConfirmationModal
                show={changeCollection}
                handleClose={handleChangeCollectionClose}
                collectionDetails={changeCollectionList}
                updateChangeCollection={updateChangeCollection}
                isUploading={isUploadingData}
            >
            </ChangeCollectionConfirmationModal> */}
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AddNFT;
