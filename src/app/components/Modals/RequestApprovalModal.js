import { Button } from '@material-ui/core';
import React from 'react';
import { Modal } from 'react-bootstrap';

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
                    <button className="btn" style={{ margin: "10px" }} >Approve for sale</button>
                </div>
                <div>
                    <button className="btn" style={{ margin: "10px" }} >Approve for auction</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default RequestApprovalModal;