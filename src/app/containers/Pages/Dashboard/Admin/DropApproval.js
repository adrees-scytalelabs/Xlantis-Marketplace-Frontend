import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import DateTimePicker from "react-datetime-picker";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import { useHistory, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    minWidth: 250,
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
  tableHeader: {
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
  },
  approveBtn: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&:hover": {
      background: "#f00",
    },
  },
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "#000",
        color: "#fff",
        padding: "10px 30px",
        border: "1px solid #F64D04",
        borderRadius: "0px 15px",
        "&$hover": {
          boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
        },
      },
    },
  },
});

function DropApproval(props) {
  const classes = useStyles();

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let [collections, setCollections] = useState([]);
  let [isSaving, setIsSaving] = useState(false);

  let [collectionCount, setCollectionCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); // eslint-disable-next-line
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  let [isFixedPriceApproved, setIsFixedPriceApproved] = useState(false);
  let [approvingFixedPrice, setApprovingFixedPrice] = useState(false);
  let [isAuctionApproved, setIsAuctionApproved] = useState(false);
  let [approvingAuction, setApprovingAuction] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);
  const [show, setShow] = useState(false);
  let [versionB, setVersionB] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const history = useHistory();

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getCollections(0, rowsPerPage);
    // getMyCubes();
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
    }); // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
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

          //sending call on backend

          let approvalData = {
            collectionId: i._id,
            factoryType: "auction",
          };

          axios.put(`/collection/approve`, approvalData).then(
            (response) => {
              console.log("Response from Auction approval: ", response);
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
    console.log(i);
    console.log("Contract Type", i.contractType);
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
                console.log(
                  "Response from approval of Fixed Price: ",
                  response
                );
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
    console.log("version", version);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
    //     "Authorization"
    // )}`;
    setOpen(true);
    axios
      .get(`/collection/myCollections/${start}/${end}`)
      .then((response) => {
        console.log("response.data", response.data);
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
      {/* Page Header */}
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
      {/* Page Content */}
      <div className="card-body">
        <div className="row">
          {/* <div className="col-md-12 col-lg-6"> */}
          <Table responsive>
            <thead>
              <tr>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Collection
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Auction
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Fixed Price
                  </div>
                </th>
              </tr>
            </thead>
            {collections.map((i, index) => (
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.name}</td>
                  <td>
                    {/* <div style={{backgroundColor : "#28a760"}}> */}
                    {i.isAuctionDropVerified ? (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button disabled>
                          <span className="text-white">Approved </span>
                          <i
                            className="fas fa-check ml-2"
                            style={{ color: "green" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          // style={{
                          //   backgroundColor: "#000",
                          //   color: "#fff",
                          //   padding: "10px 30px",
                          //   border: "1px solid #F64D04",
                          //   borderRadius: "0px 15px",
                          // }}
                          onClick={(e) => {
                            giveAuctionApproval(i);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                    {/* </div> */}
                  </td>
                  <td>
                    {i.isFixedPriceDropVerified ? (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button disabled>
                          <span style={{ color: "#fff" }}>Approved</span>{" "}
                          <i
                            className="fas fa-check ml-2"
                            style={{ color: "green" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          onClick={(e) => {
                            giveFixedPriceApproval(i);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
      {/* </div> */}
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={collectionCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default DropApproval;
