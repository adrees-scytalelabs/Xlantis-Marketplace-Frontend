import { TablePagination } from "@material-ui/core/";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import Notification from "../../../../components/Utils/Notification";
import {
  getEnabledSSOAdmins,
  getEnabledWalletAdmins,
  handleSSODisable,
  handleWalletDisable,
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";

function Enabled() {
  const [network, setNetwork] = useState("");
  let [admins, setSSOAdmins] = useState([]);
  let [adminCount, setSSOAdminCount] = useState(0);
  let [walletAdmins, setWalletAdmins] = useState([]);
  let [walletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  let [load, setLoad] = useState(false);
  let [variant, setVariant] = useState("");
  let [notificationData, setNotificationData] = useState("");
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getEnabledSSOAdmins(setOpen, setSSOAdmins, setSSOAdminCount);
    getEnabledWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
  }, []);

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
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setAdmins={setSSOAdmins}
            setWalletAdmins={setWalletAdmins}
            setAdminCount={setSSOAdminCount}
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
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <CircularBackdrop open={open} />
      <Notification
        variant={variant}
        notificationData={notificationData}
        setLoad={setLoad}
        load={load}
      ></Notification>
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
        setShow={setShow}
      ></AdminInformationModal>
    </div>
  );
}

export default Enabled;
