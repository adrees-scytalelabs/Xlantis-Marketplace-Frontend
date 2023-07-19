import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import BlackSpinner from "../Spinners/BlackSpinner";

const RequestApprovalModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="custom-header">
        Approval Required
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
          Give approval to put NFTs on sale.
        </div>
        <div style={{ margin: "10px" }}>
          <Grid
            container
            spacing={1}
            className="justify-content-center align-items-center no-gutters"
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={{ color: "#000" }}
            >
              Give Approval to Fixed Price Drop.
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="text-right"
            >
              {props.approvingFixedPrice ? (
                <BlackSpinner />
              ) : props.isFixedPriceApproved ? (
                <CheckIcon color="success" style={{ color: "green" }} />
              ) : (
                <button
                  className="btn"
                  type="button"
                  disabled={props.approvalFlag ? true : false}
                  style={{
                    margin: "10px",
                    marginRight: 0,
                    backgroundColor: "#000",
                    border: "1px solid #fff",
                    borderRadius: 0,
                    padding: 10,
                  }}
                  onClick={props.giveFixPriceApproval}
                >
                  Approve
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.doneLoader ? (
          <BlackSpinner />
        ) : (
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
            onClick={props.done}
          >
            Done
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RequestApprovalModal;
