import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NotificationSnackbar from '../../../../components/Snackbar/NotificationSnackbar';
import {
  handleModalClose,
  handleModalOpen
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminEnabledType2 } from "../../../../redux/getManageAccountsDataSlice";

function WalletEnabled() {
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
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [walletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    enabledType2Loading
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getEnabledWalletAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminEnabledType2({ setWalletAdmins, setWalletAdminCount }))
    if (enabledType2Loading === 1) {
      setOpen(false);
    }
    else if (enabledType2Loading === 2) {
      setOpen(false);
    };
  };

  const handleWalletDisable = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch("/super-admin/disable?userType=v2", data).then(
      (response) => {
        handleCloseBackdrop();
        getEnabledWalletAdmins();
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
    getEnabledWalletAdmins();
  }, [enabledType2Loading]);

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
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            walletEnabled={true}
            statusEnable={true}
            handleWalletDisable={handleWalletDisable}
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
        count={walletCount}
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

export default WalletEnabled;
