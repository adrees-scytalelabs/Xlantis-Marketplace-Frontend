import React from "react";
import { Modal } from "react-bootstrap";

const ProfileUpdationConfirmationModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="custom-header">
        Confirmation
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
          Are you sure you want to update the data?
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
          onClick={() => props.handleClose()}
        >
          Cancel
        </button>
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
          onClick={() => props.updateData()}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileUpdationConfirmationModal;
