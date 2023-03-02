// REACT
import React from "react";
// BOOTSTRAP
import { Col, Modal, Row } from "react-bootstrap";
// MUI
import { Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";


// COMPONENT FUNCTION
const NewTamplateModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header className="NewTemplateHeader">Create New Template</Modal.Header>
      <Modal.Body className="NewTemplateBody">
        <div>
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="form-group w-100">
                <label>Title<span style={{ color: "#F64D04" }}>&#42;</span></label>
                <div className="filter-widget">
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter title of the property"
                    required
                    value="title"
                    className="newNftProps"
                    onChange={(e) =>
                      console.log(e, "title of the template")
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 pr-md-1">
              <div className="form-group w-100">
                <label>Key<span style={{ color: "#F64D04" }}>&#42;</span></label>
                <div className="filter-widget">
                  <input
                    name="key"
                    type="text"
                    placeholder="Enter key of the property"
                    required
                    value="Key"
                    className="newNftProps"
                    onChange={(e) =>
                      console.log(e, "Key of the new template")
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 pl-md-1">
              <div className="form-group w-100">
                <label>Type<span style={{ color: "#F64D04" }}>&#42;</span></label>
                <div className="w-100 position-relative mb-4">
                  <select name="types" id="valueType" className="templatesSelect" placeholder="Select a Type" onChange={(e) => console.log(e, "Type of new template")}>
                    <option value="boolean" defaultValue>Boolean</option>
                    <option value="string" >String</option>
                    <option value="number">Number</option>
                  </select>
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
                onChange={(e) =>
                  console.log(e, "Key of the new template")
                }
              />
              <label for="makeDefault mb-0">Save as Default Template</label>
            </div>
          </div>
          <div className="col-12 col-sm-5 pl-sm-1 text-center text-sm-right">
            <button
              className="newTemplateBtn"
              onClick={props.handleClose}
            >
              Save Template
            </button>
          </div>
        </div>
        <div className="mt-2 row no-gutters align-items-center">
          <div className="col-12">
            <h6 style={{ fontFamily: "inter", fontStyle: "italic", fontSize: "10px", color: "#F64D04" }}>Press Esc to exit without saving</h6>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewTamplateModal