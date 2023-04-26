import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminAccountType1 } from "../../../../redux/getSuperAdminAccountsSlice";

function AccountsSSO(props) {
  const [modalData, setModalData] = useState();
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    accountType1Data,
  accountType1Loading,
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
          handleModalOpen={handleModalOpen}
          ssoEnabled={true}
          walletEnabled={false}
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
    </div>
  );
}

export default AccountsSSO;
