import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const StripeAccountCreationModal = (props) => {
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      props.handleClose();
    }
  };
  return (
    <Dialog open={props.show} onClose={handleClose}  BackdropProps={{
      transitionDuration: 0, // Disable any animation for static dialog
    }} fullWidth maxWidth="sm" centered>
      <DialogTitle className="text-center" sx={{background:"black",color:'white',border:"1px solid white"}}>Create your Account!</DialogTitle>
      <DialogContent style={{ border: "1px solid white",borderTop: "none", borderBottom: "none", backgroundColor: "#000", justifyContent: "center" ,color:"white"}}>
        <div className="mt-3">
          <p>You don't have a stripe account yet.</p>
          <p>Create your account to access additional features.</p>
          {/* Provide options for the user to sign up or take any other desired action */}
        </div>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#000", border: "1px solid white" }}>
        <button
          className="newTemplateBtn mb-3"
          onClick={() => {
            navigate("/");
            props.handleClose();
          }}
          style={{ backgroundColor: "#000" }}
        >
          Cancel
        </button>
        {props.isLoading ? (
          <button
            style={{
              width: "25%",
              backgroundColor: "#000",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="newTemplateBtn mb-3"
          >
            <CircularProgress size={28} sx={{ color: "#FFFFFF" }} />
          </button>
        ) : (
          <button
            className="newTemplateBtn mb-3"
            onClick={props.getOnboardingLink}
            style={{ backgroundColor: "#000" }}
          >
            Create Account
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StripeAccountCreationModal;
