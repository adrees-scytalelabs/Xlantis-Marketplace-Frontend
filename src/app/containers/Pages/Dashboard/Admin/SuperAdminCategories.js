import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteTemplate,
  getTemplate,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import { defaultProfile } from "../../../../components/ImageURLs/URLs";
import CategoryModal from "../../../../components/Modals/CategoryModal";
import CategoryTable from "../../../../components/tables/CategoryTable";

function SuperAdminCategories(props) {
  const [image, setImage] = useState(defaultProfile);
  // const [categoryData, setCategoryData] = useState([]);
  const [newCategoryModalShow, setNewCategoryModalShow] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [useEffectLoader, setUseEffectLoader] = useState(false);
  const categoryData = [
    {
      id: 1,
      name: "Cars",
      image:
        "https://www.kasandbox.org/programming-images/avatars/spunky-sam.png",
    },
  ];
  let handleNewCategoryModalClose = () => {
    setNewCategoryModalShow(false);
    setViewDetail(false);
    setName("");
    setImage(defaultProfile);
  };
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
  const handleViewDetail = (e, data) => {
    setViewDetail(true);
    setImage(data.image);
    setName(data.name);
    handleNewCategoryModalOpen();
  };
  const handleEditModalOpen = (e, data) => {
    e.preventDefault();
    setEditData(true);
    setImage(data.image);
    setName(data.name);
    handleNewCategoryModalOpen();
    console.log("data of edit modal", data);
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
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
      categories: "active",
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

      <div className="row">
        <div className="col-12 mb-3" style={{ textAlign: "right" }}>
          <Button
            className="bttn mb-4 mt-3"
            onClick={() => handleNewCategoryModalOpen()}
          >
            Create Category
          </Button>
        </div>
      </div>

      {categoryData?.length ? (
        <div className="row no-gutters">
          <CategoryTable
            handleEditModalOpen={handleEditModalOpen}
            categoryData={categoryData}
            handleViewDetail={handleViewDetail}
          />
        </div>
      ) : (
        <MessageCard msg="No Category created" />
      )}
      <CircularBackdrop open={open} />
      <CategoryModal
        show={newCategoryModalShow}
        handleClose={handleNewCategoryModalClose}
        setName={setName}
        name={name}
        setImage={setImage}
        image={image}
        viewDetail={viewDetail}
        editData={editData}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
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

export default SuperAdminCategories;
