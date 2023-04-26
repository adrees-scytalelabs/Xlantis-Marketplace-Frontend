import { TablePagination } from "@material-ui/core/";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import Notification from "../../../../components/Utils/Notification";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminEnabledType1,getSuperAdminEnabledType2 } from "../../../../redux/getManageAccountsDataSlice";


function Enabled() {
  const [admins, setSSOAdmins] = useState([]);
  const [adminCount, setSSOAdminCount] = useState(0);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [walletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    enabledType1Data,
    enabledType1Loading,
    enabledType2Data,
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
  dispatch(getSuperAdminEnabledType1());
  if(enabledType1Loading===1){
    setSSOAdmins(enabledType1Data);
    setSSOAdminCount(enabledType1Data.length);
      setOpen(false);
    }
  else if(enabledType1Loading===2){
      setOpen(false);
    }
};

 let handleSSODisable = (
  e,
  verifyAdminId,
  setOpen,
  setAdmins,
  setAdminCount,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  axios.patch("/super-admin/disable?userType=v1", data).then(
    (response) => {
      handleCloseBackdrop(setOpen);
      getEnabledSSOAdmins(setOpen, setAdmins, setAdminCount);
      setVariant("success");
      setNotificationData("Admin Disabled Successfully.");
      setLoad(true);
    },
    (error) => {
      console.log("Error on disable: ", error);
      console.log("Error on disable: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Disable Admin.");
      setLoad(true);
    }
  );
};

const getEnabledWalletAdmins = () => {
  setOpen(true);
  dispatch(getSuperAdminEnabledType2())
  if(enabledType2Loading===1){
      setWalletAdmins(enabledType2Data);
      setWalletAdminCount(enabledType2Data.length);
      setOpen(false);
    }
    else if(enabledType2Loading===2){
      setOpen(false);
    };
};

const handleWalletDisable = (
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

  axios.patch("/super-admin/disable?userType=v2", data).then(
    (response) => {
      handleCloseBackdrop(setOpen);
      getEnabledWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
      setVariant("success");
      setNotificationData("Admin Disabled Successfully.");
      setLoad(true);
    },
    (error) => {
      console.log("Error on disable: ", error);
      console.log("Error on disable: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Enable Admin.");
      setLoad(true);
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
            // handleModalOpen={() => {
            //   console.log("Function called");
            // }}
            ssoEnabled={true}
            walletEnabled={true}
            statusEnable={true}
            handleDisable={handleSSODisable}
            handleWalletDisable={handleWalletDisable}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setAdmins={setSSOAdmins}
            setWalletAdmins={setWalletAdmins}
            setAdminCount={setSSOAdminCount}
            setWalletAdminCount={setWalletAdminCount}
            setOpen={setOpen}
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
      <Notification
        variant={variant}
        notificationData={notificationData}
        setLoad={setLoad}
        load={load}
      />
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
