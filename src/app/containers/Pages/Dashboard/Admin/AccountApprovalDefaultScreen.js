import { TablePagination } from '@mui/material';
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import Notification from "../../../../components/Utils/Notification";
import {
  getUnverifiedAdminsSSO,
  getUnverifiedAdminsWallet,
  handleModalClose,
  handleModalOpen,
  handleVerify,
  handleVerifyWallet,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
function AccountApprovalDefaultScreen(props) {
  const [admins, setAdmins] = useState([]);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState("");
  const [notificationData, setNotificationData] = useState("");
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUnverifiedAdminsWallet(
      0,
      rowsPerPage,
      setOpen,
      setWalletAdmins,
      setAdminCount
    );
    getUnverifiedAdminsSSO(0, rowsPerPage, setOpen, setAdmins, setAdminCount);
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
  const handleChangePage = (newPage) => {
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
          walletAdmins={walletAdmins}
          handleModalOpen={handleModalOpen}
          setShow={setShow}
          setModalData={setModalData}
          ssoEnabled={true}
          walletEnabled={true}
          approval={true}
          handleVerifyWallet={handleVerifyWallet}
          handleVerify={handleVerify}
          setOpen={setOpen}
          setAdmins={setAdmins}
          setWalletAdmins={setWalletAdmins}
          rowsPerPage={rowsPerPage}
          setVariant={setVariant}
          setLoad={setLoad}
          setNotificationData={setNotificationData}
          setAdminCount={setAdminCount}
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

export default AccountApprovalDefaultScreen;
