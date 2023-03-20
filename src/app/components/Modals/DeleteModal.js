import React from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import BlackSpinner from "../Spinners/BlackSpinner";

function DeleteModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      style={{  }}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "white",
        }}
      >
        <Modal.Title style={{ color: "black"}} >Delete Template</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid black",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor:'black',
          justifyContent:'center',
          border: "1px solid white",
          borderBottom:'none'
        }}
      >
        <h3 style={{textAlign:'center'}}>Are You Sure? </h3>
        <Row className="mt-3">
          <Col>
            Do you really want to delete this template. You cannot undo this
            action.
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:'black',border:'1px solid white', borderTop:'none'}}>
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
