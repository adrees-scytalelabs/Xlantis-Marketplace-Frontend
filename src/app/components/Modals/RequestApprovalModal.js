import { Button } from '@material-ui/core';
import React from 'react';
import { Col, Modal, Row, Spinner } from 'react-bootstrap';
import { Check } from '@material-ui/icons';

const RequestApprovalModal = (props) => {
    return ( 
        <Modal show={props.show} onHide={props.handleClose} centered backdrop='static' >
            <Modal.Header>
                Approval Required
            </Modal.Header>
            <Modal.Body>
                <div>
                    Give approval to put NFTs on sale.
                </div>
                <div style={{ margin: "10px" }}>
                    <Row>
                        <Col>
                            Give Approval to Fixed Price Drop.
                        </Col>
                        <Col>
                        {props.approvingFixedPrice ? (
                            <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#a70000" }}
                            >
                            </Spinner>
                            ): props.isFixedPriceApproved ? (
                                <Check color='success'></Check>
                            ) : (
                                <button className="btn" type="button" style={{ margin: "10px" }} onClick={props.giveFixPriceApproval} >
                                    Approve
                                </button>
                            )
                        }
                        </Col>    
                    </Row>
                    <Row>
                        <Col>
                            Give Approval to Auction Drop.
                        </Col>
                        <Col>
                            {props.approvingAuction ? (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ color: "#a70000" }}
                                >
                                </Spinner>
                                ): props.isAuctionApproved ? (
                                    <Check color='success'></Check>
                                ) : (
                                    <button className="btn" type="button" style={{ margin: "10px" }} onClick={props.giveFixPriceApproval} >
                                        Approve
                                    </button>
                                )
                            }   
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn" type="button" style={{ margin: "10px" }} onClick={props.done} >
                    Done
                </button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default RequestApprovalModal;