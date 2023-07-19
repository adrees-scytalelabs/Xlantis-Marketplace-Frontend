import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Container,
  IconButton,
  Modal,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { style } from "../styles/MuiModalStyle";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  components: {
    MuiModal: {
      styleOverrides: {
        backdrop: {
          pointerEvents: "none",
        },
      },
    },
  },
});

function DeleteModal(props) {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={props.show} onClose={props.handleClose}>
        <Box sx={style.box}>
          {/* HEADER CONTAINER */}
          <Container sx={style.containerHeader}>
            <div>
              <Typography sx={style.text}>Delete Template</Typography>
            </div>
            <div>
              <IconButton sx={{ color: "white" }}>
                <CloseIcon onClick={props.handleClose} />
              </IconButton>
            </div>
          </Container>

          {/* BODY */}
          <Container sx={style.containerBody}>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              <HighlightOffIcon
                fontSize="large"
                style={{ color: "red", fontSize: "4.7rem" }}
                className="mb-3"
              ></HighlightOffIcon>
              <br></br>
              Are You Sure?{" "}
            </h3>
            <div className="mt-3">
              <div>
                Do you really want to delete this template. You cannot undo this
                action.
              </div>
            </div>
          </Container>

          {/* FOOTER CONTAINER */}
          <Container sx={style.containerFooter}>
            <button
              className="newTemplateBtn mb-3"
              onClick={props.handleClose}
              style={{ backgroundColor: "gray" }}
            >
              Close
            </button>
            <button
              className="newTemplateBtn mb-3"
              onClick={props.handleDelete}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default DeleteModal;
