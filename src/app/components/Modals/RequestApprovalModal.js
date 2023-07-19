import CheckIcon from "@mui/icons-material/Check";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import BlackSpinner from "../Spinners/BlackSpinner";

const RequestApprovalModal = (props) => {
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
      centered
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Approval Required</DialogTitle>
      <DialogContent>
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
                <Button
                  variant="contained"
                  disableElevation
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
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        {props.doneLoader ? (
          <BlackSpinner />
        ) : (
          <Button
            variant="contained"
            disableElevation
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
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RequestApprovalModal;
