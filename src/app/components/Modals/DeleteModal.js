import React from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

function DeleteModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      style={{ border: "1px solid black" }}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "white",
          borderTop: "1px solid black",
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <Modal.Title style={{ color: "black" }} centered> Delete Template</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid black",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor:'black'
        }}
      >
        <h3>Are You Sure? </h3>
        <Row className="mt-3">
          <Col>
            Do you really want to delete this template. You cannot undo this
            action.
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:'black'}}>
      <button
            className="newTemplateBtn mb-3"
            onClick={props.handleClose}
            style={{backgroundColor:"gray"}}
          >
            Close
          </button>
        <button
            className="newTemplateBtn mb-3"
            onClick={props.handleDelete}
            style={{backgroundColor:"red"}}
          >
            Delete
          </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
