import React from "react";
import { Modal } from "react-bootstrap";

const WorkInProgressModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton className="custom-header">
        Work In Progress
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "1.175rem",
            margin: "1rem 0",
          }}
        >
          Sorry, this feature is currently under development and not yet
          available.
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
  );
};

export default WorkInProgressModal;
