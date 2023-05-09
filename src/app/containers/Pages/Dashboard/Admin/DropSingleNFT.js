import { createTheme, Paper, ThemeProvider } from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import Web3 from "web3";
import AcceptBidAccordian from "../../../../components/Accordian/AcceptBidAccordian";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import {
  acceptAuctionBid,
  getAuctionAcceptBidTxSummary,
  getNFTBidListPaginated,
  marketplaceBuyVersioned,
} from "../../../../components/API/AxiosInterceptor";
import abiAuctionDropFactory1155 from "../../../../components/blockchain/Abis/AuctionDropFactory1155.json";
import abiAuctionDropFactory721 from "../../../../components/blockchain/Abis/AuctionDropFactory721.json";
import DropFactory from "../../../../components/blockchain/Abis/DropFactory.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import DropSingleNFTCard from "../../../../components/Cards/DropSingleNFTCard";
import AcceptBidTxModal from "../../../../components/Modals/AcceptBidTxModal";
const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
};

const customTheme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid white",
          backgroundColor: "black",
        },
        expandIcon: {
          color: "white",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "8px 0px 16px",
          backgroundColor: "black",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          border: "1px solid white",
          color: "white",
          borderRadius: "5px",
          padding: "16px 14px",
        },
      },
    },
  },
});

