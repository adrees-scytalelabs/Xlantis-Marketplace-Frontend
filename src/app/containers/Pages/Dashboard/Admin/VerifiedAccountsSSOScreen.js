import React, { useEffect, useState } from "react";
import { TablePagination } from "@material-ui/core/";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminVerifiedType1 } from "../../../../redux/getVerifiedAccountsDataSlice";

function VerifiedAccountsSSOScreen(props) {
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {verifiedType1Data,verifiedType1Loading } = useSelector((store) => store.getVerifiedAccountsData);
  const dispatch = useDispatch();

  let getVerifiedSSOAdmins = (
    start,
    end,
  ) => {
    setOpen(true);
    dispatch(getSuperAdminVerifiedType1({start,end}));
    console.log("diapatchResp",verifiedType1Data);
    if(verifiedType1Loading===1){
        setAdmins(verifiedType1Data);
        setAdminCount(verifiedType1Data.length);
        setOpen(false);
      }
      if(verifiedType1Loading===2){
        setOpen(false);
      }
  };

  useEffect(()=>{
    getVerifiedSSOAdmins(0, rowsPerPage);
  },[verifiedType1Loading])

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      verifiedAccounts: "active",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);
  const handleChangePage = (newPage) => {
    setPage(newPage);
    getVerifiedSSOAdmins(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage,
      setOpen,
      setAdmins,
      setAdminCount
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(
      parseInt(event.target.value, 10),
      setOpen,
      setAdmins,
      setAdminCount
    );
    getVerifiedSSOAdmins(
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

export default VerifiedAccountsSSOScreen;