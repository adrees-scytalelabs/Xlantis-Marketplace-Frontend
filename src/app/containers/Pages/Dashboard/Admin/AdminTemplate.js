import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteAdminTemplate,
  getStandardTemplate,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import DeleteModal from "../../../../components/Modals/DeleteModal";
import TemplateDetails from "../../../../components/Modals/TemplateDetails";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import PropertiesTable from "../../../../components/tables/PropertiesTable";

function AdminTemplate(props) {
  const [templateData, setTemplateData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateModal, setUpdateModal] = useState(true);
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
  const handleUpdatedData = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(false);
    setModalState(true);
  };
  const handleClose = () => {
    setModalState(false);
    setDeleteState(false);
    setUpdateModal(false);
    getTemplates();
  };
  const handleDeleteModal = (e, data) => {
    e.preventDefault();
    setDeleteData(data);
    setDeleteState(true);
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const deleteResponse = async (data) => {
    try {
      // console.log("Data for delete is: ", data);
      deleteAdminTemplate(data._id)
        .then((response) => {
          console.log("Response from deleting template: ", response);
          let variant = "success";
          setSnackbarMessage("Template deleted successfully");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          handleClose();
        })
        .catch((error) => {
          console.log("Error from deleting template: ", error.response);
          handleClose();
        });
    } catch (e) {
      console.log("Error during deletion", e);
      let variant = "error";
      setSnackbarMessage("Error in deleting Template");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      handleClose();
    }
  };
  const handleDeleteTemplate = async (e) => {
    e.preventDefault();
    await deleteResponse(deleteData);
  };
  const getTemplates = async () => {
    await getStandardTemplate("admin")
      .then((response) => {
        // console.log("response from getting standard Templates: ", response);
        setTemplateData(response.data.templates);
      })
      .catch((error) => {
        console.log("Error from getting standard Templates: ", error);
      });
  };
  const handleOpen = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(true);
    setModalState(true);
  };
  useEffect(() => {
    getTemplates();
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollection: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      templates: "active",
    });
  }, []);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Templates</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Template</li>
            </ul>
          </div>
        </div>
      </div>
      {templateData.length ? (
        <div className="row no-gutters">
          <PropertiesTable
            templateData={templateData}
            handleOpen={handleOpen}
            handleDeleteModal={handleDeleteModal}
            handleUpdatedData={handleOpen}
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

export default AdminTemplate;
