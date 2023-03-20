import React from "react";
import { Col, Modal, Row,Button } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

function DeleteModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Delete Template</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {" "}
        <i className="fas fa-exclamation-circle fa-10x"></i>
      </Modal.Body>
      <Modal.Body>
        <h3>Are You Sure? </h3>
        <Row>
          <Col>
                Do you really want to delete this template. You cannot undo this action.
          </Col>
        </Row>   
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.ConfirmBidding}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
