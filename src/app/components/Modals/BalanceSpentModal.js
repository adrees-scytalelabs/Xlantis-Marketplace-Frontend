import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

const BalanceSpentModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header
        className="NewTemplateHeader"
        style={{ background: "black" }}
      >
        <Modal.Title style={{ color: "white", text: "center" }}>
          Balance Spent Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="NewTemplateBody" style={{ borderBottom: "none" }}>
        <div style={{ margin: "10px" }}>
          <Row className="p-2">
            <Col>Minting</Col>
            <Col>100</Col>
          </Row>
          <Row className="p-2">
            <Col>Approval</Col>
            <Col>1000</Col>
          </Row>
          <Row className="p-2">
            <Col>Collection Deployment</Col>
            <Col>1000</Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BalanceSpentModal;
