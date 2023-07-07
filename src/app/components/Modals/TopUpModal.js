import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Typography } from "@mui/material";

function TopUpModal(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

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
          backgroundColor: "#000",
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
          backgroundColor: "#000",
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
            <div className="input-group form-group newNftWrapper">
              <div class="input-group-prepend">
                <span class="input-group-text bg-transparent text-white">
                  $
                </span>
              </div>
              <input
                type="number"
                required
                // defaultValue={Math.abs(props.amount - props.required).toFixed(4)}
                value={props.topUpAmount}
                placeholder="Enter Top Up Amount"
                className="form-control newNftInput"
                min={0.5}
                step={0.1}
                style={{ backgroundColor: "#000", color: "white" }}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(value)) {
                    props.setAmount(e.target.value);
                    if (e.target.value < 0.5 || e.target.value > 999999.99) {
                      setErrorMessage(
                        "Value must be greater than $0.5 and less than $999,999.99"
                      );
                      setError(true);
                    } else {
                      setError(false);
                    }
                  }
                }}
              />
              {error && <span style={{ color: "red" }}>{errorMessage}</span>}
            </div>
          </Col>
        </Row>
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
          onClick={handleClose}
          style={{ backgroundColor: "#000" }}
        >
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => handleProceed()}
          style={{ backgroundColor: "#000" }}
          disabled={error}
        >
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopUpModal;
