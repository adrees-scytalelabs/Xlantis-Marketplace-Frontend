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
import { createMuiTheme, Tooltip } from "@material-ui/core";
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
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  noMaxWidth: {
    maxWidth: "none",
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
    fontFamily: "inter",
  },
  approveBtn: {
    backgroundColor: "#F64D04",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&$hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
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

function Disabled(props) {
  const classes = useStyles();

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let [admins, setAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);

  let [adminCount, setAdminCount] = useState(0);
  let [walletAdminCount, setWalletAdminCount] = useState(0);
  let [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [modalData, setModalData] = useState();
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
  const handleModalOpen = (e, data) => {
    e.preventDefault();
    handleShow();
    setModalData(data);
  };
  const handleModalClose = (e, data) => {
    e.preventDefault();
    handleClose();
  };

  const history = useHistory();

  useEffect(() => {
    getDisableSSOAdmins();
    getDisableWalletAdmins();
     
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    
    setPage(0);
  };

  let getDisableSSOAdmins = () => {
    
    setOpen(true);
    axios
      .get(`/super-admin/admins/disabled?userType=v1`)
      .then((response) => {
        console.log("response.data", response.data);
        setAdmins(response.data.admins);
        setAdminCount(response.data.admins.length);
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

  let getDisableWalletAdmins = () => {
    
    setOpen(true);
    axios
      .get(`/super-admin/admins/disabled?userType=v2`)
      .then((response) => {
        console.log("response.data", response.data);
        setWalletAdmins(response.data.admins);
        setWalletAdminCount(response.data.admins.length);
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
            window.location.reload(false);
          }
        }
        setOpen(false);
      });
  };

  let handleEnableSSO = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    //sending data to backend
    let data = {
      adminId: verifyAdminId,
    };

    console.log("data", data);

    axios.patch(`/super-admin/enable?userType=v1`, data).then(
      (response) => {
        console.log("admin verify response: ", response);
        let variant = "success";
        enqueueSnackbar("Admin Disabled Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getDisableSSOAdmins(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Enable Admin.", { variant });
      }
    );
  };
  let handleEnableWallet = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    //sending data to backend
    let data = {
      adminId: verifyAdminId,
    };

    console.log("data", data);

    axios.patch(`/super-admin/enable?userType=v2`, data).then(
      (response) => {
        console.log("admin verify response: ", response);
        let variant = "success";
        enqueueSnackbar("Admin Disabled Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getDisableWalletAdmins(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Enable Admin.", { variant });
      }
    );
  };

  return (
    <div className="">
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          
          <Table responsive>
            <thead>
              <tr>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Username
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center ml-4">
                    Email
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Wallet Address
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center ml-5">
                    Details
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Login Type
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Status
                  </div>
                </th>
              </tr>
            </thead>
            {admins.map((i, index) => (
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.username}</td>
                  <td className={classes.collectionTitle}>{i.email}</td>
                  <td className={classes.collectionTitle}>
                    {i.walletAddress != undefined ? (
                      <Tooltip
                        classes={{ tooltip: classes.noMaxWidth }}
                        leaveDelay={800}
                        title={i.walletAddress}
                        arrow
                      >
                        <span className="ml-4">
                          {i.walletAddress.slice(0, 8)}...
                        </span>
                      </Tooltip>
                    ) : (
                      <label className="ml-4">N/A</label>
                    )}
                  </td>
                  <td className={classes.collectionTitle}>
                    <button
                      className="btn submit-btn propsActionBtn "
                      onClick={(e) => handleModalOpen(e, i)}
                    >
                      View
                    </button>
                  </td>
                  <td className={classes.collectionTitle}>
                    <span className="ml-1">
                      <label className="ml-5">SSO</label>
                    </span>
                  </td>
                  <td>
                    
                    {i.isEnabled === false ? (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          
                          onClick={(e) => {
                            handleEnableSSO(e, i._id);
                          }}
                        >
                          Enable
                        </Button>
                      </div>
                    ) : null}
                    
                  </td>
                </tr>
              </tbody>
            ))}
            {walletAdmins.map((i, index) => (
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.username}</td>
                  <td className={classes.collectionTitle}>
                    <label className="ml-4">N/A</label>
                  </td>
                  <td className={classes.collectionTitle}>
                    <Tooltip
                      classes={{ tooltip: classes.noMaxWidth }}
                      leaveDelay={800}
                      title={i.walletAddress}
                      arrow
                    >
                      <span className="ml-4">
                        {i.walletAddress.slice(0, 8)}...
                      </span>
                    </Tooltip>
                  </td>
                  <td className={classes.collectionTitle}>
                    <button
                      className="btn submit-btn propsActionBtn "
                      onClick={(e) => handleModalOpen(e, i)}
                    >
                      View
                    </button>
                  </td>
                  <td className={classes.collectionTitle}>
                    <label className="ml-5">Wallet</label>
                  </td>
                  <td>
                    
                    {i.isEnabled === false ? (
                      <div className="row no-gutters justify-content-center align-items-center ml-4">
                        <Button
                          className={classes.approveBtn}
                          
                          onClick={(e) => {
                            handleEnableWallet(e, i._id);
                          }}
                        >
                          Enable
                        </Button>
                      </div>
                    ) : null}
                    
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
      
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={adminCount}
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
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
      ></AdminInformationModal>
    </div>
  );
}

export default Disabled;
