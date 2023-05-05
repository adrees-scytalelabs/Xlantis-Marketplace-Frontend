
import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import { useSnackbar } from "notistack";
import {
  handleModalClose,
  handleModalOpen
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminDisabledType2 } from "../../../../redux/getManageAccountsDataSlice";

function WalletDisabled() {
  const { enqueueSnackbar } = useSnackbar();
  const [walletAdminCount, setWalletAdminCount] = useState(0);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);

  const {
    disabledType2Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getDisableWalletAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType2({setWalletAdmins,setWalletAdminCount}));
    if (disabledType2Loading === 1) {
      setOpen(false);
    }
    else if (disabledType2Loading === 2) {
      setOpen(false);
    }
  };

  const handleEnableWallet = (
    e,
    verifyAdminId
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
        enqueueSnackbar("Admin Enabled Successfully.", { variant });
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        enqueueSnackbar("Unable to Disable Admin.", { variant });
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
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            walletEnabled={true}
            statusDisable={true}
            handleEnableWallet={handleEnableWallet}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
          />
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={walletAdminCount}
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

export default WalletDisabled;
