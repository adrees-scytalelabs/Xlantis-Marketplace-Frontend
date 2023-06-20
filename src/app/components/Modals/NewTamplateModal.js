import { Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  createNewTemplates,
  getIsAvailableTemplates,
} from "../API/AxiosInterceptor";
import CircularBackdrop from "../Backdrop/Backdrop";

const NewTamplateModal = (props) => {
  const [title, setTitle] = useState("");
  const [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const [defaultt, setDefault] = useState(false);
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState();
  const [checking, setChecking] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    props?.setSnackbarOpen(true);
  };
  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", type: "boolean" };
    setProperties([...properties, newData]);
    console.log("Add button pressed.");
    console.log("Properties: ", properties);
  };

  let handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
  };

  let handlePropertyChange = (index, event) => {
    console.log(properties, " /// properties");
    let data = [...properties];
    console.log("the datat change: ", event.target);
    console.log("the data index /// ", data[index][event.target.name]);
    data[index][event.target.name] = event.target.value;
    setProperties(data);
  };

  let handleAvailibility = (e) => {
    e.preventDefault();
    setChecking(true);
    let namee = e.target.value;

    getIsAvailableTemplates(namee)
      .then((response) => {
        console.log("response", response);
        setAvailable(response.data.isAvailable);
        setChecking(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          setChecking(false);

          console.log(error);
          console.log(error.response);
        }
      });
  };

  function hasEmptyValue(obj) {
    return Object.values(obj).some((value) => value === null || value === "");
  }

  let handleSaveTemplate = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      title === undefined ||
      title === null ||
      title === "undefined"
    ) {
      let variant = "error";
      props?.setSnackbarMessage("Please Enter Title");
      props?.setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (properties.length === 0) {
      let variant = "error";
      props?.setSnackbarMessage("There is no Template added");
      props?.setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (properties.some((obj) => hasEmptyValue(obj))) {
      let variant = "error";
      props?.setSnackbarMessage("Please Fill All Empty Value");
      props?.setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      handleShowBackdrop();

      console.log("Propertuies : ", properties);
      console.log("Title", title);
      console.log("default", defaultt);

      let templateData = {
        name: title,
        isDefault: defaultt,
        data: properties,
      };

      createNewTemplates(templateData)
        .then((response) => {
          console.log("response", response);

          setTitle("");
          setDefault(false);
          setProperties([{ key: "", type: "boolean" }]);
          props.useEffectLoader
            ? props.setUseEffectLoader(false)
            : props.setUseEffectLoader(true);
          handleCloseBackdrop();
          let variant = "success";
          props?.setSnackbarMessage("New Template Created Successfully.");
          props?.setSnackbarSeverity(variant);
          handleSnackbarOpen();
          props.handleClose();
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          handleCloseBackdrop();
          let variant = "error";
          props?.setSnackbarMessage("Unable to Create Template.");
          props?.setSnackbarSeverity(variant);
          handleSnackbarOpen();
        });
    }
  };

  const getIcon = () => {
    if (checking) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
          }}
        >
          <i className="fa fa-spinner"></i>
        </div>
      );
    } else if (title && !checking) {
      if (!available) {
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "5px",
              transform: "translateY(-50%)",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>
        );
      } else {
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "5px",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            X
          </div>
        );
      }
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header
        className="NewTemplateHeader"
        style={{ background: "black" }}
      >
        <Modal.Title style={{ color: "white" }}>
          Create New Template
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="NewTemplateBody">
        <div>
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="form-group w-100">
                <label>
                  Title<span style={{ color: "#F64D04" }}>&#42;</span>
                </label>
                <div className="filter-widget">
                  <div style={{ position: "relative" }}>
                    <input
                      name="title"
                      type="text"
                      placeholder="Enter title of the property"
                      required
                      value={title}
                      style={{ paddingRight: "20px" }}
                      className="newNftProps"
                      onBlur={(e) => {
                        setAvailable();
                        handleAvailibility(e);
                      }}
                      onChange={(e) => {
                        console.log("title", e.target.value);
                        setTitle(e.target.value);
                      }}
                    />
                    {getIcon()}
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters justify-content-md-between align-items-center">
              <div className="w-100 my-3">
                {properties.map((property, index) => {
                  return (
                    <div key={index}>
                      <div className="row no-gutters justify-content-md-between align-items-center">
                        <div className="col-12 col-md-5">
                          <div className="form-group w-100">
                            <label>
                              Key<span style={{ color: "#F64D04" }}>&#42;</span>
                            </label>
                            <div className="filter-widget">
                              <input
                                name="key"
                                type="text"
                                placeholder="Enter key of the property"
                                required
                                value={property.key}
                                className="newNftProps"
                                onChange={(e) => handlePropertyChange(index, e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-5">
                          <div className="form-group w-100">
                            <label>
                              Type
                              <span style={{ color: "#F64D04" }}>&#42;</span>
                            </label>
                            <div className="w-100 position-relative mb-4">
                              <select
                                name="type"
                                id="valueType"
                                className="templatesSelect"
                                placeholder="Select a Type"
                                onChange={(e) => handlePropertyChange(index, e)}
                              >
                                <option value="boolean" defaultValue>
                                  Boolean
                                </option>
                                <option value="string">String</option>
                                <option value="number">Number</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-auto text-right">
                          <div className="form-group">
                            <label>Action</label>
                            <div className="filter-widget">
                              <Tooltip
                                placement="bottom"
                                title={
                                  <Typography fontSize={16}>
                                    Remove a property
                                  </Typography>
                                }
                              >
                                <button
                                  className="btn btn-submit btn-lg propsActionBtn"
                                  onClick={(e) =>
                                    handleRemoveProperty(e, index)
                                  }
                                >
                                  -
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="row no-gutters align-items-center justify-content-end">
                  <div className="col-auto">
                    <Tooltip
                      placement="right"
                      title={
                        <Typography fontSize={16}>Add property</Typography>
                      }
                    >
                      <button
                        className="btn btn-submit btn-lg propsActionBtn mb-4"
                        onClick={(e) => handleAddProperty(e)}
                      >
                        +
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters w-100 mt-3 mt-sm-4 mb-2 mb-sm-3 align-items-center justify-content-center">
          <div className="col-12 col-sm-7 pr-sm-1 align-self-sm-end text-center text-sm-left my-2 my-sm-0">
            <div className="">
              <input
                id="makeDefault"
                name="make default"
                type="checkbox"
                className="mr-2"
                style={{ cursor: "pointer", accentColor: "#F64D04" }}
                onChange={(e) => setDefault(!defaultt)}
              />
              <label htmlFor="makeDefault mb-0">Save as Default Template</label>
            </div>
          </div>
          <div className="col-12 col-sm-5 pl-sm-1 text-center text-sm-right">
            {available ? (
              <Tooltip
                placement="bottom"
                title={
                  <Typography fontSize={16}>
                    Template title already taken
                  </Typography>
                }
              >
                <button
                  className="newTemplateBtn"
                  disabled
                  onClick={(e) => handleSaveTemplate(e)}
                >
                  Save Template
                </button>
              </Tooltip>
            ) : (
              <button
                className="newTemplateBtn"
                onClick={(e) => handleSaveTemplate(e)}
              >
                Save Template
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 row no-gutters align-items-center">
          <div className="col-12">
            <h6
              style={{
                fontFamily: "inter",
                fontStyle: "italic",
                fontSize: "10px",
                color: "#F64D04",
              }}
            >
              Press Esc to exit without saving
            </h6>
          </div>
        </div>
        <CircularBackdrop open={open} />
      </Modal.Body>
    </Modal>
  );
};

export default NewTamplateModal;
