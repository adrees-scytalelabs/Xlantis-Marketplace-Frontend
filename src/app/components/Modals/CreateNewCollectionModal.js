import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { uploadToS3 } from "../API/AxiosInterceptor";
import { defaultProfile } from "../ImageURLs/URLs";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import { style } from "../styles/MuiModalStyle";

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

function CreateNewCollectionModal(props) {
  const [collectionTitle, setCollectionTitle] = useState();
  const [collectionImage, setCollectionImage] = useState(defaultProfile);
  const [isUploadingCollectionImage, setIsUploadingCollectionImage] =
    useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  let onChangeImageHandler = (e) => {
    setIsUploadingCollectionImage(true);
    let fileData = new FormData();
    fileData.append("image", e.target.files[0]);
    uploadToS3(fileData)
      .then((response) => {
        console.log("response", response);
        setCollectionImage(response.data.url);
        setIsUploadingCollectionImage(false);
        let variant = "success";
        setSnackbarMessage("Image Uploaded Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploadingCollectionImage(false);
        let variant = "error";
        setSnackbarMessage("Unable to Upload Image.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      });
  };

  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Create New Collection</Typography>
          </div>
          <div>
            <IconButton sx={{ color: "white" }}>
              <CloseIcon onClick={props.handleClose} />
            </IconButton>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody}>
          <div className="container">
            <div className="form-group">
              <label>Collection Title</label>
              <div className="form-group">
                <div className="filter-widget">
                  <input
                    type="text"
                    required
                    defaultValue={collectionTitle}
                    placeholder=""
                    className="form-control"
                    onChange={(e) => {
                      setCollectionTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <label className="focus-label">Image Artist Photo</label>
              <div className="form-group">
                <div className="change-avatar">
                  <div className="profile-img">
                    <div
                      style={{
                        background: "#E9ECEF",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <img src={collectionImage} alt="Selfie" />
                    </div>
                  </div>
                  <div className="upload-img">
                    <div
                      className="change-photo-btn"
                      style={{ backgroundColor: "rgb(167,0,0)" }}
                    >
                      {isUploadingCollectionImage ? (
                        <div className="text-center">
                          <CircularProgress sx={{ color: "#FFFFFF" }} />
                        </div>
                      ) : (
                        <span>
                          <i className="fa fa-upload"></i>Upload photo
                        </span>
                      )}
                      <input
                        name="sampleFile"
                        type="file"
                        className="upload"
                        accept=".png,.jpg,.jpeg,.gif"
                        onChange={onChangeImageHandler}
                      />
                    </div>
                    <small className="form-text text-muted">
                      Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <Button sx={styles.buttons} onClick={props.handleClose}>
            Close
          </Button>
          {props.isCreating ? (
            <div align="center" className="text-center">
              <CircularProgress sx={{ color: "#FFFFFF" }} />
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : (
            <Button
              sx={styles.buttons}
              onClick={() =>
                props.createCollections(collectionTitle, collectionImage)
              }
            >
              Create
            </Button>
          )}
        </Container>
      </Box>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Modal>
  );
}

export default CreateNewCollectionModal;
