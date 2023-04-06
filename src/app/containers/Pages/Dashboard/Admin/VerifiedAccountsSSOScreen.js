import React, { useEffect, useState } from "react";
import { TablePagination } from "@material-ui/core/";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import {
  getVerifiedSSOAdmins,
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";

function VerifiedAccountsSSOScreen(props) {
  const [network, setNetwork] = useState("");
  let [admins, setAdmins] = useState([]);
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getVerifiedSSOAdmins(0, rowsPerPage, setOpen, setAdmins, setAdminCount);
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
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
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

export default VerifiedAccountsSSOScreen;