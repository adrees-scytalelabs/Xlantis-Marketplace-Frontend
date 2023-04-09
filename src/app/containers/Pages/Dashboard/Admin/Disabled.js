import { TablePagination } from "@material-ui/core/";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";

function Disabled(props) {
  const { enqueueSnackbar } = useSnackbar();
  let [admins, setAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [adminCount, setAdminCount] = useState(0);
  let [walletAdminCount, setWalletAdminCount] = useState(0);
  let [walletAdmins, setWalletAdmins] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
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
    getDisableSSOAdmins();
    getDisableWalletAdmins();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  let getDisableSSOAdmins = () => {
    setOpen(true);
    axios
      .get(`/super-admin/admins/disabled?userType=v1`)
      .then((response) => {
        setAdmins(response.data.admins);
        setAdminCount(response.data.admins.length);
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
            Cookies.remove("Version");

            window.location.reload(false);
          }
        }
        setOpen(false);
      });
  };

  let getDisableWalletAdmins = () => {
    setOpen(true);
    axios
      .get(`/super-admin/admins/disabled?userType=v2`)
      .then((response) => {
        setWalletAdmins(response.data.admins);
        setWalletAdminCount(response.data.admins.length);
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

  let handleEnableSSO = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v1`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Enabled Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getDisableSSOAdmins(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Enable Admin.", { variant });
      }
    );
  };
  let handleEnableWallet = (e, verifyAdminId) => {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v2`, data).then(
      (response) => {
        let variant = "success";
        enqueueSnackbar("Admin Enabled Successfully.", { variant });
        handleCloseBackdrop();
        setIsSaving(false);
        getDisableWalletAdmins(0, rowsPerPage);
      },
      (error) => {
        console.log("Error on status pending nft: ", error);
        console.log("Error on status pending nft: ", error.response);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Enable Admin.", { variant });
      }
    );
  };

  return (
    <div className="">
      <div style={{ minHeight: "55vh" }}>
        <div className="row no-gutters">
          <SuperAdminTable
            admins={admins}
            walletAdmins={walletAdmins}
            handleModalOpen={handleModalOpen}
            ssoEnabled={true}
            walletEnabled={true}
            statusDisable={true}
            handleEnableSSO={handleEnableSSO}
            handleEnableWallet={handleEnableWallet}
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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

export default Disabled;
