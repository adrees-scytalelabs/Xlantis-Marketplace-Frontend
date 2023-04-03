import React from "react";
import { Modal } from "react-bootstrap";

const WorkInProgressModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered scrollable>
      <Modal.Header closeButton className="custom-header">
        Feature Coming soon!
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#000000" }}>
        <div
          style={{
            // backgroundColor: "#000000",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.175rem",
            margin: "1rem 0",
          }}
        >
          This feature is comming soon.
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#000000" }}>
        <button
          className="btn"
          type="button"
          style={{
            margin: "10px",
            marginRight: 0,
            // backgroundColor: "rgb(246, 77, 4)",
            backgroundColor: "#000000",
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
