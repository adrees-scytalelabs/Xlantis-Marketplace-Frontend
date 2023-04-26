import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import Notification from "../../../../components/Utils/Notification";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminUnverifiedType1 } from "../../../../redux/getUnverifiedAccountsDataSLice";

function AccountApprovalSSO(props) {
  const [admins, setAdmins] = useState([]);
  const [modalData, setModalData] = useState();
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    unverifiedType1Data,
    unverifiedType1Loading,
  } = useSelector((store) => store.getUnverifiedAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = (setOpen) => {
    setOpen(false);
  };
  const handleShowBackdrop = (setOpen) => {
    setOpen(true);
  };


  const getUnverifiedAdminsSSO = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminUnverifiedType1({ start, end }))
    if (unverifiedType1Loading === 1) {
      setAdmins(unverifiedType1Data);
      setAdminCount(unverifiedType1Data.length);
      setOpen(false);
    }
    else if (unverifiedType1Loading === 2) {


      setOpen(false);
    }
  };

  const handleVerify = (
    e,
    verifyAdminId,
    setOpen,
    setAdmins,
    setAdminCount,
    rowsPerPage,
    setVariant,
    setLoad,
    setNotificationData
  ) => {
    e.preventDefault();
    handleShowBackdrop(setOpen);
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getUnverifiedAdminsSSO(0, rowsPerPage, setOpen, setAdmins, setAdminCount);
        setVariant("success");
        setNotificationData("Admin Verified Successfully.");
        setLoad(true);
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);

        handleCloseBackdrop(setOpen);
        setVariant("error");
        setNotificationData("Unable to Verify Admin.");
        setLoad(true);
      }
    );
  };

  useEffect(() => {
    getUnverifiedAdminsSSO(0, rowsPerPage);
  }, [unverifiedType1Loading])

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "active",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);
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
          setAdmins={setAdmins}
          rowsPerPage={rowsPerPage}
          setVariant={setVariant}
          setLoad={setLoad}
          setNotificationData={setNotificationData}
          setAdminCount={setAdminCount}
          setOpen={setOpen}
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
export default AccountApprovalSSO;
