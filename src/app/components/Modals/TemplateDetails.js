import React, { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

function TemplateDetails(props) {
  useEffect(() => {
    console.log(props);
    console.log("Reach Template Data", props);
  }, []);
  return (
    props.show == true && (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        centered
        backdrop="static"
      >
        <Modal.Header className="NewTemplateHeader">Template Details</Modal.Header>

        <Modal.Body className="NewTemplateBody" style={{borderBottom:"none"}}>
          <div style={{ margin: "10px" }}>
            <Row className="justify-content-center align-items-center no-gutters">
              <Col>
                <h4>Title</h4>
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.templateData.name}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            {props.templateData.properties.map((i, index) => (
              <Row key={index} className="no-gutters mt-3">
                <Col xs={12} lg={5} md={5} sm={12}>
                  <h4>Key</h4>
                  <input
                    name="key"
                    type="text"
                    disabled
                    value={i.key}
                    className="newNftProps mt-1"
                  />
                </Col>

                <Col
                  xs={12}
                  lg={5}
                  md={5}
                  sm={12}
                  className="ml-5"
                >
                  <h4 className="ml-4">Type</h4>
                  <input
                    name="value"
                    type="text"
                    disabled
                    value={i.type}
                    className="newNftProps mt-1 ml-4"
                  />
                </Col>
              </Row>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"black",border:"1px solid white",borderTop:'none'}}>
          <button
            className="newTemplateBtn mb-3"
            onClick={props.handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default TemplateDetails;
