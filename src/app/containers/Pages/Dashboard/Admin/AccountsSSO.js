import { TablePagination } from "@material-ui/core/";

import { createMuiTheme, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";

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

function AccountsSSO(props) {
  const classes = useStyles();

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [modalData, setModalData] = useState();
  let [admins, setAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
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
    getUnverifiedAdmins(0, rowsPerPage);
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "active",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    }); 
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getUnverifiedAdmins(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getUnverifiedAdmins(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  let getUnverifiedAdmins = (start, end) => {
    
    setOpen(true);
    axios
      .get(`/super-admin/admins/${start}/${end}?userType=v1`)
      .then((response) => {
       // console.log("response.data", response.data);
        setAdmins(response.data.Admins);
        setAdminCount(response.data.Admins.length);
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
    //sending data to backend
    let data = {
      adminId: verifyAdminId,
    };

    //console.log("data", data);

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
       // console.log("admin verify response: ", response);
        let variant = "success";
        enqueueSnackbar("Admin Verified Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);
        handleCloseBackdrop();
        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
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

  return (
    <div className="backgroundDefault">
      
      <div>
        <div className="row no-gutters">
          <Table responsive>
            <thead>
              <tr>
                <th className={classes.tableHeader}>Username</th>
                <th className={classes.tableHeader}>
                  <span className="ml-4"> Email</span>
                </th>
                <th className={classes.tableHeader}>Wallet Address</th>
                <th className={classes.tableHeader}>
                  <div className="ml-5">Details</div>
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
                        leaveDelay={1500}
                        title={i.walletAddress}
                        arrow
                      >
                        <span className="ml-4">
                          {i.walletAddress.slice(0, 8)}...
                        </span>
                      </Tooltip>
                    ) : (
                      <label className="ml-5">N/A</label>
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
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
      ></AdminInformationModal>
    </div>
  );
}

export default AccountsSSO;
