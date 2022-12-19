import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import DateTimePicker from "react-datetime-picker";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CreateAuctionContract from "../../../../components/blockchain/Abis/CreateAuctionContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import CubeComponent1 from "../../../../components/Cube/CubeComponent1";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import { useHistory, useRouteMatch } from "react-router-dom";
import ipfs from "../../../../components/IPFS/ipfs";
import Table from "react-bootstrap/Table";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import Factory1155Contract from "../../../../components/blockchain/Abis/Factory1155.json";
import Factory721Contract from "../../../../components/blockchain/Abis/Factory721.json";

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
}));

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

          axios.put("/collection/approve", approvalData).then(
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

  let getCollections = (start, end) => {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
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
            Cookies.remove("Authorization");
            localStorage.removeItem("Address");
            window.location.reload();
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
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
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
                            style={{ color: "#28a760" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          style={{
                            backgroundColor: "#28a760",
                            color: "#fff",
                            padding: "6px 24px",
                          }}
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
                            style={{ color: "#28a760" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          style={{
                            backgroundColor: "#28a760",
                            padding: "6px 24px",
                            color: "#fff",
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
