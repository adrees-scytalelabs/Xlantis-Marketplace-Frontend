import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import VerfiedAccountsTable from "../../../../components/tables/VerfiedAccountsTable";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }
}));

function VerifiedAccountsSSOScreen(props) {
  const classes = useStyles();
  const [network, setNetwork] = useState("");
  let [admins, setAdmins] = useState([]);
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUnverifiedAdmins(0, rowsPerPage);
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      verifiedAccounts: "active",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);
  const handleModalOpen = (e, data) => {
    e.preventDefault();
    handleShow();
    setModalData(data);
  };
  const handleModalClose = (e, data) => {
    e.preventDefault();
    handleClose();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

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

  return (
    <div className="backgroundDefault">
      <div className="row no-gutters">
        <VerfiedAccountsTable
          admins={admins}
          handleModalOpen={handleModalOpen}
          ssoEnabled={true}
          walletEnabled={false}
        ></VerfiedAccountsTable>
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

export default VerifiedAccountsSSOScreen;
