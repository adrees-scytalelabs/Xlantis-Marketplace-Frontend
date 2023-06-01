import { TablePagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUnverifiedAdminsV1Paginated } from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";

function AccountApprovalSSO(props) {
  const [admins, setAdmins] = useState([]);
  const [modalData, setModalData] = useState();
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getUnverifiedAdminsSSO = (start, end) => {
    setOpen(true);
    getUnverifiedAdminsV1Paginated(start, end)
      .then((response) => {
        console.log("Response from getting unverified admins: ", response);
        setAdmins(response?.data?.unverifiedAdmins);
        setAdminCount(response?.data?.unverifiedAdmins.length + adminCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error from getting unverified admins: ", error);
        setSnackbarMessage("Error Fetching SSO Admins");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setOpen(false);
      });
  };

  const handleVerify = (e, verifyAdminId) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop();
        getUnverifiedAdminsSSO(0, rowsPerPage);
        let variant = "success";
        setSnackbarMessage("Admin Verified Successfully.");
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
    getUnverifiedAdminsSSO(0, rowsPerPage);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="row no-gutters">
        <SuperAdminTable
          admins={admins}
          handleModalOpen={handleModalOpen}
          ssoEnabled={true}
          walletEnabled={false}
          approval={true}
          handleVerify={handleVerify}
          setShow={setShow}
          setModalData={setModalData}
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
export default AccountApprovalSSO;
