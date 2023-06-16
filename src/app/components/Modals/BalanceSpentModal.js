import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import MessageCard from "../MessageCards/MessageCard";

const BalanceSpentModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header
        className="NewTemplateHeader"
        style={{ background: "black" }}
      >
        <Modal.Title style={{ color: "white", text: "center" }}>
          Balance Spent Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="NewTemplateBody" style={{ borderBottom: "none" }}>
        {props?.balanceHistoryModalData?.txInfo?.length > 0 ? (
          <div style={{ margin: "10px" }}>
            {props?.balanceHistoryModalData?.txInfo?.map((info, index) => {
              return (
                <Row className="p-2" key={index}>
                  <Col>{info?.name}</Col>
                  <Col>${info?.amountInUsd?.toFixed(5)}</Col>
                </Row>
              );
            })}
          </div>
        ) : (
          <div style={{ margin: "10px" }}>
            <MessageCard msg="No Details Available" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BalanceSpentModal;
