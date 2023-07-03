import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createNewTemplates,
  getIsAvailableTemplates,
} from "../../../../components/API/AxiosInterceptor";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import SuperAdminCreateTemplate from "../../../../components/Utils/SuperAdminCreateTemplate";
function CreateTemplate(props) {
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
  const [valid, setValid] = useState("");
  const [title, setTitle] = useState("");
  const [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const [open, setOpen] = useState(false);

  let handleAvailibility = (e) => {
    e.preventDefault();
    let name = e.target.value;
    getIsAvailableTemplates(name)
      .then((response) => {
        if (!response.data.isAvailable) {
          setValid("is-valid");
        } else {
          setValid("is-invalid");
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          setValid("is-invalid");
          console.log(error);
          console.log(error.response);
        }
      });
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", type: "boolean" };
    setProperties([...properties, newData]);
  };

  let handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
  };

  let handlePropertyChange = (index, event) => {
    let data = [...properties];
    data[index][event.target.name] = event.target.value;
    setProperties(data);
  };

  function hasEmptyValue(obj) {
    return Object.values(obj).some((value) => value === null || value === "");
  }

  let handleSaveTemplate = (e) => {
    e.preventDefault();
    handleShowBackdrop();
    let templateData = {
      name: title,
      data: properties,
    };
    try {
      console.log("Template values are: ", { title, properties });
      if (title === null || title === "" || title === undefined) {
        setSnackbarMessage("Please enter title for template");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
      } else if (properties.length === 0) {
        setSnackbarMessage("No properties added");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
      } else if (properties.some((obj) => hasEmptyValue(obj))) {
        setSnackbarMessage("Please Fill All Empty Value");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
      } else {
        createNewTemplates(templateData)
          .then((response) => {
            setTitle("");
            setProperties([{ key: "", type: "boolean" }]);
            let variant = "success";
            setSnackbarMessage("New Template Created Successfully.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            handleCloseBackdrop();
            setValid("");
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            handleCloseBackdrop();

            let variant = "error";
            setSnackbarMessage("Unable to Create Template.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
          });
      }
    } catch (e) {
      console.log("Error in axios request to create template", e);
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "active",
      template: "active",
      saved: "",
    });
  }, []);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Create New Template</h3>
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
              <li className="breadcrumb-item active">Create Template</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-content mt-5">
        <div className="row">
          <div className="col-12 col-lg-6 col-sm-12 col-md-8">
            <h3>Title</h3>
            <div className="filter-widget">
              <input
                name="title"
                type="text"
                placeholder="Enter title of the Template"
                required
                value={title}
                className={`newNftProps form-control ${valid}`}
                onChange={(e) => {
                  handleAvailibility(e);
                  setTitle(e.target.value);
                }}
                style={{ backgroundColor: "transparent", color: "white" }}
              />
            </div>
          </div>
        </div>

        {properties.map((property, index) => {
          return (
            <SuperAdminCreateTemplate
              handlePropertyChange={handlePropertyChange}
              handleRemoveProperty={handleRemoveProperty}
              property={property}
              index={index}
            />
          );
        })}
        <div className="row mt-5">
          <div className="col-12">
            <button
              className="btn btn-submit btn-lg propsActionBtn mb-4"
              onClick={(e) => handleAddProperty(e)}
            >
              <h4 className="mt-2">Add new property</h4>
            </button>
          </div>
        </div>
        <div className="row submit-section">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <button
              className="btn submit-btn propsActionBtn"
              onClick={(e) => handleSaveTemplate(e)}
              style={{ float: "right" }}
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}
export default CreateTemplate;
