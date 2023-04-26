
import { TablePagination } from '@mui/material';
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import Notification from "../../../../components/Utils/Notification";
import {
  getDisableWalletAdmins,
  handleEnableWallet,
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";

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
  useEffect(() => {
    getDisableWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
  }, []);
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
