import { Button } from "@material-ui/core";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

const RequestApprovalModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="custom-header">
        Approval Required
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
          Give approval to put NFTs on sale.
        </div>
        <div style={{ margin: "10px" }}>
          <Row className="justify-content-center align-items-center no-gutters">
            <Col style={{ color: "#000" }}>
              Give Approval to Fixed Price Drop.
            </Col>
            <Col className="text-right">
              {props.approvingFixedPrice ? (
                <BlackSpinner />
              ) : props.isFixedPriceApproved ? (
                <Check color="success" style={{ color: "green" }}></Check>
              ) : (
                <button
                  className="btn"
                  type="button"
                  disabled={props.approvalFlag ? true : false}
                  style={{
                    margin: "10px",
                    marginRight: 0,
                    backgroundColor: "black",
                    border: "1px solid #fff",
                    borderRadius: 0,
                    padding: 10,
                  }}
                  onClick={props.giveFixPriceApproval}
                >
                  Approve
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.doneLoader ? (
          <BlackSpinner />
        ) : (
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
            onClick={props.done}
          >
            Done
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RequestApprovalModal;
