import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";
import { Modal } from "react-bootstrap";
function WarningModal(props) {
  const handleVerify = (e) => {
    props.handleApprove(e, props?.id);
    props.handleClose();
  };
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
        <Modal.Title style={{ color: "black" }}>Warning</Modal.Title>
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
          <WarningAmberIcon
            fontSize="large"
            style={{ color: "red", fontSize: "4.7rem" }}
            className="mb-3"
          />
          <br></br>
          Are You Sure?{" "}
        </h3>
        <div className="mt-3">
          <div className="text-center">{props?.text}</div>
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
          //   style={{ backgroundColor: "gray" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => {
            handleVerify(e);
          }}
        >
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarningModal;
