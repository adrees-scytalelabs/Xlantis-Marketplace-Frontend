import React, { useState, useCallback } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { CircularProgress, Typography } from "@mui/material";
import UploadFile from "../Upload/UploadFile";
import ImageCropModal from "./ImageCropModal";
import getCroppedImg from "../Utils/Crop";
import { categoryAvailable } from "../API/AxiosInterceptor";
import { ErrorOutline } from "@mui/icons-material";

function CategoryModal({
  handleClose,
  show,
  setImage,
  image,
  setName,
  name,
  viewDetail,
  editData,
  setSnackbarMessage,
  setSnackbarSeverity,
  valid,
  setValid,
  setImageFile,
  handleCreateCategory,
  isLoading,
  handleUpdateCategory,
  createButton,
  imageFile,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageSrc, setImageSrc] = useState("");
  const [imageCounter, setImageCounter] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("square");

  const checkAvailability = (e) => {
    e.preventDefault();
    let name = e.target.value;
    categoryAvailable(name)
      .then((response) => {
        if (!response.data.exists) {
          setValid("is-valid");
        } else {
          setValid("is-invalid");
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          setValid("is-invalid");
          console.log(error);
          console.log(error.response);
        }
      });
  };
  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setImageSrc("");
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      setIsUploadingCroppedImage(true);
      const image = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        imageCounter,
        0
      );
      setImageFile(image);
      setImage(URL.createObjectURL(image));
      setImageSrc("");
      setAspect(1 / 1);
      setIsUploadingCroppedImage(false);
      setShowCropModal(false);
      setImageCounter(imageCounter + 1);
      setSnackbarMessage("Image Uploaded Succesfully");
      setSnackbarSeverity("success");
    } catch (e) {
      console.log("Error: ", e);
    }
  });
  const handleCloseModal = () => {
    //props.setOpen(true);
    handleClose();
  };
  const handleProceed = () => {
    handleClose();
  };
  let onChangeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setCropShape("square");
      setAspect(1 / 1);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      // setImage(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
      setIsUploading(false);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        closeButton
        className="text-center"
        style={{
          backgroundColor: "#000",
        }}
      >
        <Typography
          variant="h6"
          className="text-center"
          sx={{ marginLeft: "42%" }}
        >
          Category
        </Typography>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col>
            {viewDetail !== true ? (
              <label>Select Category Image</label>
            ) : (
              <label>Category Image</label>
            )}
            <ImageCropModal
              show={showCropModal}
              handleClose={handleCloseImageCropModal}
              crop={crop}
              setCrop={setCrop}
              onCropComplete={onCropComplete}
              imageSrc={imageSrc}
              uploadImage={showCroppedImage}
              isUploadingCroppedImage={isUploadingCroppedImage}
              zoom={zoom}
              setZoom={setZoom}
              aspect={aspect}
              cropShape={cropShape}
            />
            <UploadFile
              fileURL={image}
              isUploading={isUploading}
              viewDetail={viewDetail}
              changeFile={onChangeFile}
              class="col-12 col-md-auto profile-img mr-3"
              accept=".png,.jpg,.jpeg,.gif"
              inputId="uploadPreviewImg"
            />
            {createButton && !imageFile && (
              <span className="text-danger" style={{ fontSize: "10px" }}>
                <ErrorOutline className="mr-1" />
                <label>Image field cannot be empty.</label>
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <Typography variant="h6" className="ml-3">
            Category Name
          </Typography>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="form-group newNftWrapper ">
              <input
                style={{ padding: "10px" }}
                type="text"
                required
                value={name}
                disabled={viewDetail}
                placeholder="Enter Category Name"
                className={`newNftInput  form-control ${valid}`}
                onChange={(e) => {
                  checkAvailability(e);
                  setName(e.target.value);
                }}
              />
              {createButton && !name && (
                <span className="text-danger" style={{ fontSize: "10px" }}>
                  <ErrorOutline className="mr-1" />
                  <label className="mt-2">Name field cannot be empty.</label>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          onClick={handleCloseModal}
          style={{ backgroundColor: "#000" }}
        >
          Close
        </button>
        {viewDetail !== true ? (
          editData == true ? (
            <button
              className="newTemplateBtn mb-3"
              onClick={(e) => handleUpdateCategory()}
              style={{ backgroundColor: "#000" }}
            >
              {isLoading ? <CircularProgress size="sm" /> : "Update"}
            </button>
          ) : (
            <button
              className="newTemplateBtn mb-3"
              onClick={(e) => handleCreateCategory()}
              style={{ backgroundColor: "#000" }}
            >
              {isLoading ? <CircularProgress size={20} /> : "Create"}
            </button>
          )
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;