const DropSingleNFT = (props) => {
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [properties, setProperties] = useState([]);
  const [keys, setKeys] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [show, setShow] = useState(false);
  const [bidDetail, setBidDetail] = useState([]);
  const [contractType, setContractType] = useState("");
  const [versionB, setVersionB] = useState("");
  const [bidId, setBidId] = useState();

  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();
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
  const handleCloseModalTx = () => {
    setMOdalOpen(false);
  };

  const handleOpenModal = async (e, bidId) => {
    setBidId(bidId);
    console.log("NFTDETAIL", nftDetail);
    getAuctionAcceptBidTxSummary()
      .then((response) => {
        console.log("response", response);
        console.log("responeee", response.data.data);
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

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  let handleBuy = async () => {
    console.log("Nft detail: ", nftDetail);
    let dropIdHex = getHash(nftDetail.dropId);
    console.log(dropIdHex);
    setOpenDialog(false);
    setIsSaving(true);
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
      const addressDropFactory = Addresses.FactoryDrop;
      const abiDropFactory = DropFactory;

      var myContractInstance = await new web3.eth.Contract(
        abiDropFactory,
        addressDropFactory
      );
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .executeOrder(
          dropIdHex,
          nftDetail.collectionId.nftContractAddress,
          nftDetail.nftId,
          nftDetail.tokenSupply,
          nftDetail.currentOrderListingId.price
        )
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);
          let data = {
            dropId: nftDetail.dropId,
            nftId: nftDetail._id,
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
            let variant = "error";
            enqueueSnackbar("User Canceled Transaction", { variant });
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
        });
    }
  };

  let getBidList = (nftId) => {
    let version = Cookies.get("Version");
    getNFTBidListPaginated(nftId, 0, 1000)
      .then((response) => {
        console.log("Response from getting bid: ", response);
        console.log("Bid array: ", response.data.data);
        setBidDetail(response.data.data);
      })
      .catch((error) => {
        console.log("Error from getting bids: ", error);
        console.log("Error response from getting bids: ", error);
        setBidDetail([]);
      });
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    setNftDetail(location.state.nftDetail);
    setContractType(location.state.nftDetail.collectionId.contractType);
    setKeys(Object.keys(location.state.nftDetail.properties));
    setProperties(location.state.nftDetail.properties);
    if (location.state.saleType === "auction") {
      getBidList(location.state.nftDetail._id);
    }

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "active",
      topUp: "",
    });
  }, []);

  let handleCloseModal = () => {
    setShow(false);
  };

  let handleAcceptBid = async (e, bidIdd) => {
    e.preventDefault();
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetworkModal();
    } else {
      let abiAuctionFactory;
      let addressAuctionFactory;

      if (contractType === "1155") {
        abiAuctionFactory = abiAuctionDropFactory1155;
        addressAuctionFactory = Addresses.AuctionDropFactory1155;
      } else if (contractType === "721") {
        abiAuctionFactory = abiAuctionDropFactory721;
        addressAuctionFactory = Addresses.AuctionDropFactory721;
      }

      let dropIdHash = getHash(nftDetail.dropId);
      let nftAddress = nftDetail.collectionId.nftContractAddress;
      let tokenId = nftDetail.nftId;
      let uri = nftDetail.nftURI;
      let signature = nftDetail.voucherSignature;
      let bidIdHash = getHash(bidIdd);
      let trxHash;

      let myContractInstance = await new web3.eth.Contract(
        abiAuctionFactory,
        addressAuctionFactory
      );
      console.log("My auction drop factory instance: ", myContractInstance);
      if (contractType === "1155") {
        await myContractInstance.methods
          .acceptBid(dropIdHash, nftAddress, tokenId, bidIdHash)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get Transaction: ", err, response);

            if (err !== null) {
              console.log("Err: ", err);
            }
            trxHash = response;
          })
          .on("receipt", (receipt) => {
            console.log("receipt: ", receipt);
          });
      } else if (contractType === "721") {
        await myContractInstance.methods
          .acceptBidLazyMint(
            dropIdHash,
            nftAddress,
            tokenId,
            uri,
            bidIdHash,
            signature
          )
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get Transaction: ", err, response);

            if (err !== null) {
              console.log("Err: ", err);
            }
            trxHash = response;
          })
          .on("receipt", (receipt) => {
            console.log("receipt: ", receipt);
          });
      }

      let data = {
        bidId: bidIdd,
        txHash: trxHash,
      };

      acceptAuctionBid(data)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  let handleAcceptBidSSO = async (e) => {
    e.preventDefault();

    handleShowBackdrop();
    let data = {
      bidId: bidId,
    };
    handleCloseModal();
    acceptAuctionBid(data)
      .then((response) => {
        console.log("nft bid response", response.data);
        let variant = "success";
        enqueueSnackbar("Bid Accepted Successfully", { variant });
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Unable To Accept Bid On NFT.", { variant });
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
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">NFT</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/myDrops`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  My Drops
                </li>
              </Link>
              <Link
                to={`/dashboard/myDrops/nfts`}
                state={{
                  nftId: location.state?.nftId,
                  dropId: location.state?.dropId,
                  saleType: location.state?.saleType,
                  status: location.state?.status,
                }}
              >
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Drop Nfts
                </li>
              </Link>
              <li className="breadcrumb-item active">NFT Detail</li>
            </ul>
          </div>
        </div>
      </div>
      <ThemeProvider theme={customTheme}>
        <div className="card-body px-0">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <Paper elevation={5}>
                <NFTMediaCard nftDetail={nftDetail} classes={styles} />
              </Paper>
            </div>
            <div className="col-md-12 col-lg-8">
              <DropSingleNFTCard nftDetail={nftDetail} />
              <Row style={{ marginTop: "5px" }}>
                <Col>
                    <PropertiesAccordian keys={keys} properties={properties} />
                </Col>
              </Row>
              {location.state.saleType === "auction" ? (
                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <AcceptBidAccordian
                      versionB={versionB}
                      bidDetail={bidDetail}
                      isSold={
                        location.state?.nftDetail.currentOrderListingId.isSold
                      }
                      handleAcceptBid={handleAcceptBid}
                      handleOpenModal={handleOpenModal}
                    />
                  </Col>
                </Row>
              ) : null}
            </div>
          </div>
        </div>
      </ThemeProvider>
      <AcceptBidTxModal
        handleClose={handleCloseModalTx}
        open={modalOpen}
        handleAcceptBid={handleAcceptBidSSO}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
    </div>
  );
};

export default DropSingleNFT;
