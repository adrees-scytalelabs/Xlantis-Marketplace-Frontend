import { TablePagination } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import {
  approveCollection,
  getMyCollectionsPaginated,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import Factory1155 from "../../../../components/blockchain/Abis/Factory1155.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import DropApprovalTable from "../../../../components/tables/DropApprovalTable";

function DropApproval(props) {
  const [network, setNetwork] = useState("");
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

  const [collections, setCollections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const [collectionCount, setCollectionCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [isFixedPriceApproved, setIsFixedPriceApproved] = useState(false);
  const [approvingFixedPrice, setApprovingFixedPrice] = useState(false);
  const [isAuctionApproved, setIsAuctionApproved] = useState(false);
  const [approvingAuction, setApprovingAuction] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [show, setShow] = useState(false);
  const [versionB, setVersionB] = useState("");

  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getCollections(0, rowsPerPage);
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      newDrop: "",
      newCube: "",
      mySeason: "",
      myCubes: "",
      myDrops: "",
      myNFTs: "",
      newCollection: "",
      orders: "",
      settings: "",
      dropApproval: "active",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newRandomDrop: "",
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getCollections(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getCollections(0, parseInt(event.target.value, 10));
    setPage(0);
  };

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

  let giveAuctionApproval = async (i) => {
    console.log(i);
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      setApprovingAuction(true);

      const addressNft = i.nftContractAddress;
      let addressDropFactory;
      let abiNft;
      if (i.contractType === "1155") {
        abiNft = Factory1155;
        addressDropFactory = Addresses.Factory1155;
      } else if (i.contractType === "721") {
        abiNft = Factory1155;
        addressDropFactory = Addresses.Factory1155;
      }

      console.log("Contract Address: ", i.nftContractAddress);
      var myContractInstance = await new web3.eth.Contract(abiNft, addressNft);
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .setApprovalForAll(addressDropFactory, true)
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);

          if (err !== null) {
            console.log("err", err);
            let variant = "error";
            setSnackbarMessage("User Canceled Transaction.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            setApprovingAuction(false);
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
          let approvalData = {
            collectionId: i._id,
            factoryType: "auction",
          };

          approveCollection(approvalData)
            .then((response) => {
              setIsAuctionApproved(true);
              setApprovingAuction(false);
            })
            .catch((error) => {
              console.log("Err from auction approval: ", error);
              console.log(
                "Err response from auction approval: ",
                error.response
              );
              setApprovingAuction(false);
            });
        });
    }
  };

  let giveFixedPriceApproval = async (i) => {
    try {
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      if (network !== "private") {
        setNetwork(network);
        setIsSaving(false);
        handleShow();
      } else {
        setApprovingFixedPrice(true);

        const addressNft = i.nftContractAddress;
        let addressDropFactory;
        let abiNft;
        if (i.contractType === "1155") {
          console.log("1155 enter");
          abiNft = Factory1155;
          addressDropFactory = Addresses.Factory1155;
        } else if (i.contractType === "721") {
          console.log("721 enter");
          abiNft = Factory1155;
          addressDropFactory = Addresses.Factory1155;
        }

        console.log("Contract Address: ", i.nftContractAddress);
        var myContractInstance = await new web3.eth.Contract(
          abiNft,
          addressNft
        );
        console.log("myContractInstance", myContractInstance);

        await myContractInstance.methods
          .setApprovalForAll(addressDropFactory, true)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);

            if (err !== null) {
              console.log("err", err);
              let variant = "error";
              setSnackbarMessage("User Canceled Transaction.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              setApprovingFixedPrice(false);
              handleCloseBackdrop();
              setIsSaving(false);
            }
          })
          .on("receipt", (receipt) => {
            console.log("receipt", receipt);

            //sending call on backend

            let approvalData = {
              collectionId: i._id,
              factoryType: "fixed-price",
            };
            approveCollection(approvalData)
              .then((response) => {
                let variant = "success";
                setSnackbarMessage(
                  "Collection Approved For Fixed Price Successfully."
                );
                setSnackbarSeverity(variant);
                handleSnackbarOpen();
                setIsFixedPriceApproved(true);
                setApprovingFixedPrice(false);
              })
              .catch((error) => {
                let variant = "error";
                setSnackbarMessage("Unable to approve collection.");
                setSnackbarSeverity(variant);
                handleSnackbarOpen();
                console.log("Err from approval Fixed-price: ", error);
                console.log(
                  "Err response from approval Fixed-price: ",
                  error.response
                );
                setApprovingFixedPrice(false);
              });
          });
      }
    } catch (e) {
      console.log("Fixed drop issue", e);
    }
  };

  let getCollections = (start, end) => {
    const version = Cookies.get("Version");
    setOpen(true);
    getMyCollectionsPaginated(start, end)
      .then((response) => {
        setCollections(response.data.collectionData);
        setCollectionCount(response.data.collectionCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload(false);
          }
        }
        setOpen(false);
      });
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Drop Approval</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Drop Approval</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className="card-body">
        <div className="row">
          <DropApprovalTable
            collections={collections}
            giveAuctionApproval={giveAuctionApproval}
            giveFixedPriceApproval={giveFixedPriceApproval}
          />
        </div>
      </div>

      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={collectionCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <CircularBackdrop open={open} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default DropApproval;
