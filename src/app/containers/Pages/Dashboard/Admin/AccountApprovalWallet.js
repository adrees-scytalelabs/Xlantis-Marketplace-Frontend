import { TablePagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUnverifiedAdminsV2Paginated, removeAdmin } from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import MessageCard from "../../../../components/MessageCards/MessageCard";

function AccountApprovalWallet(props) {
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const getUnverifiedAdminsWallet = (start, end) => {
    setOpen(true);
    getUnverifiedAdminsV2Paginated(start, end)
      .then((response) => {
        console.log(
          "Response from getting unverified wallet admins: ",
          response
        );
        setWalletAdmins(response?.data?.unverifiedAdmins);
        setAdminCount(response?.data?.unverifiedAdmins.length + adminCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error from getting unverified wallet admins: ", error);
        setSnackbarMessage("Error Fetching Wallet Admins");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setOpen(false);
      });
  };

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
  const handleDelete = async (e, id) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: id,
    };
  
    try {
      await removeAdmin(data);
      handleCloseBackdrop();
      getUnverifiedAdminsWallet(0, rowsPerPage);
      let variant = "success";
      setSnackbarMessage("Admin Remove Successfully.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } catch (error) {
      console.log("Error on remove: ", error);
      console.log("Error on remove: ", error.response);
      handleCloseBackdrop();
      let variant = "error";
      setSnackbarMessage("Unable to remove Admin.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    }
  };
  const handleVerifyWallet = (e, verifyAdminId) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v2`, data).then(
      (response) => {
        handleCloseBackdrop();
        getUnverifiedAdminsWallet(0, rowsPerPage);
        let variant = "success";
        setSnackbarMessage("Admin Approved Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);
        handleCloseBackdrop();
        let variant = "error";
        setSnackbarMessage("Unable to Verify Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage);
  }, [rowsPerPage]);

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "active",
      accountApproval: "",
      accounts: "",
      sso: "active",
      wallet: "active",
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
  return (
    <div className="backgroundDefault">
      {walletAdmins.length === 0 ? (
        <MessageCard msg="No data available" />
      ) : (
        <>
          <div className="row no-gutters">
            <SuperAdminTable
              walletAdmins={walletAdmins}
              handleModalOpen={handleModalOpen}
              ssoEnabled={false}
              walletEnabled={true}
              approval={true}
              handleVerifyWallet={handleVerifyWallet}
              setShow={setShow}
              setModalData={setModalData}
              handleDelete={handleDelete}
            />
          </div>
          <TablePagination
            rowsPerPageOptions={[4, 8, 12, 24]}
            component="div"
            count={adminCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
        setShow={setShow}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default AccountApprovalWallet;
