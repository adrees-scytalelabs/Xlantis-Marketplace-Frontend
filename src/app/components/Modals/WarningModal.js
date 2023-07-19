import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function WarningModal(props) {
  const handleVerify = (e) => {
    props.handleApprove(e, props?.id);
    props.handleClose();
  };
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        style={{
          color: "black",
          borderBottom: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Warning
        <Button
          variant="contained"
          sx={{
            color: "black",
            backgroundColor: "white",
            border: "none",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={(e) => props.handleClose(e, props.setShow)}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "#000",
          justifyContent: "center",
          color: "white",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          <WarningAmberIcon
            fontSize="large"
            style={{ color: "red", fontSize: "4.7rem" }}
            className="mb-3"
          />
          <br />
          Are You Sure?
        </h3>
        <div className="mt-3">
          <div className="text-center">{props?.text}</div>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={(e) => {
            handleVerify(e);
          }}
        >
          Yes
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default WarningModal;
