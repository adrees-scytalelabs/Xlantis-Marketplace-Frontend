import React from "react";
import { Modal } from "react-bootstrap";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Button from '@mui/material/Button';

const styles = {
    buttons: {
      margin: "5px 0px 5px 7px",
      backgroundColor: "#000",
      border: "1px solid #F64D04",
      color: "#fff",
      padding: "10px",
      fontFamily: "orbitron",
      "&:hover": {
        boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
      },
    },
  };

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
                <Button sx={styles.buttons} onClick={props.handleClose}>
                    Close
    </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default LoginErrorModal;
