import { Button } from "@material-ui/core";
import { default as React, default as React, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import NFTDetailModalCard from "../Cards/NFTDetailModalCard";

const NFTDetailModal = (props) => {
  useEffect(() => {}, [props.show]);

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{props.nftDetail.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NFTDetailModalCard nftDetail={props.nftDetail} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="text" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="text" onClick={props.handleEdit}>
          Edit Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NFTDetailModal;
