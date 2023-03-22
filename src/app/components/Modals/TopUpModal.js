import React from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
function TopUpModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      style={{}}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "white",
        }}
      >
        <Modal.Title style={{ color: "black" }}>Top Up</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid black",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "black",
          justifyContent: "center",
          border: "1px solid white",
          borderBottom: "none",
        }}
      >
        <Row className="mt-3">
          <Col>
            <label>Select your Top Up Amount</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <select
              name="type"
              id="valueType"
              className="templatesSelect"
              placeholder="Select a Type"
              // value={i.type}
              // onChange={(e) => handlePropertyChange(index, e)}
              style={{ padding: "10px" }}
            >
              <option value="5" defaultValue>
                $5
              </option>
              <option value="10">$10</option>
              <option value="15">$15</option>
            </select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          onClick={props.handleClose}
          style={{ backgroundColor: "gray" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={props.handleData}
          style={{ backgroundColor: "green" }}
        >
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopUpModal;
