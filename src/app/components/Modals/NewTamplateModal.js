import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "../Backdrop/Backdrop";
import CircularBackdrop from "../Backdrop/Backdrop";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


const NewTamplateModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  let [title, setTitle] = useState("");
  let [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  let [defaultt, setDefault] = useState(false);
  const [open, setOpen] = useState(false);
  let [available, setAvailable] = useState();
  let [checking, setChecking] = useState(false);
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

    axios.get(`/nft-properties/template/is-available/${namee}`).then(
      (response) => {
        console.log("response", response);
        setAvailable(response.data.isAvailable);
        setChecking(false);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          setChecking(false);

          console.log(error);
          console.log(error.response);
        }
      }
    );
  };

  let handleSaveTemplate = (e) => {
    e.preventDefault();
    handleShowBackdrop();

    console.log("Propertuies : ", properties);
    console.log("Title", title);
    console.log("default", defaultt);

    let templateData = {
      name: title,
      isDefault: defaultt,
      data: properties,
    };

    axios.post("/nft-properties/admin/template", templateData).then(
      (response) => {
        console.log("response", response);

        setTitle("");
        setDefault(false);
        setProperties([{ key: "", type: "boolean" }]);
        handleCloseBackdrop();
        let variant = "success";
        enqueueSnackbar("New Template Created Successfully", { variant });
        props.handleClose();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Create Template", { variant });
      }
    );
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
      <Modal.Header className="NewTemplateHeader" style={{ background: 'black' }}>
        <Modal.Title style={{ color: 'white' }}>Create New Template</Modal.Title>
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
                                title="Remove a property"
                                placement="bottom"
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
                    <Tooltip title="Add a property" placement="right">
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
              <label for="makeDefault mb-0">Save as Default Template</label>
            </div>
          </div>
          <div className="col-12 col-sm-5 pl-sm-1 text-center text-sm-right">
            {available ? (
              <Tooltip title="Template title already taken" placement="bottom">
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
