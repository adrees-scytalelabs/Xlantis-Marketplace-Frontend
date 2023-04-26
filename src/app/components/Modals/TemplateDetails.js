import { Tooltip } from '@mui/material';
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import CircularBackdrop from "../Backdrop/Backdrop";

function TemplateDetails(props) {
  const [title, setTitle] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let handleChangeTile = (e) => {
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      name: e.target.value,
    }));
  };
  let handlePropertyChange = (index, event) => {
    let data = [...properties];
    data[index][event.target.name] = event.target.value;
    setProperties(data);
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      properties: properties,
    }));
  };
  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", type: "boolean" };
    setProperties([...properties, newData]);
  };
  let handleRemoveProperty = async (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      properties: data,
    }));
  };
  let updateData = (e) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      templateId: props.templateData._id,
      name: title,
      data: properties,
    };
    try {
      console.log(data);
      axios.put(`/super-admin/template`, data).then(
        (response) => {
          console.log(response);
          let variant = "success";
          enqueueSnackbar("Template Updated Successfully", { variant });
          handleCloseBackdrop();
          props.handleClose();
        },
        (error) => {
          console.log("Error on status pending nft: ", error);
          console.log("Error on status pending nft: ", error.response);

          handleCloseBackdrop();

          let variant = "error";
          enqueueSnackbar("Unable to update the template.", { variant });
        }
      );
    } catch (e) {
      console.log("Something wrong with updation", e);
    }
  };
  useEffect(() => {
    if (props.show === true) {
      console.log(props.templateData);
      setTitle(props.templateData.name);
      setProperties(props.templateData.properties);
    }
  }, [props]);
  return (
    props.show === true && (
      <>
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
              Template Details
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            className="NewTemplateBody"
            style={{ borderBottom: "none" }}
          >
            <div style={{ margin: "10px" }}>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col>
                  <h4>Title</h4>
                  <input
                    name="title"
                    type="text"
                    disabled={props.updateEnabled}
                    value={title}
                    className="newNftProps mt-1"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      handleChangeTile(e);
                    }}
                  />
                </Col>
              </Row>
              {properties.map((i, index) => (
                <Row key={index} className="no-gutters mt-3">
                  <Col xs={12} lg={4} md={4} sm={12}>
                    <h4>Key</h4>
                    <input
                      name="key"
                      type="text"
                      disabled={props.updateEnabled}
                      value={i.key}
                      className="newNftProps mt-1"
                      onChange={(e) => handlePropertyChange(index, e)}
                    />
                  </Col>

                  <Col xs={12} lg={4} md={4} sm={12} className="ml-5">
                    <h4 className="ml-4">Type</h4>
                    <select
                      name="type"
                      id="valueType"
                      className="templatesSelect"
                      placeholder="Select a Type"
                      disabled={props.updateEnabled}
                      value={i.type}
                      onChange={(e) => handlePropertyChange(index, e)}
                      style={{ padding: "9px" }}
                    >
                      <option value="boolean" defaultValue>
                        Boolean
                      </option>
                      <option value="string">String</option>
                      <option value="number">Number</option>
                    </select>
                  </Col>
                  {props.updateEnabled === false && (
                    <Col
                      xs={12}
                      lg={2}
                      md={4}
                      sm={12}
                      className="ml-4 mt-2 mt-lg-0"
                    >
                      <h4>Action</h4>
                      <Tooltip title="Remove a property" placement="bottom">
                        <button
                          className="btn btn-submit btn-lg propsActionBtn"
                          onClick={(e) => handleRemoveProperty(e, index)}
                          disabled={props.updateEnabled}
                        >
                          -
                        </button>
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              ))}
              {props.updateEnabled === false && (
                <Row className="mt-4 ml-1">
                  <button
                    className="btn btn-submit btn-lg propsActionBtn mb-4"
                    onClick={(e) => handleAddProperty(e)}
                  >
                    <h4 className="mt-2">Add new property</h4>
                  </button>
                </Row>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "black",
              border: "1px solid white",
              borderTop: "none",
            }}
          >
            <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
              Close
            </button>
            {props.updateEnabled === false && (
              <button
                className="newTemplateBtn mb-3"
                onClick={(e) => updateData(e)}
              >
                Update
              </button>
            )}
          </Modal.Footer>
        </Modal>
        <CircularBackdrop open={open} />
      </>
    )
  );
}

export default TemplateDetails;