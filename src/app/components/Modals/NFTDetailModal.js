import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "react-h5-audio-player/lib/styles.css";
import NFTDetailModalCard from "../Cards/NFTDetailModalCard";
import CloseIcon from "@mui/icons-material/Close";

const NFTDetailModal = (props) => {
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        style={{
          color: "white",
          borderBottom: "none",
          display: "flex",
          background: "black",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid white",
        }}
      >
        NFT Details
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "black",
            border: "none",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          onClick={props.handleClose}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent style={{ background: "black", border: "1px solid white" }}>
        <NFTDetailModalCard nftDetail={props?.nftDetail} />
      </DialogContent>
      <DialogActions style={{ background: "black", border: "1px solid white" }}>
        <button
          variant="contained"
          className="newTemplateBtn"
          onClick={props?.handleClose}
          style={{ minWidth: "120px" }}
        >
          Close
        </button>
        {/* Add any additional buttons here */}
      </DialogActions>
    </Dialog>
  );
};

export default NFTDetailModal;
