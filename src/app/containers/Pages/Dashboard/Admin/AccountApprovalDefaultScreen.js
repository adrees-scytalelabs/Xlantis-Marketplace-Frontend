import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, Tooltip } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import { useHistory } from "react-router-dom";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import Table from "react-bootstrap/Table";

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

function AccountApprovalDefaultScreen(props) {
  const classes = useStyles();

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let [admins, setAdmins] = useState([]);
  let [walletAdmins, setWalletAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);

  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleModalOpen = (e, data) => {
    e.preventDefault();
    handleShow();
    setModalData(data);
  };
  const handleModalClose = (e, data) => {
    e.preventDefault();
    handleClose();
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const history = useHistory();

  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage);
    getUnverifiedAdminsSSO(0, rowsPerPage);
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "active",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    }); 
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    
    setPage(0);
  };

  let getUnverifiedAdminsSSO = (start, end) => {
    
    setOpen(true);
    axios
      .get(`/super-admin/admins/unverified/${start}/${end}?userType=v1`)
      .then((response) => {
        setAdmins(response.data.unverifiedAdmins);
        setAdminCount(response.data.unverifiedAdmins.length);
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

  let getUnverifiedAdminsWallet = (start, end) => {
    
    setOpen(true);
    axios
      .get(`/super-admin/admins/unverified/${start}/${end}?userType=v2`)
      .then((response) => {
        setWalletAdmins(response.data.unverifiedAdmins);
        setAdminCount(response.data.unverifiedAdmins.length);
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

  let handleVerify = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Verified Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getUnverifiedAdminsSSO(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
  };

  let handleVerifyWallet = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v2`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Verified Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getUnverifiedAdminsWallet(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
  };

  return (
    <div className="backgroundDefault">
      
      <div>
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
                    Approval Status
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((i, index) => (
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
                  <td className={`${classes.collectionTitle}`}>
                    <span className="ml-1">
                      <label className="ml-5">SSO</label>
                    </span>
                  </td>
                  <td>
                    
                    {i.isVerified ? (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button disabled>
                          <span className="text-white">Verified</span>
                          <i
                            className="fas fa-check ml-2"
                            style={{ color: "#F64D04" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          
                          onClick={(e) => {
                            handleVerify(e, i._id);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    )}

                    
                  </td>
                </tr>
              ))}
              {walletAdmins.map((i, index) => (
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
                    
                    {i.isVerified ? (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button disabled>
                          <span className="text-white">Verified</span>
                          <i
                            className="fas fa-check ml-2"
                            style={{ color: "#F64D04" }}
                          ></i>{" "}
                        </Button>
                      </div>
                    ) : (
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          
                          onClick={(e) => {
                            handleVerifyWallet(e, i._id);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    )}

                    
                  </td>
                </tr>
              ))}
            </tbody>
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

export default AccountApprovalDefaultScreen;
