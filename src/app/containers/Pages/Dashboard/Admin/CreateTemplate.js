import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { useSnackbar } from "notistack";

function CreateTemplate(props) {
  const { enqueueSnackbar } = useSnackbar();
  let [valid, setValid] = useState("");
  let [title, setTitle] = useState("");
  let [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const [open, setOpen] = useState(false);

  let handleAvailibility = (e) => {
    e.preventDefault();
    let name = e.target.value;
    axios.get(`/nft-properties/template/is-available/${name}`).then(
      (response) => {
        if(!response.data.isAvailable){
          setValid("is-valid")
        }
        else{
          setValid("is-invalid")
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          setValid("is-invalid")
          console.log(error);
          console.log(error.response);
        }


      }
    );
  }
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

  let handleSaveTemplate = (e) => {
    e.preventDefault();
    handleShowBackdrop();
    let templateData = {
      name: title,
      data: properties,
    };
    try {
      axios.post("/super-admin/template", templateData).then(
        (response) => {
          setTitle("");
          setProperties([{ key: "", type: "boolean" }]);
          handleCloseBackdrop();
          let variant = "success";
          enqueueSnackbar("New Template Created Successfully", { variant });
          setValid("");
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
                style={{backgroundColor:'transparent',color:'white'}}
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