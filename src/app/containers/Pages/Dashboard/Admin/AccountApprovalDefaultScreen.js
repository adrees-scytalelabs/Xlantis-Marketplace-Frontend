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
import { getSuperAdminUnverifiedType1, getSuperAdminUnverifiedType2 } from "../../../../redux/getUnverifiedAccountsDataSLice";

function AccountApprovalDefaultScreen(props) {
  const [admins, setAdmins] = useState([]);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    unverifiedType1Data,
    unverifiedType1Loading,
    unverifiedType2Data,
    unverifiedType2Loading
  } = useSelector((store) => store.getUnverifiedAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };


  const getUnverifiedAdminsSSO = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminUnverifiedType1({ setAdmins, setAdminCount, start, end }))
    if (unverifiedType1Loading === 1) {
      setOpen(false);
    }
    else if (unverifiedType1Loading === 2) {
      setOpen(false);
    }
  };

  const handleVerify = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop();
        getUnverifiedAdminsSSO(0, rowsPerPage);
        let variant = "success"
        setSnackbarMessage("Admin Verified Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        setSnackbarMessage("Unable to Verify Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getUnverifiedAdminsSSO(0, rowsPerPage);
  }, [unverifiedType1Loading])

  const getUnverifiedAdminsWallet = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminUnverifiedType2({ setWalletAdmins, setAdminCount, start, end }))
    if (unverifiedType2Loading === 1) {
      // setWalletAdmins(unverifiedType2Data);
      // setAdminCount(unverifiedType2Data.length);
      setOpen(false);
    }
    else if (unverifiedType2Loading === 2) {
      setOpen(false);
    }
  };

  const handleVerifyWallet = (
    e,
    verifyAdminId
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v2`, data).then(
      (response) => {
        handleCloseBackdrop();
        getUnverifiedAdminsWallet(0, rowsPerPage);
        let variant = "success"
        setSnackbarMessage("Admin Verified Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        setSnackbarMessage("Unable to Verify Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    );
  };

  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage);
  }, [unverifiedType2Loading])

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
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  return (
    <div className="backgroundDefault">
      <div className="row no-gutters">
        <SuperAdminTable
          admins={admins}
          walletAdmins={walletAdmins}
          handleModalOpen={handleModalOpen}
          setShow={setShow}
          setModalData={setModalData}
          ssoEnabled={true}
          walletEnabled={true}
          approval={true}
          handleVerifyWallet={handleVerifyWallet}
          handleVerify={handleVerify}
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
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
    </div>
  );
}

export default AccountApprovalDefaultScreen;
