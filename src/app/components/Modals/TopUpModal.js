import React,{useEffect} from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Typography } from "@mui/material";

function TopUpModal(props) {
  const handleClose = () => {
    props.setOpen(true);
    props.handleClose();
  };
  const handleProceed = () => {
    props.topUp();
    props.handleClose();
  };
  useEffect(()=>{
    props.setAmount(Math.abs(props.amount - props.required).toFixed(4));
  },[props])
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        className="text-center"
        style={{
          backgroundColor: "black",
        }}
      >
        <Typography
          variant="h6"
          className="text-center"
          sx={{ marginLeft: "42%" }}
        >
          Top Up
        </Typography>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "black",
          justifyContent: "center",
        }}
      >
        <Row className="mt-3">
          <Col>
            <label className="nftPrice">Current Balance : </label>
            <label className="ml-2"> ${props.amount.toFixed(3)}</label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <label className="nftPrice">Required Balance : </label>
            <label className="ml-2"> ${props.required.toFixed(4)}</label>
          </Col>
        </Row>
        <Row className="mt-3 mb-2">
          <Col>
            <h1 className="nftPrice">Select your Top Up Amount</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="number"
              required
              value={Math.abs(props.amount - props.required).toFixed(4)}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={0.1}
              style={{ backgroundColor: "black", color: "white" }}
              onChange={(e) => {
                props.setAmount(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          onClick={handleClose}
          style={{ backgroundColor: "black" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => handleProceed()}
          style={{ backgroundColor: "black" }}
        >
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopUpModal;
