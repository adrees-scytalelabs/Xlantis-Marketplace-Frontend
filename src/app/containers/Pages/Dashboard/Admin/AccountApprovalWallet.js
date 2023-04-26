import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import Notification from "../../../../components/Utils/Notification";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminUnverifiedType2 } from "../../../../redux/getUnverifiedAccountsDataSLice";

function AccountApprovalWallet(props) {
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    unverifiedType2Data,
    unverifiedType2Loading
  } = useSelector((store) => store.getUnverifiedAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = (setOpen) => {
    setOpen(false);
  };
  const handleShowBackdrop = (setOpen) => {
    setOpen(true);
  };

  const getUnverifiedAdminsWallet = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminUnverifiedType2({start,end}))
    if(unverifiedType2Loading===1){
        setWalletAdmins(unverifiedType2Data);
        setAdminCount(unverifiedType2Data.length);
        setOpen(false);
      }
    else if(unverifiedType2Loading===2){
        setOpen(false);
      }
  };

  const handleVerifyWallet = (
    e,
    verifyAdminId,
    setOpen,
    setWalletAdmins,
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
  
    axios.patch(`/super-admin/admin/verify?userType=v2`, data).then(
      (response) => {
        handleCloseBackdrop(setOpen);
        getUnverifiedAdminsWallet(
          0,
          rowsPerPage,
          setOpen,
          setWalletAdmins,
          setAdminCount
        );
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

  useEffect(()=>{
    getUnverifiedAdminsWallet(0, rowsPerPage);
  },[unverifiedType2Loading])


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
          walletAdmins={walletAdmins}
          handleModalOpen={handleModalOpen}
          ssoEnabled={false}
          walletEnabled={true}
          approval={true}
          handleVerifyWallet={handleVerifyWallet}
          setWalletAdmins={setWalletAdmins}
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

export default AccountApprovalWallet;
