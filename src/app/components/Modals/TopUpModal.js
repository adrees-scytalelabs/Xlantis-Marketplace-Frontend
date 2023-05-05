import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
function TopUpModal(props) {
  const handleClose = () => {
    props.setOpen(true);
    props.handleClose();
  }
  const handleProceed = () => {
    props.topUp();
    props.handleClose();
  }
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "black",
        }}
      >
        <Modal.Title style={{ background: "black", color: "white" }}>
          Top Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "black",
          justifyContent: "center",
        }}
      >
        <Row className="mt-3">
          <Col>
            <label>Select your Top Up Amount</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="number"
              required
              value={props.amount}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={5}
              style={{ backgroundColor: "black", color: "white" }}
              onChange={(e) => {
                props.setAmount(e.target.value);
              }}
            />
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
          onClick={handleClose}
          style={{ backgroundColor: "black" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => handleProceed()}
          style={{ backgroundColor: "black" }}
        >
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopUpModal;
