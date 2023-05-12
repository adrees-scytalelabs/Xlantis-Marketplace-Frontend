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
import { getSuperAdminDisabledType1, getSuperAdminDisabledType2 } from "../../../../redux/getManageAccountsDataSlice";

function Disabled() {
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
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [walletAdminCount, setWalletAdminCount] = useState(0);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    disabledType1Loading,
    disabledType2Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getDisableSSOAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType1({ setAdmins, setAdminCount }))
    if (disabledType1Loading === 1) {
      setOpen(false);
    }
    else if (disabledType1Loading === 2) {
      setOpen(false);
    }
  };

  const handleEnableSSO = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop();
        getDisableSSOAdmins();
        let variant = "success"
        setSnackbarMessage("Admin Enabled Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error during enable: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        setSnackbarMessage("Unable to Enabled Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getDisableSSOAdmins();
  }, [disabledType1Loading]);

  const getDisableWalletAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType2({ setWalletAdmins, setWalletAdminCount }));
    if (disabledType2Loading === 1) {
      setOpen(false);
    }
    else if (disabledType2Loading === 2) {
      setOpen(false);
    }
  };

  const handleEnableWallet = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v2`, data).then(
      (response) => {
        handleCloseBackdrop();
        getDisableWalletAdmins();
        let variant = "success"
        setSnackbarMessage("Admin Enabled Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        setSnackbarMessage("Unable to Enabled Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getDisableWalletAdmins();
  }, [disabledType2Loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="">
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          <SuperAdminTable
            admins={admins}
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            walletEnabled={true}
            statusDisable={true}
            handleEnableSSO={handleEnableSSO}
            handleEnableWallet={handleEnableWallet}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
          ></SuperAdminTable>
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
      ></AdminInformationModal>
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
    </div>
  );
}

export default Disabled;
