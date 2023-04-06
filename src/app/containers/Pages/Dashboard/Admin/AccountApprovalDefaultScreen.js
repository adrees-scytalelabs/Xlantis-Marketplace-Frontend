import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import {
  getUnverifiedAdminsSSO,
  getUnverifiedAdminsWallet,
  handleModalOpen,
  handleModalClose,
  handleVerify,
  handleVerifyWallet,
} from "../../../../components/Utils/SuperAdminFunctions";
import Notification from "../../../../components/Utils/Notification";

function AccountApprovalDefaultScreen(props) {
  let [admins, setAdmins] = useState([]);
  let [walletAdmins, setWalletAdmins] = useState([]);
  let [load, setLoad] = useState(false);
  let [variant, setVariant] = useState("");
  let [notificationData, setNotificationData] = useState("");
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage, setOpen, setWalletAdmins, setAdminCount);
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
        ></SuperAdminTable>
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

export default AccountApprovalDefaultScreen;
