import { Button } from '@material-ui/core';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { Check } from '@material-ui/icons';

const RequestApprovalModal = (props) => {
    return ( 
        <Modal show={props.show} onHide={props.handleClose} centered >
            <Modal.Header closeButton>
                Approval Required
            </Modal.Header>
            <Modal.Body>
                <div>
                    Give approval to put NFTs on sale.
                </div>
                <div>
                    <button className="btn" type="button" style={{ margin: "10px" }} onClick={props.giveFixPriceApproval} >
                        Approve for sale
                    </button>
                    {props.approvingFixedPrice ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#a70000" }}
                        >
                        </Spinner>
                        ): null
                    }
                    {props.isFixedPriceApproved ? (
                        <Check color="success" styles={{color: 'green'}} ></Check>
                        ) : null
                    }
                </div>
                <div>
                    <button className="btn" style={{ margin: "10px" }} onClick={props.giveAuctionApproval} >
                        Approve for auction
                    </button>
                    {props.approvingAuction ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#a70000" }}
                        >
                        </Spinner>
                        ): null 
                    }
                    {props.isAuctionApproved ? (
                        <Check color="success" styles={{color: 'green'}}></Check>
                        ): null
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default RequestApprovalModal;