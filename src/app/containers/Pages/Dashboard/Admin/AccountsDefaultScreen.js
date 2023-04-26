import { TablePagination } from '@mui/material';
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../../components/Utils/SuperAdminFunctions";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminAccountType1,getSuperAdminAccountType2 } from "../../../../redux/getSuperAdminAccountsSlice";
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
  const {
    accountType1Data,
  accountType1Loading,
  accountType2Data,
  accountType2Loading
  } = useSelector((store) => store.getSuperAdminAccounts);
const dispatch = useDispatch();

const getSSOAdmins = (start, end) => {
  setOpen(true);
  dispatch(getSuperAdminAccountType1({start,end}));
  if(accountType1Loading===1){
      setAdmins(accountType1Data);
      setAdminCount(accountType1Data.length);
      setOpen(false);
    }
    else if(accountType1Loading===2){
      setOpen(false);
    }
};

useEffect(() => {
  getSSOAdmins(0, rowsPerPage);
}, [accountType1Loading]);

const getWalletAdmins = (
  start,
  end,
) => {
  setOpen(true);
  dispatch(getSuperAdminAccountType2({start,end}))
  if(accountType2Loading===1) {
      setWalletAdmins(accountType2Data);
      setWalletAdminCount(accountType2Data.length);
      setOpen(false);
    }
    else if(accountType2Loading===2){
      setOpen(false);
    }
};
useEffect(() => {
  getWalletAdmins(0, rowsPerPage);
}, [accountType2Loading]);

  useEffect(() => {
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
    );
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getSSOAdmins(
      0,
      parseInt(event.target.value, 10),
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
        count={adminCount + adminWalletCount}
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
