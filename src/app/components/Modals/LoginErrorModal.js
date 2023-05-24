import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";

function LoginErrorModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Login Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center"> <i className="fas fa-times-circle fa-10x"></i></Modal.Body>
            <Modal.Body>
                User Must be Logged in before performing any Transaction
    </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Close
    </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default LoginErrorModal;
