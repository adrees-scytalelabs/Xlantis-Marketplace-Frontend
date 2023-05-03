import { TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import {
  handleModalClose,
  handleModalOpen
} from "../../../../components/Utils/SuperAdminFunctions";
import { useSnackbar } from "notistack";
import SuperAdminTable from "../../../../components/tables/SuperAdminAccountsTable";
import { getSuperAdminDisabledType1 } from '../../../../redux/getManageAccountsDataSlice';

function SSODisabled() {
  const { enqueueSnackbar } = useSnackbar();
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);

  const {
    disabledType1Loading,
  } = useSelector((store) => store.getManageAccountsData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const getDisableSSOAdmins = () => {
    setOpen(true);
    dispatch(getSuperAdminDisabledType1({setAdmins,setAdminCount}))
    if (disabledType1Loading === 1) {
      setOpen(false);
    }
    else if (disabledType1Loading === 2) {
      setOpen(false);
    }
  };

  const handleEnableSSO = (
    e,
    verifyAdminId
  ) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      adminId: verifyAdminId,
    };
    axios.patch(`/super-admin/enable?userType=v1`, data).then(
      (response) => {
        handleCloseBackdrop();
        getDisableSSOAdmins();
        let variant = "success"
        enqueueSnackbar("Admin Enabled Successfully.", { variant });
      },
      (error) => {
        console.log("Error during enable: ", error);
        console.log("Error response: ", error.response);
        handleCloseBackdrop();
        let variant = "error"
        enqueueSnackbar("Unable to Disable Admin.", { variant });
      }
    );
  };

  useEffect(() => {
    getDisableSSOAdmins();
  }, [disabledType1Loading]);
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
          />
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
        setShow={setShow}
      />
    </div>
  );
}

export default SSODisabled;
