
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import transakSDK from "@transak/transak-sdk";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import Web3 from "web3";
import {
  getBuyNFTTxCostSummarySSO, marketplaceBuyVersioned,
} from "../../../../components/API/AxiosInterceptor";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AuctionNFTDetailCard from "../../../../components/Cards/AuctionNFTCards/AuctionNFTDetailCard";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import BuyButton from "../../../../components/buttons/Buy";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "black",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },

}

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

const NFTBuy = (props) => {
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [properties, setProperties] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");
  const [price, setPrice] = useState();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [versionB, setVersionB] = useState("");
  const [modalOpen, setMOdalOpen] = useState(false);
  const [data, setData] = useState();

  const handleOpenModal = async (e) => {
    const dropId = nftDetail.dropId;
    const nftId = nftDetail._id;
    getBuyNFTTxCostSummarySSO(dropId, nftId)
      .then((response) => {
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

  let handleBuy = async () => {
    console.log("Nft detail: ", nftDetail);
    console.log("Price", nftDetail);
    let dropIdHex = getHash(nftDetail.dropId);
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
      if (nftDetail.collectionId.contractType === "1155") {
        console.log("IN 1155");
        addressApprove = addressDropFactory1155;
      } else if (nftDetail.collectionId.contractType === "721") {
        console.log("IN 721");
        addressApprove = addressDropFactory721;
      }

      var erc20Instance = await new web3.eth.Contract(abiERC20, addressERC20);
      let userBalance = await erc20Instance.methods
        .balanceOf(accounts[0])
        .call();
      console.log(userBalance);
      if (userBalance < nftDetail.currentOrderListingId.price) {
        let variant = "error";
        enqueueSnackbar("User have insufficient funds to buy this NFT", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        erc20Instance.methods
          .approve(addressApprove, nftDetail.currentOrderListingId.price)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
          })
          .on("receipt", async (receipt) => {
            console.log("approval receipt", receipt);
            if (nftDetail.collectionId.contractType === "1155") {
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory1155,
                addressDropFactory1155
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
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            } else if (nftDetail.collectionId.contractType === "721") {
              console.log("LAZY MINTING");
              var myContractInstance = await new web3.eth.Contract(
                abiDropFactory721,
                addressDropFactory721
              );
              console.log("myContractInstance Drop 721", myContractInstance);
              await myContractInstance.methods
                .executeOrderLazyMint(
                  dropIdHex,
                  nftDetail.collectionId.nftContractAddress,
                  nftDetail.nftId,
                  nftDetail.nftURI,
                  nftDetail.currentOrderListingId.price,
                  nftDetail.voucherSignature
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
                  console.log("receipt lazy mint", receipt);
                  let variant = "success";
                  enqueueSnackbar("NFT Bought Successfully", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                });
            }
          });
      }

      function handleSSOBuy() {
        console.log("Nft detail: ", nftDetail);
        console.log("Price", nftDetail);
      }
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
  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    setNftDetail(location.state.nftDetail);
    setPrice(location.state.nftDetail.currentOrderListingId.price);
    setProperties(location.state.nftDetail.properties);

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

  function SSOBuy() {
    console.log("SSO BUY");
    console.log("Nft detail: ", nftDetail);
    console.log("Price", nftDetail);
    console.log("Nft detail id: ", nftDetail.collectionId._id);
    setOpenDialog(false);
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      dropId: nftDetail.dropId,
      nftId: nftDetail._id,
    };
    handleCloseModal();
    marketplaceBuyVersioned(versionB, data)
      .then((response) => {
        console.log("nft buy response", response.data);
        let variant = "success";
        enqueueSnackbar("NFT BOUGHT SUCCESSFULLY", { variant });
        handleCloseBackdrop();
      })
      .catch((error) => {
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
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload();
          }
        }
      });
  }
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">MarketPlace</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/marketPlace`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place
                </li>
              </Link>
              <Link
                to={`/dashboard/marketPlace/drops/nfts`}
                state={{
                  nftId: location.state.nftId,
                  dropId: location.state.dropId,
                }}
              >
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place Drops
                </li>
              </Link>
              <li className="breadcrumb-item active">Buy Details</li>
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
              <AuctionNFTDetailCard nftDetail={nftDetail} price={price} />
              <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Col>
                  <PropertiesAccordian
                    properties={properties}
                    key={Object.keys(properties)}
                  />
                </Col>
              </Row>
              <br></br>
              <BuyButton
                isSold={location.state.nftDetail.currentOrderListingId.isSold}
                startTime={location.state.startTime}
                endTime={location.state.endTime}
                versionB={versionB}
                handleOpenModal={handleOpenModal}
                handleBuy={handleBuy}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <BuyTxModal
        handleClose={handleCloseModal}
        open={modalOpen}
        handleBuy={SSOBuy}
        handlePay={openTransak}
        dropData={data}
        isOpen={modalOpen}
      />
      <CircularBackdrop open={open} />
    </div>
  );
};

export default NFTBuy;
