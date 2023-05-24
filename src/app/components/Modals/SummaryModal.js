import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import SelectNFTAndSaleType from "../Radio/SelectNFTAndSaleType";
import DateTimePicker from "react-datetime-picker";
import NFTMediaCard from "../Cards/AuctionNFTCards/NFTMediaCard";

function SummaryModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton className="custom-header" style={{backgroundColor:'black'}}>
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
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
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
