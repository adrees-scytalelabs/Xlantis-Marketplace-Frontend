import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";

const ImageCropModal = (props) => {
  useEffect(() => {
    console.log("Props are: ", props);
  }, [props.aspect]);
  return (
    <Modal
      show={props.show}
      backdrop="static"
      centered
      onHide={props.handleClose}
    >
      <Modal.Header closeButton className="custom-header">
        Crop your picture
      </Modal.Header>
      <Modal.Body>
        {props.imageSrc ? (
          <div className="crop-container">
            <Cropper
              image={props.imageSrc}
              crop={props.crop}
              onCropChange={props.setCrop}
              aspect={props.aspect}
              cropShape={props.cropShape}
              zoom={props.zoom}
              showGrid={true}
              rotation={0}
              onCropComplete={props.onCropComplete}
            />
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {props.isUploadingCroppedImage ? (
          <button
            className="btn"
            type="button"
            style={{
              width: "25px !important",
              margin: "10px",
              marginRight: 0,
              backgroundColor: "black",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
            }}
          >
            <CircularProgress color="white" />
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            style={{
              margin: "10px",
              marginRight: 0,
              backgroundColor: "black",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
            }}
            onClick={() => props.uploadImage()}
          >
            Upload
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropModal;
