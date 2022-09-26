import { Button } from '@material-ui/core';
import React from 'react';
import { Modal } from 'react-bootstrap';

const ChangeCollectionConfirmationModal = (props) => {
    return ( 
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header closeButton>
                <Modal.Title> Change Collection? </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body className="text-center"> <i className="fas fa-times-circle fa-10x"></i></Modal.Body> */}
            <Modal.Body>Are you sure you want to change <strong>Collection?</strong></Modal.Body>
            <Modal.Body>It will change collection among all <strong>NFTs.</strong></Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose} >
                    Cancle
                </Button>
            </Modal.Footer>
        </Modal>
        
    );
}
 
export default ChangeCollectionConfirmationModal;