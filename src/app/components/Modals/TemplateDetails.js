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
        <Modal.Header>Template Details</Modal.Header>

        <Modal.Body>
          <div style={{ margin: "10px" }}>
            <Row className="justify-content-center align-items-center no-gutters">
              <Col style={{ color: "#000" }}>
                Title
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.templateData.name}
                  className="newNftProps"
                />
              </Col>
            </Row>
            {props.templateData.properties.map((i, index) => (
              <Row key={index} className="no-gutters mt-3">
                <Col xs={12} lg={5} md={5} sm={12} style={{ color: "#000" }}>
                  Key
                  <input
                    name="key"
                    type="text"
                    disabled
                    value={i.key}
                    className="newNftProps"
                  />
                </Col>

                <Col
                  xs={12}
                  lg={5}
                  md={5}
                  sm={12}
                  className="ml-5"
                  style={{ color: "#000" }}
                >
                  Type
                  <input
                    name="value"
                    type="text"
                    disabled
                    value={i.type}
                    className="newNftProps"
                  />
                </Col>
              </Row>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn"
            type="button"
            style={{
              margin: "10px",
              marginRight: 0,
              backgroundColor: "black",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
            }}
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
