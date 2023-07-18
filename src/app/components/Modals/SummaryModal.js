import Button from "@mui/material/Button";
import React from "react";
import { Modal } from "react-bootstrap";

const styles = {
  buttons: {
    margin: "5px 0px 5px 7px",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    color: "#fff",
    padding: "10px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
};

function SummaryModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header
        closeButton
        className="custom-header"
        style={{ backgroundColor: "black" }}
      >
        <Modal.Title>Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <div className="d-flex justify-content-between mb-4">
          <span>Number of Transactions</span>
          <span>1</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Total NFTs to mint</span>
          <span>$220</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Your Balance</span>
          <span>$500</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Total Cost</span>
          <span>$10</span>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{ backgroundColor: "black", border: "1px solid white" }}
      >
        <Button
          sx={styles.buttons}
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={styles.buttons}
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SummaryModal;
