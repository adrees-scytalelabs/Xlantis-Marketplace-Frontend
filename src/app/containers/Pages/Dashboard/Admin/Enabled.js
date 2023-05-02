import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import { useSnackbar } from "notistack";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminEnabledType1, getSuperAdminEnabledType2 } from "../../../../redux/getManageAccountsDataSlice";


function Enabled() {
  const { enqueueSnackbar } = useSnackbar();
  const [admins, setSSOAdmins] = useState([]);
  const [adminCount, setSSOAdminCount] = useState(0);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [walletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    enabledType1Loading,
    enabledType2Loading
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = (setOpen) => {
    setOpen(false);
  };

  const handleShowBackdrop = (setOpen) => {
    setOpen(true);
  };

  const getEnabledSSOAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminEnabledType1({setSSOAdmins,setSSOAdminCount}));
    if (enabledType1Loading === 1) {   
      setOpen(false);   
    }
    else if (enabledType1Loading === 2) {
      setOpen(false); 
    }
  };
  const getEnabledWalletAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminEnabledType2({setWalletAdmins,setWalletAdminCount}))
    if (enabledType2Loading === 1) {
     
      setOpen(false);    
    }
    else if (enabledType2Loading === 2) {
      setOpen(false);
    };
  };
  const handleSSODisable = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop(setOpen);
    let data = {
      adminId: verifyAdminId,
    };
  
    axios.patch("/super-admin/disable?userType=v1", data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getEnabledSSOAdmins();
        let variant = "success"
        enqueueSnackbar("Admin Disabled Successfully.", { variant });
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
        handleCloseBackdrop(setOpen);
        let variant = "error"
        enqueueSnackbar("Unable to Disable Admin.", { variant });
      }
    );
  };
  const handleWalletDisable = (
    e,
    verifyAdminId,
  ) => {
    e.preventDefault();
    handleShowBackdrop(setOpen);
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch("/super-admin/disable?userType=v2", data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getEnabledWalletAdmins();
        let variant = "success"
        enqueueSnackbar("Admin Disable Successfully.", { variant });
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
        handleCloseBackdrop(setOpen);
        let variant = "error"
        enqueueSnackbar("Unable to Disable Admin.", { variant });
      }
    );
  };

  useEffect(() => {
    getEnabledWalletAdmins();
  }, [enabledType2Loading]);

  useEffect(() => {
    getEnabledSSOAdmins()
  }, [enabledType1Loading]);

  const handleChangePage = (newPage) => {
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
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            walletEnabled={true}
            statusEnable={true}
            handleDisable={handleSSODisable}
            handleWalletDisable={handleWalletDisable}
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
    </div>
  );
}

export default Enabled;
