import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ProfileUpdationConfirmationModal = (props) => {
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="custom-header">Confirmation</DialogTitle>
      <DialogContent
        sx={{
          border: "1px solid white",
          borderBottom: "none",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.175rem",
          background: "black",
        }}
      >
        <label style={{ marginTop: "10px" }}>
          Are you sure you want to update the data?
        </label>
      </DialogContent>
      <DialogActions
        sx={{
          background: "black",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button
          className="btn propsActionBtn"
          onClick={() => props.handleClose()}
          style={{
            marginRight: 0,
            borderRadius: 0,
            padding: 10,
          }}
        >
          Cancel
        </button>
        <button
          className="btn propsActionBtn"
          onClick={() => props.updateData()}
          style={{
            marginRight: 0,
            borderRadius: 0,
            padding: 10,
          }}
        >
          Update
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileUpdationConfirmationModal;
