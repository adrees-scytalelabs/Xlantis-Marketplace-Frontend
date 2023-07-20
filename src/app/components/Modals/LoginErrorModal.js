import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Button from "@mui/material/Button";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
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

function LoginErrorModal(props) {
  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Login Error</Typography>
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
            <i className="fas fa-times-circle fa-10x"></i>
          </div>
          <div>User Must be Logged in before performing any Transaction</div>
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <Button sx={styles.buttons} onClick={props.handleClose}>
            Close
          </Button>
        </Container>
      </Box>
    </Modal>
  );
}

export default LoginErrorModal;
