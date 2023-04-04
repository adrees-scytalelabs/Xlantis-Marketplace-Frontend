import { TablePagination } from "@material-ui/core/";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";

function SSOEnabled(props) {
  const { enqueueSnackbar } = useSnackbar();
  let [admins, setSSOAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [adminCount, setSSOAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const handleModalOpen = (e, data) => {
    e.preventDefault();
    handleShow();
    setModalData(data);
  };
  const handleModalClose = (e, data) => {
    e.preventDefault();
    handleClose();
  };

  useEffect(() => {
    getEnabledSSOAdmins();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  let getEnabledSSOAdmins = () => {
    setOpen(true);
    axios
      .get(`/super-admin/admins/enabled?userType=v1`)
      .then((response) => {
        setSSOAdmins(response.data.admins);
        setSSOAdminCount(response.data.admins.length);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            window.location.reload(false);
          }
        }
        setOpen(false);
      });
  };

  let handleDisable = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch("/super-admin/disable?userType=v1", data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Disabled Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getEnabledSSOAdmins(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
  };

  return (
    <div>
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          <SuperAdminTable
            admins={admins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            statusEnable={true}
            handleDisable={handleDisable}
            statusDisable={false}
            manageAccounts={true}
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
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
      ></AdminInformationModal>
    </div>
  );
}

export default SSOEnabled;