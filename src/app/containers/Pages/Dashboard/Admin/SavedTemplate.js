import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import DeleteModal from "../../../../components/Modals/DeleteModal";
import TemplateDetails from "../../../../components/Modals/TemplateDetails";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import SuperAdminPropertiesTable from "../../../../components/tables/SuperAdminPropertiesTable";
import { getSavedTemplatesData } from "../../../../redux/getSavedTemplateDataSlice";
import MessageCard from "../../../../components/MessageCards/MessageCard";

function SavedTemplate(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [templateData, setTemplateData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateModal, setUpdateModal] = useState(true);
  const { templatesData, loading } = useSelector(
    (store) => store.getSavedTemplateData
  );
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const handleOpen = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(true);
    setModalState(true);
  };
  const handleClose = () => {
    setModalState(false);
    setDeleteState(false);
    setUpdateModal(false);
    handleSavedTemplate();
  };
  const handleDeleteModal = (e, data) => {
    e.preventDefault();
    setDeleteData(data);
    setDeleteState(true);
  };
  const deleteResponse = async (data) => {
    try {
      handleClose();
    } catch (e) {
      console.log("Error during deletion", e);
    }
  };
  const handleDeleteTemplate = async (e) => {
    e.preventDefault();
    await deleteResponse(deleteData);
  };
  let handleSavedTemplate = async () => {
    handleShowBackdrop();
    try {
      dispatch(getSavedTemplatesData());
      if (loading === 1) {
        setTemplateData(templatesData);
        handleCloseBackdrop();
      } else if (loading === 2) {
        handleCloseBackdrop();
        let variant = "error";
        setSnackbarMessage("Unable to Create Template.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    } catch (e) {
      console.log("Error in axios request to create template", e);
    }
  };
  const handleUpdatedData = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(false);
    setModalState(true);
  };
  useEffect(() => {
    handleSavedTemplate();
  }, [loading]);
  useEffect(() => {
    setDeleteState("");

    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "active",
      template: "",
      saved: "active",
    });
  }, [modalData]);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Saved Template</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/superAdminDashboard/properties`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Properties
                </li>
              </Link>
              <li className="breadcrumb-item active">Saved Template</li>
            </ul>
          </div>
        </div>
      </div>
      {templateData.length ? (
        <div className="row no-gutters">
          <SuperAdminPropertiesTable
            templateData={templateData}
            handleOpen={handleOpen}
            handleDeleteModal={handleDeleteModal}
            handleUpdatedData={handleUpdatedData}
          />
        </div>
      ) : (
        <MessageCard msg="No templates created" />
      )}
      <CircularBackdrop open={open} />
      {modalState === true && (
        <TemplateDetails
          show={modalState}
          handleClose={handleClose}
          templateData={modalData}
          setTemplateData={setModalData}
          updateEnabled={updateModal}
          handleUpdateData={handleUpdatedData}
        />
      )}
      <DeleteModal
        show={deleteState}
        handleClose={handleClose}
        handleDelete={handleDeleteTemplate}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default SavedTemplate;
