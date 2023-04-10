import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import {
  getSSOAdmins,
  getWalletAdmins,
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
u
function AccountsDefaultScreen(props) {
  const [admins, setAdmins] = useState([]);
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [adminWalletCount, setWalletAdminCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getWalletAdmins(
      0,
      rowsPerPage,
      setOpen,
      setWalletAdmins,
      setWalletAdminCount
    );
    getSSOAdmins(0, rowsPerPage, setOpen, setAdmins, setAdminCount);
    setShow(false);
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "active",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);
  const handleChangePage = (newPage) => {
    setPage(newPage);
    getSSOAdmins(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage,
      setOpen,
      setAdmins,
      setAdminCount
    );
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getSSOAdmins(
      0,
      parseInt(event.target.value, 10),
      setOpen,
      setAdmins,
      setAdminCount
    );
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="row no-gutters">
        <SuperAdminTable
          admins={admins}
          walletAdmins={walletAdmins}
          handleModalOpen={handleModalOpen}
          ssoEnabled={true}
          walletEnabled={true}
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
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
        setShow={setShow}
      />
    </div >
  );
}

export default AccountsDefaultScreen;
