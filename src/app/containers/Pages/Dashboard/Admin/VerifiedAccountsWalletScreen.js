import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import {
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdminVerifiedType2 } from "../../../../redux/getVerifiedAccountsDataSlice";

function VerifiedAccountsWalletScreen(props) {
  const [network, setNetwork] = useState("");
  const [walletAdmins, setWalletAdmins] = useState([]);
  const [adminWalletCount, setWalletAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const {
    verifiedType2Data,
    verifiedType2Loading 
  } = useSelector((store) => store.getVerifiedAccountsData);
const dispatch = useDispatch();

const getVerifiedWalletAdmins = (
  start,
  end,
) => {
  setOpen(true);
  dispatch(getSuperAdminVerifiedType2({start,end}));
  if(verifiedType2Loading===1){
      setWalletAdmins(verifiedType2Data);
      setWalletAdminCount(verifiedType2Data.length);
      setOpen(false);
    }
  else if(verifiedType2Loading===2){
      setOpen(false);
    }
};

useEffect(()=>{
  getVerifiedWalletAdmins(0, rowsPerPage);
},[verifiedType2Loading])

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getVerifiedWalletAdmins(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage,
      setOpen,
      setWalletAdmins,
      setWalletAdminCount
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getVerifiedWalletAdmins(
      0,
      parseInt(event.target.value, 10),
      setOpen,
      setWalletAdmins,
      setWalletAdminCount
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
        />
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
      />
    </div>
  );
}

export default VerifiedAccountsWalletScreen;
