import { TablePagination } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";

function AccountApprovalDefaultScreen(props) {
  const { enqueueSnackbar } = useSnackbar();
  let [admins, setAdmins] = useState([]);
  let [walletAdmins, setWalletAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const handleModalOpen = (e, data) => {
    e.preventDefault();
    handleShow();
    setModalData(data);
  };
  const handleModalClose = (e, data) => {
    e.preventDefault();
    handleClose();
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  useEffect(() => {
    getUnverifiedAdminsWallet(0, rowsPerPage);
    getUnverifiedAdminsSSO(0, rowsPerPage);
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

  let getUnverifiedAdminsSSO = (start, end) => {
    setOpen(true);
    axios
      .get(`/super-admin/admins/unverified/${start}/${end}?userType=v1`)
      .then((response) => {
        setAdmins(response.data.unverifiedAdmins);
        setAdminCount(response.data.unverifiedAdmins.length);
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

  let getUnverifiedAdminsWallet = (start, end) => {
    setOpen(true);
    axios
      .get(`/super-admin/admins/unverified/${start}/${end}?userType=v2`)
      .then((response) => {
        setWalletAdmins(response.data.unverifiedAdmins);
        setAdminCount(response.data.unverifiedAdmins.length);
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

  let handleVerify = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v1`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Verified Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getUnverifiedAdminsSSO(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
  };

  let handleVerifyWallet = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };

    axios.patch(`/super-admin/admin/verify?userType=v2`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Verified Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getUnverifiedAdminsWallet(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on verify: ", error);
        console.log("Error on verify: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
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
          approval={true}
          handleVerifyWallet={handleVerifyWallet}
          handleVerify={handleVerify}
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
     
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={show}
        handleClose={handleModalClose}
        adminData={modalData}
      ></AdminInformationModal>
    </div>
  );
}

export default AccountApprovalDefaultScreen;
