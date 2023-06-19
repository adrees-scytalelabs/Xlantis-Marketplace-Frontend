import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteTemplate,
  getTemplate,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import DeleteModal from "../../../../components/Modals/DeleteModal";
import NewTamplateModal from "../../../../components/Modals/NewTamplateModal";
import TemplateDetails from "../../../../components/Modals/TemplateDetails";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import PropertiesTable from "../../../../components/tables/PropertiesTable";
import { defaultProfile } from "../../../../components/ImageURLs/URLs";
import CreateCategoryModal from "../../../../components/Modals/CreateCategoryModal";

function SuperAdminCategories(props) {
  const [image, setImage] = useState(defaultProfile);
  const [categoryData, setCategoryData] = useState([]);
  const [newCategoryModalShow, setNewCategoryModalShow] = useState(false);
  const [name, setName] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateModal, setUpdateModal] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [useEffectLoader, setUseEffectLoader] = useState(false);
  let handleNewCategoryModalClose = () => {
    setNewCategoryModalShow(false);
  }
  let handleNewCategoryModalOpen = () => {
    setNewCategoryModalShow(true);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleClose = () => {
    setModalState(false);
    setDeleteState(false);
    setUpdateModal(false);
    //getTemplates();
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
  const handleUpdatedData = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(false);
    setModalState(true);
  };
  const handleOpen = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(true);
    setModalState(true);
  };
  useEffect(() => {
    props.setActiveTab({
        dashboard: "",
        manageAccounts: "",
        accountApproval: "",
        accounts: "",
        sso: "",
        wallet: "",
        properties: "",
        template: "",
        saved: "",
        categories:"active"
    });
  }, [useEffectLoader]);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Categories</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Categories</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Button className="bttn mb-4 mt-3" onClick={() => handleNewCategoryModalOpen()}>Create Category</Button>
      </div>
      {categoryData.length ? (
        <div className="row no-gutters">
          {/* <PropertiesTable
            templateData={templateData}
            handleOpen={handleOpen}
            handleDeleteModal={handleDeleteModal}
            handleUpdatedData={handleUpdatedData}
          /> */}
        </div>
      ) : (
        <MessageCard msg="No Category created" />
      )}
      <CircularBackdrop open={open} />
      {modalState === true && (
        // <TemplateDetails
        //   show={modalState}
        //   handleClose={handleClose}
        //   templateData={modalData}
        //   setTemplateData={setModalData}
        //   updateEnabled={updateModal}
        //   handleUpdateData={handleUpdatedData}
        // />
        null
      )}
       <CreateCategoryModal
        show={newCategoryModalShow}
        handleClose={handleNewCategoryModalClose}
        setName={setName}
        setImage={setImage}
      />
      {/* <NewTamplateModal
        handleClose={handleNewCategoryModalClose}
        show={newTemplateModalShow}
        useEffectLoader={useEffectLoader}
        setUseEffectLoader={setUseEffectLoader}
      />  */}
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default SuperAdminCategories;