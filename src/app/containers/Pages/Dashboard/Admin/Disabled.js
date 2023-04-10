import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import Notification from "../../../../components/Utils/Notification";
import {
  getDisableSSOAdmins,
  getDisableWalletAdmins,
  handleEnableSSO,
  handleEnableWallet,
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";

function Disabled() {
  let [admins, setAdmins] = useState([]);
  let [adminCount, setAdminCount] = useState(0);
  let [walletAdminCount, setWalletAdminCount] = useState(0);
  let [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  let [load, setLoad] = useState(false);
  let [variant, setVariant] = useState("");
  let [notificationData, setNotificationData] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getDisableSSOAdmins(setOpen, setAdmins, setAdminCount);
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
            admins={admins}
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            walletEnabled={true}
            statusDisable={true}
            handleEnableSSO={handleEnableSSO}
            handleEnableWallet={handleEnableWallet}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setAdmins={setAdmins}
            setWalletAdmins={setWalletAdmins}
            setAdminCount={setAdminCount}
            setWalletAdminCount={setWalletAdminCount}
            setOpen={setOpen}
          ></SuperAdminTable>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={adminCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Notification
        variant={variant}
        notificationData={notificationData}
        setLoad={setLoad}
        load={load}
      ></Notification>
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
        setShow={setShow}
      ></AdminInformationModal>
    </div>
  );
}

export default Disabled;
