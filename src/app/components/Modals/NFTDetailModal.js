import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import NFTDetailModalCard from "../Cards/NFTDetailModalCard";

const NFTDetailModal = (props) => {
  // useEffect(() => {
  //   console.log("Props in nftDetail modal: ", props);
  // }, [props]);

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>NFT Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "black", border: "1px solid white" }}>
        <NFTDetailModalCard nftDetail={props?.nftDetail} />
      </Modal.Body>
      <Modal.Footer style={{ background: "black", border: "1px solid white" }}>
        <button
          className="newTemplateBtn mb-3"
          style={{ minWidth: "120px" }}
          onClick={props?.handleClose}
        >
          Close
        </button>
        {/* <Button variant="text" onClick={props?.handleClose}>
          Close
        </Button> */}
        {/* <Button variant="text" onClick={props?.handleEdit}>
          Edit Details
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default NFTDetailModal;
