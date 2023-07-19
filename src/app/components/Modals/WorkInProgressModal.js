import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { style } from "../styles/MuiModalStyle";

const WorkInProgressModal = (props) => {
  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Feature Coming soon!</Typography>
          </div>
          <div>
            <IconButton sx={{ color: "white" }}>
              <CloseIcon onClick={props.handleClose} />
            </IconButton>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody}>
          <div
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "1.175rem",
              margin: "1rem 0",
            }}
          >
            This feature is comming soon. Stay tuned with us!
          </div>
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <button
            className="btn"
            type="button"
            style={{
              margin: "10px",
              marginRight: 0,
              backgroundColor: "#000000",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
            }}
            onClick={props.handleClose}
          >
            Close
          </button>
        </Container>
      </Box>
    </Modal>
  );
};

export default WorkInProgressModal;
