import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function PublishSuccessfully(props) {
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      props.handleClose();
    }
  };
  return (
    <Dialog
      open={props.show}
      onClose={handleClose}
      BackdropProps={{
        transitionDuration: 0, // Disable any animation for static dialog
      }}
      centered
    >
      <DialogTitle className="custom-header text-center"  sx={{ background: "black", color: "white", border: "1px solid white" }}>Drop Publish</DialogTitle>
      <DialogContent>
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
          Note: The drop will be automatically moved from the draft tab to the
          pending tab within 30-60 seconds.
        </div>
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
}

export default PublishSuccessfully;
