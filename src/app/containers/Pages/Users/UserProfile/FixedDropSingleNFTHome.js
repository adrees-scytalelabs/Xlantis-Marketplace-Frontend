// REACT
import React, { useEffect, useState } from "react";
// REACT ROUTER
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import transakSDK from "@transak/transak-sdk";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";

import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import Collectible721 from "../../../../components/blockchain/Abis/Collectible721.json";

import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import { useSnackbar } from "notistack";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ReactTooltip from "react-tooltip";


// MUI
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import { Col, Row, Table } from "react-bootstrap";
// COMPONENTS
import HeaderHome from "../../../../components/Headers/Header";
import Web3 from "web3";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import DateTimePicker from "react-datetime-picker";
import ListIcon from "@material-ui/icons/List";
import Footer from "../../../../components/Footers/Footer";

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
}));

const customTheme = createMuiTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "black",
      },
      // content: {
      //     borderBottom: "1px solid white",
      //     paddingBottom: "12px"
      // },
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
    // MuiIconButton: {
    //     root: {
    //         padding: 0
    //     },
    //     label: {
    //         borderBottom: "1px solid white",
    //         padding: "12px",
    //     }
    // }
  },
});

// COMPONENT FUNCTION
const FixedDropSingleNFTHome = () => {
  // Sates
  const [nftData, setNftData] = useState();
  const [bidableDrop, setBidableDrop] = useState();
  const [biddingValue, setBiddingValue] = useState(0);
  const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
  const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(
    Math.round(bidExpiryTime.getTime() / 1000)
  );
  const [price, setPrice] = useState();
  const [nftProperties, setNftProperties] = useState([]);
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();
  let dropID = location.state.dropId;
  const saleType = location.state.saleType;
  const description = location.state.description;
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  let [versionB, setVersionB] = useState("");



  // Variables
  const { singleNFTid } = useParams();

  // Handlers
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
  const handleCloseModal = () => {
    setMOdalOpen(false);
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


  const handleOpenModal = async(e) => {
    const dropId = nftData.dropId;
    const nftId = nftData._id;
    console.log("NFTDETAIL", nftData);
    axios.get(`v1-sso/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`).then(
      (response) => {
        console.log("response", response);
        console.log("responeee", response.data.data.data[0]);
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

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    cryptoCurrencyCode: "MATIC",
    network: "private",
    defaultNetwork: "polygon",
    walletAddress : "0xE66a70d89D44754f726A4B463975d1F624530111",
    fiatAmount : 1100,
    isAutoFillUserData : true,
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

  let handleBuy = async () => {
    // setNftDetail(nftObject);
    console.log("Nft detail: ", nftData);
    console.log("Price", nftData);
    console.log("INSIDE BUY FUNCTION");
    // setNftDetail(nftDetail);
    // console.log("Nft detail id: ", nftDetail.collectionId._id);
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
              // let nftVoucher = {
              //     "tokenId" : nftData.nftId,
              //     "price" : nftData.currentMarketplaceId.price,
              //     "uri" : nftData.nftURI,
              //     "signature" : "signature"
              // }
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


      function handleSSOBuy()
      {
        // setnftData(nftObject);
        console.log("Nft detail: ", nftData);
        console.log("Price", nftData);
        // setnftData(nftData);
        // console.log("Nft detail id: ", nftData.collectionId._id)
        // setOpenDialog(false);
        // setIsSaving(true);
        // handleShowBackdrop();
       
        // let data = {
        //   dropId: nftData.dropId,
        //   nftId: nftData._id,
        // };

        // axios.post(`/${versionB}/marketplace/buy`, data).then(
        //   (response) => {
            
        //     console.log("nft buy response", response.data);
        //     let variant = "success";
        //     enqueueSnackbar("Purchase Is Being Finalized. Transactions Are In Process", { variant });
        //     handleCloseModal();
    
        //   },
        //   (error) => {
        //     if (process.env.NODE_ENV === "development") {
        //       console.log(error);
        //       console.log(error.response);
        //       let variant = "error";
        //       enqueueSnackbar("Unable To Buy NFT.", { variant });
        //       handleCloseModal();
        //     }
        //     if (error.response.data !== undefined) {
        //       if (
        //         error.response.data === "Unauthorized access (invalid token) !!"
        //       ) {
        //         Cookies.remove("Authorization");
        //         localStorage.removeItem("Address");
        //         window.location.reload();
        //       }
        //     }
        // })

       
    }
      
      // await myContractInstance.methods.executeOrder(dropIdHex, nftData.collectionId.nftContractAddress, nftData.nftId, nftData.tokenSupply, nftData.currentMarketplaceId.price).send({from : accounts[0]}, (err, response) => {
      //     console.log('get transaction', err, response);
      //     let data = {
      //         dropId : nftData.dropId,
      //         nftId : nftData._id,
      //         txHash : response

      //     }

      //     console.log("data",data);
      //     axios.post(`/marketplace/buy`, data).then(
      //         (response) => {
      //             console.log("Transaction Hash sending on backend response: ", response);
      //         },
      //         (error) => {
      //             console.log("Transaction hash on backend error: ", error.response);
      //         }
      //     )

      //     if (err !== null) {
      //         console.log("err", err);
      //         let variant = "error";
      //         enqueueSnackbar('User Canceled Transaction', { variant });
      //         handleCloseBackdrop();
      //         setIsSaving(false);

      //     }

      // })
      // .on('receipt', (receipt) => {
      //     console.log("receipt", receipt);

      // })
    }
  };



  function SSOBuy() {
    console.log("SSO BUY");
      // setnftData(nftObject);
      console.log("Nft detail: ", nftData);
      console.log("Price", nftData);
      // setnftData(nftData);
      console.log("Nft detail id: ", nftData.collectionId._id)
      setOpenDialog(false);
      setIsSaving(true);
      handleShowBackdrop();
     
      let data = {
        dropId: nftData.dropId,
        nftId: nftData._id,
      };
      handleCloseModal();
      axios.post(`/${versionB}/marketplace/buy`, data).then(
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
      })

  }
  //   let handleBidSubmit = async (event) => {
  //     event.preventDefault();

  //     //conditions checking
  //     console.log("Bid Expiry Timestamp: ", bidExpiryTimeStamp);
  //     console.log("Drop Expiry Timestamp: ", dropExpiryTimeStamp);
  //     console.log("Bid Expiry Time: ", bidExpiryTime);
  //     console.log("Drop Expiry Time: ", dropExpiryTime);

  //     if(bidExpiryTimeStamp > dropExpiryTimeStamp || new Date(bidExpiryTime) > new Date(dropExpiryTime)) {
  //         let variant = 'error';
  //         enqueueSnackbar("Bid Expiry Time cannot be more than Drop's Expiry Time.", { variant });
  //     }
  //     if (biddingValue === 0) {
  //         let variant = "error";
  //         enqueueSnackbar("Bidding Value cannot be zero.", { variant });
  //     }
  //     else {
  //         await loadWeb3();
  //         const web3 = window.web3
  //         const accounts = await web3.eth.getAccounts();
  //         console.log("Accounts[0]: ", accounts[[0]]);
  //         const network = await web3.eth.net.getNetworkType()
  //         if (network !== 'private') {
  //             setNetwork(network);
  //             handleShow();
  //         }
  //         else {
  //             handleShowBackdrop();
  //             await giveAuctionErc20Approval();

  //             //put condition here if badding value is higher than max bid or if there is first bid then it should be higher than floor value
  //             let bidData = {
  //                 nftId: nftData._id,
  //                 bidAmount: biddingValue.toString(),
  //                 bidderAddress: accounts[0],
  //                 expiryTime: bidExpiryTime
  //             }

  //             console.log("Type of time: ", typeof(bidExpiryTime), bidExpiryTime);
  //             console.log("Bid data: ", bidData);

  //             let dropIdHash = getHash(dropIdObj);
  //             let nftId = nftBlockChainId;
  //             let bidValue = web3.utils.toWei(biddingValue, 'ether');

  //             console.log("NFT id type: ", typeof(nftId));
  //             console.log("Bid Value type: ", typeof(bidValue), bidValue);
  //             console.log("Drop Id Hash: ", dropIdHash);

  //             let contractAddress;
  //             let contractAbi;

  //             if (contractType === '1155') {
  //                 contractAddress = Addresses.AuctionDropFactory1155;
  //                 contractAbi = AuctionDropFactory1155ABI;
  //                 console.log("hello", contractAddress, contractType);
  //             }
  //             else if (contractType === '721') {
  //                 contractAddress = Addresses.AuctionDropFactory721;
  //                 contractAbi = AuctionDropFactory721ABI;
  //             }

  //             let myContractInstance = await new web3.eth.Contract(contractAbi, contractAddress);
  //             let trxHash;

  //             axios.post(`/${versionB}/auction/bid`, bidData).then(
  //                 (response) => {
  //                     console.log("Response from sending bid data to backend: ", response);
  //                     let bidIdHash = getHash(response.data.bidId);
  //                     let bidId = response.data.bidId;

  //                     //sending call on blockchain

  //                     console.log("Bid data for blockchain: ");
  //                     console.log("drop id hash: ", dropIdHash);
  //                     console.log("bid id hash: ", bidIdHash);
  //                     console.log("nft address: ", location.state.nftContractAddress);
  //                     console.log("nft id: ", nftId);
  //                     console.log("bid Value: ", bidValue);

  //                     myContractInstance.methods.bid(dropIdHash, bidIdHash, location.state.nftContractAddress, nftId, bidValue).send({ from: accounts[0] }, (err, response) => {
  //                         console.log('get transaction: ', err, response);
  //                         if (err !== null) {
  //                             console.log('err: ', err);
  //                             handleCloseBackdrop();
  //                         }
  //                         trxHash = response;

  //                     })
  //                     .on('receipt', (receipt) => {
  //                         console.log('receipt: ', receipt);

  //                         //sending finalize call on backend
  //                         let finalizeBidData = {
  //                             "bidId": bidId,
  //                             "txHash": trxHash
  //                         }

  //                         axios.put(`/${versionB}/auction/bid/finalize`, finalizeBidData).then(
  //                             (response) => {
  //                                 console.log("Response from finalize bid: ", response);
  //                             },
  //                             (err) => {
  //                                 console.log("Err from finalize bid: ", err);
  //                                 console.log("Err response from finalize bid: ", err);
  //                             }
  //                         )
  //                         handleCloseBackdrop();
  //                     });
  //                 },
  //                 (error) => {
  //                     console.log("Error from sending bid data to backend: ", error);
  //                     handleCloseBackdrop();
  //                 }
  //             )
  //         }
  //     }
  // }


  const getNFTDetails = () => {
    let version = Cookies.get("Version");

    console.log("Authorization",Cookies.get('Authorization'));
    let endpoint;
    if (version === undefined) {
      endpoint = `/v1-sso/drop/nft/${singleNFTid}`
    }
    else
    {
      endpoint = `/${version}/drop/nft/${singleNFTid}`
    }
    axios.get(endpoint).then(
      (res) => {
        console.log("finding the price: ... ", res);
        setNftData(res.data.data[0]);
        // setNftProperties(Object.entries(res.data.data[0].properties));
      },
      (err) => console.log("Drop could not be get: ", err.response)
    );
  };

  let getBidableDrops = () => {
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/v1-sso/drop/${dropID}`
    }
    else
    {
      endpoint = `/${version}/drop/${dropID}`
    }
    axios.get(endpoint).then(
      (res) => {
        setBidableDrop(res.data.dropData);
      },
      (err) => {
        console.log("could not get bidable drops ", err.response);
      }
    );
  };

  useEffect(() => {

    const controller = new AbortController();
    setVersionB(Cookies.get("Version"));
    getNFTDetails();
    // getBidableDrops();
    let priceCal = Web3.utils.fromWei(location.state.price, "ether");
    setPrice(priceCal);

    return () => {
      controller.abort();
    };
  }, []);

  if (bidableDrop !== undefined) {
    console.log("bidding response: ... ", bidableDrop);
  }

  // jsx
  return (
    <>
      {/* Header */}
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
                {/* NFT Image */}
                <div className="col-md-12 col-lg-4 pr-md-3">
                  <Paper elevation={5}>
                    <Card className={classes.root}>
                      <div style={{ marginTop: "20px" }}>
                        <CardMedia
                          className={classes.media}
                          title={nftData?.title}
                          image={nftData?.nftURI}
                        ></CardMedia>
                      </div>
                    </Card>
                  </Paper>
                </div>
                {/* NFT Details */}
                <div className="col-md-12 col-lg-8 pl-md-3">
                  {/* Details */}
                  <Card style={{ backgroundColor: "black" }}>
                    <CardContent>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>NFT Title </strong>
                          </Typography>
                        </Col>
                        <Col>
                          <Typography
                            variant="body1"
                            style={{
                              color: "white",
                              fontFamily: "inter",
                              fontSize: "1rem",
                            }}
                          >
                            {nftData.title}
                          </Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>NFT Description </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.description}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{ color: "#F64D04", fontFamily: "orbitron" }}
                          >
                            <strong>Price </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {price} WMATIC
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{
                              color: "#F64D04",
                              fontFamily: "orbitron",
                            }}
                          >
                            <strong>Supply Type </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.supplyType ? nftData.supplyType : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography
                            variant="body1"
                            component="p"
                            style={{
                              color: "#F64D04",
                              fontFamily: "orbitron",
                            }}
                          >
                            <strong>Token Supply </strong>
                          </Typography>
                        </Col>
                        <Col
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.tokenSupply}
                        </Col>
                      </Row>
                    </CardContent>
                  </Card>
                  {/* Porperties */}
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
                              {/* {keys?.map((j, index) => (
                          <tr key={index}>
                            <td>{j}</td>
                            <td>{properties[j]}</td>
                          </tr>
                        ))} */}
                            </tbody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <br></br>
                  {/* Buttons */}
                  {bidableDrop?.saleType !== "auction" ? (
                    <div className="row no-gutters" >
                      {versionB &&
                      nftData.isOnSale === true ? (
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                          <button
                            className="bidBtn w-100"
                            type="button"
                            // onClick={(e) => handleBuy(e)}
                            onClick = {(e) => {versionB === "v1-sso" ? (handleOpenModal(e)) : (handleBuy(e))} }
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
                            className="bidBtn w-100"
                            type="button"
                            data-tip
                            data-for="registerTip"
                            disabled
                            // onClick={(e) => handleBuy(e)}
                            onClick={(e) => console.log(e)}
                          >
                            Buy
                          </button>
                        {/* {nftData.currentMarketplaceId.isSold  === true ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        NFT Is Sold
                      </ReactTooltip> */}
                      {!versionB ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        You Need To Login First  
                      </ReactTooltip>
                    ) :  nftData.currentMarketplaceId.isSold === true ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        NFT IS SOLD
                      </ReactTooltip>
                    ) : nftData.isOnSale === false ? (
                        <ReactTooltip id="registerTip" place="top" effect="solid" style={{color: "white"}}>
                          NFT Is Not On Sale
                        </ReactTooltip>
                    ) : null}
                        </div>
                      )}
                    </div>
                  ) : bidableDrop.saleType === "auction" ? (
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
                                    // onClick={(e) => handleBidSubmit(e)}
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
                                    {/* <th colSpan={2}></th> */}
                                    {/* <th>
                                                            <button className="btn" onClick={props.acceptBid}>
                                                                Accept
                                                            </button>
                                                        </th> */}
                                  </tr>
                                </thead>
                                {/* <tbody>
                                                    {bidDetail?.map((bid, index) => (
                                                        <tr key={index}>
                                                            <td style={{padding: "0.75rem"}}>{index+1}</td>
                                                            <td style={{padding: "0.75rem"}}>
                                                                <Tooltip title={bid.bidderAddress}>
                                                                    <span>{bid.bidderAddress.slice(0,6)}...</span>
                                                                </Tooltip>
                                                            </td>
                                                            <td style={{padding: "0.75rem"}}>{bid.bidAmount}</td>
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody> */}
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
                <Card
                  variant="outlined"
                  style={{
                    padding: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                  }}
                >
                  <Typography
                    variant="body2"
                    className="text-center"
                    // color="textSecondary"
                    component="p"
                    style={{ color: "#fff" }}
                  >
                    <strong>No items to display </strong>
                  </Typography>
                </Card>
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
          {/* FOOTER */}
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
      ></NetworkErrorModal>
      <BuyTxModal handleClose={handleCloseModal} open={modalOpen} handleBuy = {SSOBuy}  handlePay = {openTransak} dropData = {data} isOpen = {modalOpen} />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FixedDropSingleNFTHome;
