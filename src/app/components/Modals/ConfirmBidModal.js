import { Typography } from "@mui/material";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
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

function ConfirmBidModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Confirm Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center"> <i className="fas fa-exclamation-circle fa-10x"></i></Modal.Body>
            <Modal.Body>
                <h3>Are You Sue you want to Bid</h3>
                <Row>

                    <Col>
                        <Typography variant="h6" gutterBottom  >Your Balance:</Typography>
                    </Col>
                    <Col className="text-right">
                        <Typography variant="h6" gutterBottom color="textSecondary" >{props.balance / 10 ** 18}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography variant="h6" gutterBottom  >Minimum Bid (WETH):</Typography>
                    </Col>
                    <Col className="text-right">
                        <Typography variant="h6" gutterBottom color="textSecondary" >{props.minimumBid / 10 ** 18}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography variant="h6" gutterBottom  >Bid Delta (WETH):</Typography>
                    </Col>
                    <Col className="text-right">
                        <Typography variant="h6" gutterBottom color="textSecondary" >{props.bidDelta / 10 ** 18}</Typography>
                    </Col>
                </Row>
                <Row>

                    <Col>
                        <Typography variant="h6" gutterBottom  >You will Pay:</Typography>
                    </Col>
                    <Col className="text-right">
                        <Typography variant="h6" gutterBottom color="textSecondary" >{props.bid}</Typography>
                    </Col>
                </Row>



            </Modal.Body>
            <Modal.Footer>
                <Button sx={styles.buttons} variant="primary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button sx={styles.buttons} variant="primary" onClick={props.ConfirmBidding}>
                    Yes, Proceed!
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ConfirmBidModal;
