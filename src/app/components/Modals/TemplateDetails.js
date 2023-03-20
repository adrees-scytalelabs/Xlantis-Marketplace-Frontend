import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

function TemplateDetails(props) {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  let [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  let handleChangeTile = (e) => {
    // let name = e.target.value;
    props.setTemplateData((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the firstName
      name: e.target.value,
    }));
  };
  let handlePropertyChange = (index, event) => {
    console.log(properties, " /// properties");
    let data = [...properties];
    console.log("the datat change: ", event.target);
    console.log("the data index /// ", data[index][event.target.name]);
    data[index][event.target.name] = event.target.value;
    setProperties(data);
    props.setTemplateData((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the firstName
      properties: properties,
    }))
  };

  useEffect(() => {
    console.log(props);
    if (props.show === true) {
      console.log(props.templateData);
      setTitle(props.templateData.name);
      setProperties(props.templateData.properties);
    }
    console.log("Reach Template Data", props);
  }, [props]);
  return (
    props.show == true && (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        centered
        backdrop="static"
      >
        <Modal.Header className="NewTemplateHeader" closeButton>
          Template Details
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
                <Col xs={12} lg={5} md={5} sm={12}>
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

                <Col xs={12} lg={5} md={5} sm={12} className="ml-5">
                  <h4 className="ml-4">Type</h4>
                  <input
                    name="value"
                    type="text"
                    disabled={props.updateEnabled}
                    value={i.type}
                    className="newNftProps mt-1 ml-4"
                  />
                </Col>
              </Row>
            ))}
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
          {props.updateEnabled == false && (
            <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
              Update
            </button>
          )}
        </Modal.Footer>
      </Modal>
    )
  );
}

export default TemplateDetails;
