import {
  Box,
  Container,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { style } from "../styles/MuiModalStyle";
import CloseIcon from "@mui/icons-material/Close";

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

function ConfirmBidModal(props) {
  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Confirm Bid</Typography>
          </div>
          <div>
            <IconButton sx={{ color: "white" }}>
              <CloseIcon onClick={props.handleClose} />
            </IconButton>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody}>
          <div>
            {" "}
            <i className="fas fa-exclamation-circle fa-10x"></i>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Typography variant="h6" gutterBottom>
                Your Balance:
              </Typography>
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
              <Typography variant="h6" gutterBottom color="textSecondary">
                {props.balance / 10 ** 18}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Typography variant="h6" gutterBottom>
                Minimum Bid (WETH):
              </Typography>
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
              <Typography variant="h6" gutterBottom color="textSecondary">
                {props.minimumBid / 10 ** 18}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Typography variant="h6" gutterBottom>
                Bid Delta (WETH):
              </Typography>
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
              <Typography variant="h6" gutterBottom color="textSecondary">
                {props.bidDelta / 10 ** 18}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Typography variant="h6" gutterBottom>
                You will Pay:
              </Typography>
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
              <Typography variant="h6" gutterBottom color="textSecondary">
                {props.bid}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <Button
            sx={styles.buttons}
            variant="primary"
            onClick={props.handleClose}
          >
            Close
          </Button>
          <Button
            sx={styles.buttons}
            variant="primary"
            onClick={props.ConfirmBidding}
          >
            Yes, Proceed!
          </Button>
        </Container>
      </Box>
    </Modal>
  );
}

export default ConfirmBidModal;
