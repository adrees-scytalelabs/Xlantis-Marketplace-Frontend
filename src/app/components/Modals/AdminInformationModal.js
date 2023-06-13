import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const whiteTextClass = {
  color: "pink !important",
};
function AdminInformationModal(props) {
  return (
    props.show === true && (
      <Dialog
        open={props.show}
        onClose={props.handleClose}
        maxWidth="sm"
        PaperProps={{
          style: { backgroundColor: "black", paddingTop: "80px" },
        }}
      >
        <DialogTitle
          style={{
            color: "white",
            border: "1px solid white",
            borderBottom: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Admin Details
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "black" }}
            onClick={(e) => props.handleClose(e, props.setShow)}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ border: "1px solid white", borderBottom: "none" }}>
          <Box sx={{ m: 2 }}>
            <Typography gutterBottom style={{ color: "white" }}>
              Marketplace Image
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <img
                  src={props.adminData.marketplaceImage}
                  alt="Admin Image"
                  style={{
                    width: "100%",
                    height: "280px",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Avatar
                    src={props.adminData.imageURL}
                    alt="Profile Image"
                    sx={{ width: 90, height: 90 }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Typography style={{ color: "white" }}>Username</Typography>

                  <Typography style={{ color: "white" }}>
                    {props.adminData.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    Company Name :
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    {props.adminData.companyName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    Designation :{" "}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    {props.adminData.designation}{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>Domain : </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    {props.adminData.domain}{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    Industry Type :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    {props.adminData.industryType}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    Reason of Interest :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ color: "white" }}>
                    {props.adminData.reasonForInterest}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ border: "1px solid white", borderTop: "none" }}>
          <Button
            variant="contained"
            
            className="btn submit-btn propsActionBtn"
            onClick={(e) => props.handleClose(e, props.setShow)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default AdminInformationModal;
