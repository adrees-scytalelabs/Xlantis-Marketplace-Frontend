import Button from "@mui/material/Button";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

const styles = {
  buttons: {
    margin: "5px 0px 5px 7px",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    color: "#fff",
    padding: "10px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
};

function SummaryModal({ show, handleClose }) {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      size="md"
      fullWidth
      maxWidth="sm"
      centered
    >
      <DialogTitle style={{ backgroundColor: "black" }}>Summary</DialogTitle>
      <DialogContent
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <div className="d-flex justify-content-between mb-4">
          <span>Number of Transactions</span>
          <span>1</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Total NFTs to mint</span>
          <span>$220</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Your Balance</span>
          <span>$500</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>Total Cost</span>
          <span>$10</span>
        </div>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "black", border: "1px solid white" }}>
        <Box sx={styles.buttons} component={Button} onClick={handleClose}>
          Close
        </Box>
        <Box sx={styles.buttons} component={Button} onClick={handleClose}>
          Proceed
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default SummaryModal;
