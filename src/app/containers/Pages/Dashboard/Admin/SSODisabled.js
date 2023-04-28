import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import Notification from "../../../../components/Utils/Notification";
import {
  handleModalClose,
  handleModalOpen
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminDisabledType1 } from '../../../../redux/getManageAccountsDataSlice';

function SSODisabled() {
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");

  const {
    disabledType1Data,
    disabledType1Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = (setOpen) => {
    setOpen(false);
  };
  const handleShowBackdrop = (setOpen) => {
    setOpen(true);
  };

  const getDisableSSOAdmins = (setOpen, setAdmins, setAdminCount) => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType1())
    console.log("dispatchRes", disabledType1Data);
    if (disabledType1Loading === 1) {
      setAdmins(disabledType1Data);
      setAdminCount(disabledType1Data.length);
      setOpen(false);
    }
    else if (disabledType1Loading === 2) {
      setOpen(false);
    }
  };

  const handleEnableSSO = (
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
    axios.patch(`/super-admin/enable?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getDisableSSOAdmins(setOpen, setAdmins, setAdminCount);
        setVariant("success");
        setNotificationData("Admin Enabled Successfully.");
        setLoad(true);
      },
      (error) => {
        console.log("Error during enable: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop(setOpen);
        setVariant("error");
        setNotificationData("Unable to Enabled Admin.");
        setLoad(true);
      }
    );
  };

  useEffect(() => {
    getDisableSSOAdmins(setOpen, setAdmins, setAdminCount);
  }, [disabledType1Loading]);
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
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            statusDisable={true}
            handleEnableSSO={handleEnableSSO}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setAdmins={setAdmins}
            setAdminCount={setAdminCount}
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

export default SSODisabled;
