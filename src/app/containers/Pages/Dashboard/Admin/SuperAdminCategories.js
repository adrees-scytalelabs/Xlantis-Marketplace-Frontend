import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createCategory,
  deleteTemplate,
  getCategories,
  getTemplate,
  updateCategory,
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
  const [isLoading, setIsLoading] = useState(false);
  const [useEffectLoader, setUseEffectLoader] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [createButton, setCreateButton] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [imageFile, setImageFile] = useState();
  const [valid, setValid] = useState("");
  const handleCreateCategory = async () => {
    if (!imageFile) {
      setCreateButton(true);
      return;
    }

    if (!name) {
      setCreateButton(true);
      return;
    }
    if(valid==="is-invalid"){
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    setIsLoading(true);
    try {
      const response = await createCategory(formData);
      console.log("response of categories", response);
      setSnackbarMessage("Category Added Succesfully");
      getCategoriesData();
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setCreateButton(false);
      handleNewCategoryModalClose();
    } catch (error) {
      console.error("Error fetching categories:", error.response);
      setSnackbarMessage("Unable to add category");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateCategory = async () => {
    if (!imageFile) {
      setCreateButton(true);
      return;
    }
    if (!name) {
      setCreateButton(true);
      return;
    }
    if(valid==="is-invalid"){
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    setIsLoading(true);
    try {
      const response = await updateCategory(updateName, formData);
      console.log("response of category update", response);
      setSnackbarMessage("Category Updated Succesfully");
      getCategoriesData();
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleNewCategoryModalClose();
    } catch (error) {
      console.error("Error fetching category:", error.response);
      setSnackbarMessage("Unable to update category");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  let handleNewCategoryModalClose = () => {
    setNewCategoryModalShow(false);
    setViewDetail(false);
    setName("");
    setImage(defaultProfile);
    setEditData(false);
    setCreateButton(false);
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
    setImage(data.imageUrl);
    setName(data.name);
    handleNewCategoryModalOpen();
  };
  const handleEditModalOpen = (e, data) => {
    e.preventDefault();
    setEditData(true);
    setUpdateName(data.name);
    setImage(data.imageUrl);
    setImageFile(data.imageUrl);
    setName(data.name);
    handleNewCategoryModalOpen();
  };
  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategoryData(response.data.categories);
      console.log("response of categories", response);
    } catch (error) {
      console.error("Error fetching categories:", error.response);
    }
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  useEffect(() => {
    getCategoriesData();
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
        setSnackbarOpen={setSnackbarOpen}
        imageFile={imageFile}
        setImageFile={setImageFile}
        handleCreateCategory={handleCreateCategory}
        isLoading={isLoading}
        handleUpdateCategory={handleUpdateCategory}
        valid={valid}
        setValid={setValid}
        createButton={createButton}
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
