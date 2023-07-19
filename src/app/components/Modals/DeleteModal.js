
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from "react";
import { Modal } from "react-bootstrap";
function DeleteModal(props) {
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
        <Modal.Title style={{ color: "black" }}>Delete Template</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          {" "}
          <HighlightOffIcon
            fontSize="large"
            style={{ color: "red", fontSize: '4.7rem' }}
            className="mb-3"
          ></HighlightOffIcon>
          <br></br>
          Are You Sure?{" "}
        </h3>
        <div className="mt-3">
          <div>
            Do you really want to delete this template. You cannot undo this
            action.
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
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
          onClick={props.handleDelete}
          style={{ backgroundColor: "red" }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
