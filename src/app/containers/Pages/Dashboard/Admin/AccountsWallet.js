import { TablePagination } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import {
  handleModalClose,
  handleModalOpen
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminAccountType2 } from "../../../../redux/getSuperAdminAccountsSlice";

function AccountsWallet(props) {
  const [modalData, setModalData] = useState();
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [adminWalletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    accountType2Data,
    accountType2Loading
  } = useSelector((store) => store.getSuperAdminAccounts);
  const dispatch = useDispatch();

  const getWalletAdmins = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminAccountType2({ start, end }))
    if (accountType2Loading === 1) {
      setWalletAdmins(accountType2Data);
      setWalletAdminCount(accountType2Data.length);
      setOpen(false);
    }
    else if (accountType2Loading === 2) {
      setOpen(false);
    }
  };
  useEffect(() => {
    getWalletAdmins(0, rowsPerPage);
  }, [accountType2Loading]);
  useEffect(() => {
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
    getWalletAdmins(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage,
      setOpen,
      walletAdmins,
      adminWalletCount
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getWalletAdmins(
      0,
      parseInt(event.target.value, 10),
      setOpen,
      walletAdmins,
      adminWalletCount
    );
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
          setShow={setShow}
          setModalData={setModalData}
        ></SuperAdminTable>
      </div>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={adminWalletCount}
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
      ></AdminInformationModal>
    </div>
  );
}

export default AccountsWallet;
