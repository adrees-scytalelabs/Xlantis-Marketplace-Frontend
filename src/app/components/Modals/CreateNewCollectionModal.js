import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { uploadToS3 } from "../API/AxiosInterceptor";
import { defaultProfile } from "../ImageURLs/URLs";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";

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
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
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
            variant="primary"
            onClick={() =>
              props.createCollections(collectionTitle, collectionImage)
            }
          >
            Create
          </Button>
        )}
      </Modal.Footer>
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
