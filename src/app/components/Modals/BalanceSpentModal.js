import { Grid } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
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
                <Grid container spacing={1} className="p-2" key={index}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    {info?.name}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    ${info?.amountInUsd?.toFixed(5)}
                  </Grid>
                </Grid>
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
