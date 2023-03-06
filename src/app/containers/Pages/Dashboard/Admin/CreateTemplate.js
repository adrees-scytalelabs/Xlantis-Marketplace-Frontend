import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
// MUI
import { Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function CreateTemplate(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  let [title, setTitle] = useState("");
  let [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const [open, setOpen] = useState(false);
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

  let handleSaveTemplate = (e) => {
    e.preventDefault();
    handleShowBackdrop();

    console.log("Properties : ", properties);
    console.log("Title", title);

    let templateData = {
      name: title,
      data: properties,
    };

    console.log("Template Data", templateData);
    try {
      axios.post("/super-admin/template", templateData).then(
        (response) => {
          console.log("response", response);

          setTitle("");
          setProperties([{ key: "", type: "boolean" }]);
          handleCloseBackdrop();
          let variant = "success";
          enqueueSnackbar("New Template Created Successfully", { variant });
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
    } catch (e) {
      console.log("Error in axios request to create template", e);
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
    }); // eslint-disable-next-line
  }, []);
  return (
    <div className="backgroundDefault">
      {/* Page Header */}
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
      {/*Page Content */}
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
                className="newNftProps"
                onChange={(e) => {
                  console.log("title", e.target.value);
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {properties.map((property, index) => {
          return (
            <div key={index} className="row mt-3">
              <div className="col-12 col-md-4 col-lg-4 col-sm-12">
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

              <div className="col-12 col-md-2 col-lg-1 col-sm-12 ml-2">
                <label className="ml-lg-2 ml-md-2">
                  Type<span style={{ color: "#F64D04" }}>&#42;</span>
                </label>
                <div className="position-relative">
                  <select
                    name="type"
                    id="valueType"
                    className="templatesSelect"
                    placeholder="Select a Type"
                    onChange={(e) => handlePropertyChange(index, e)}
                    style={{ padding: "9px" }}
                  >
                    <option value="boolean" defaultValue>
                      Boolean
                    </option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-5 col-lg-1 ml-lg-5 ml-md-5 ml-sm-2 ml-xs-2 mt-4 mt-md-0 ml-2 ml-md-0">
                <label>Action</label>
                <div className="filter-widget">
                  <Tooltip title="Remove a property" placement="bottom">
                    <button
                      className="btn btn-submit btn-lg propsActionBtn"
                      onClick={(e) => handleRemoveProperty(e, index)}
                    >
                      -
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
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
    </div>
  );
}

export default CreateTemplate;
