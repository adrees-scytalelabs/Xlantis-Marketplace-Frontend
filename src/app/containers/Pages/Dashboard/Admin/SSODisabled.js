import { TablePagination } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import Notification from "../../../../components/Utils/Notification";
import {
  getDisableSSOAdmins,
  handleEnableSSO,
  handleModalOpen,
  handleModalClose,
} from "../../../../components/Utils/SuperAdminFunctions";

function SSODisabled() {
  let [admins, setAdmins] = useState([]);
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  let [load, setLoad] = useState(false);
  let [variant, setVariant] = useState("");
  let [notificationData, setNotificationData] = useState("");
  useEffect(() => {
    getDisableSSOAdmins(setOpen, setAdmins, setAdminCount);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="">
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          <SuperAdminTable
            admins={admins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            statusDisable={true}
            handleEnableSSO={handleEnableSSO}
            manageAccounts={true}
            setShow={setShow}
            setModalData={setModalData}
            setVariant={setVariant}
            setLoad={setLoad}
            setNotificationData={setNotificationData}
            setAdmins={setAdmins}
            setAdminCount={setAdminCount}
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

export default SSODisabled;
