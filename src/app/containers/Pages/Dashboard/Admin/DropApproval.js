import { createTheme } from "@material-ui/core";
import { TablePagination } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Web3 from "web3";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import DropApprovalTable from "../../../../components/tables/DropApprovalTable";



function DropApproval(props) {

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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
        abiNft = CreateNFTContract1155;
        addressDropFactory = Addresses.AuctionDropFactory1155;
      } else if (i.contractType === "721") {
        abiNft = CreateNFTContract721;
        addressDropFactory = Addresses.AuctionDropFactory721;
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
            enqueueSnackbar("User Canceled Transaction", { variant });
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

          axios.put(`/collection/approve`, approvalData).then(
            (response) => {
              setIsAuctionApproved(true);
              setApprovingAuction(false);
            },
            (err) => {
              console.log("Err from auction approval: ", err);
              console.log("Err response from auction approval: ", err.response);
              setApprovingAuction(false);
            }
          );
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
          abiNft = CreateNFTContract1155;
          addressDropFactory = Addresses.FactoryDrop1155;
        } else if (i.contractType === "721") {
          console.log("721 enter");
          abiNft = CreateNFTContract721;
          addressDropFactory = Addresses.FactoryDrop721;
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
              enqueueSnackbar("User Canceled Transaction", { variant });
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

            axios.put(`/collection/approve`, approvalData).then(
              (response) => {
                let variant = "success";
                enqueueSnackbar(
                  "Collection Approved For Fixed Price Successfully",
                  { variant }
                );
                setIsFixedPriceApproved(true);
                setApprovingFixedPrice(false);
              },
              (err) => {
                let variant = "error";
                enqueueSnackbar("Unable to approve collection", { variant });
                console.log("Err from approval Fixed-price: ", err);
                console.log(
                  "Err response from approval Fixed-price: ",
                  err.response
                );
                setApprovingFixedPrice(false);
              }
            );
          });
      }
    } catch (e) {
      console.log("Fixed drop issue", e);
    }
  };

  let getCollections = (start, end) => {
    const version = Cookies.get("Version");
    setOpen(true);
    axios
      .get(`/collection/myCollections/${start}/${end}`)
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
    </div>
  );
}

export default DropApproval;
