
import { TablePagination } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminEnabledType1 } from "../../../../redux/getManageAccountsDataSlice";

function SSOEnabled() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const [admins, setSSOAdmins] = useState([]);
  const [adminCount, setSSOAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    enabledType1Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getEnabledSSOAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminEnabledType1({ setSSOAdmins, setSSOAdminCount }));
    if (enabledType1Loading === 1) {
      setOpen(false);
    }
    else if (enabledType1Loading === 2) {
      setOpen(false);
    }
  };

  let handleSSODisable = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch("/super-admin/disable?userType=v1", data).then(
      (response) => {
        handleCloseBackdrop();
        getEnabledSSOAdmins();
        let variant = "success"
        setSnackbarMessage("Admin Disabled Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        setSnackbarMessage("Unable to Disable Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getEnabledSSOAdmins()
  }, [enabledType1Loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          <SuperAdminTable
            admins={admins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            statusEnable={true}
            handleDisable={handleSSODisable}
            statusDisable={false}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
          />
        </div>
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
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
    </div>
  );
}

export default SSOEnabled;
