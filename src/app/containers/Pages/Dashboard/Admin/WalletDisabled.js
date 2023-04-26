import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import Notification from "../../../../components/Utils/Notification";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminDisabledType2 } from "../../../../redux/getManageAccountsDataSlice";

function WalletDisabled() {
  const [walletAdminCount, setWalletAdminCount] = useState(0);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");
  const [open, setOpen] = useState(false);

  const {
    disabledType2Data,
    disabledType2Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = (setOpen) => {
    setOpen(false);
  };
  const handleShowBackdrop = (setOpen) => {
    setOpen(true);
  };

  const getDisableWalletAdmins = (
    setOpen,
    setWalletAdmins,
    setWalletAdminCount
  ) => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType2());
    console.log("dispatchWaller",disabledType2Data);
    if(disabledType2Loading===1){
        setWalletAdmins(disabledType2Data);
        setWalletAdminCount(disabledType2Data.length);
        setOpen(false);
      }
    else if(disabledType2Loading===2){
        setOpen(false);
      }
  };

  const handleEnableWallet = (
    e,
    verifyAdminId,
    setOpen,
    setWalletAdmins,
    setWalletAdminCount,
    setVariant,
    setLoad,
    setNotificationData
  ) => {
    e.preventDefault();
    handleShowBackdrop(setOpen);
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v2`, data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getDisableWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
        setVariant("success");
        setNotificationData("Admin Enabled Successfully.");
        setLoad(true);
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop(setOpen);
        setVariant("error");
        setNotificationData("Unable to Enabled Admin.");
        setLoad(true);
      }
    );
  };

  useEffect(() => {
    getDisableWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
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
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setWalletAdmins={setWalletAdmins}
            setWalletAdminCount={setWalletAdminCount}
            setOpen={setOpen}
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
       <Notification
        variant={variant}
        notificationData={notificationData}
        setLoad={setLoad}
        load={load}
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
