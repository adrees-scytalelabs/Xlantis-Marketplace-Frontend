import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap';



const AcceptBidModal = (props) => {

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Total Bids
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Bidder</th>
                                <th>Bid</th>
                                {/* <th colSpan={2}></th> */}
                                <th>
                                    <button className="btn" onClick={props.acceptBid}>
                                        Accept
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.bidDetails?.map((bid, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{bid.bidderAddress}</td>
                                    <td>{bid.bidAmount}</td>
                                    <td>
                                        <button className="btn">
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );
}
 
export default AcceptBidModal;