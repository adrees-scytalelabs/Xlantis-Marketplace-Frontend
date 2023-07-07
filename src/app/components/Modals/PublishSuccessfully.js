import React from 'react'
import { Modal } from 'react-bootstrap';

function PublishSuccessfully(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
          <Modal.Header closeButton className="custom-header">
            Drop Publish
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "1.175rem",
                margin: "1rem 0",
              }}
            >
              Drop Is Being Finalized. Transactions Are In Process.
            </div>
            <div
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "1rem",
                margin: "0",
              }}
            >
             Note: The drop will be automatically moved from the draft tab to the pending tab within 30-60 seconds.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn"
              type="button"
              style={{
                margin: "10px",
                marginRight: 0,
                backgroundColor: "#000",
                border: "1px solid #fff",
                borderRadius: 0,
                padding: 10,
              }}
              onClick={props.handleClose}
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>
      );
}

export default PublishSuccessfully