import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import {
  getUnverifiedAdminsWallet,
  handleModalOpen,
  handleModalClose,
  handleVerifyWallet,
} from "../../../../components/Utils/SuperAdminFunctions";
import Notification from "../../../../components/Utils/Notification";

function AccountApprovalWallet(props) {
  let [walletAdmins, setWalletAdmins] = useState([]);
  let [load, setLoad] = useState(false);
  let [variant, setVariant] = useState("");
  let [notificationData, setNotificationData] = useState("");
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage, setOpen, setWalletAdmins, setAdminCount);
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

export default AccountApprovalWallet;
