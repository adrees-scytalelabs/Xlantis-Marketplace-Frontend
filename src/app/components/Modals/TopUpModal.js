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
  // useEffect(()=>{
  //   // props.setAmount(Math.abs(props.amount - props.required).toFixed(4));
  // },[props])
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
          backgroundColor: "rgba(32,32,32,255)",
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
          backgroundColor: "rgba(32,32,32,255)",
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
              // defaultValue={Math.abs(props.amount - props.required).toFixed(4)}
              value={props.topUpAmount}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={0.1}
              style={{ backgroundColor: "rgba(32,32,32,255)", color: "white" }}
              onChange={(e) => {
                props.setAmount(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "rgba(32,32,32,255)",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          onClick={handleClose}
          style={{ backgroundColor: "rgba(32,32,32,255)" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => handleProceed()}
          style={{ backgroundColor: "rgba(32,32,32,255)" }}
        >
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopUpModal;
