import React from "react";
import { Modal } from "react-bootstrap";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropModal = (props) => {
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
          <ReactCrop
            // src={imageSrc}
            crop={props.crop}
            onChange={(newCrop) => props.setCrop(newCrop)}
            onComplete={(c) => props.onCropComplete(c)}
            aspect={16 / 9}
          >
            <img
              src={props.imageSrc}
              onLoad={props.onImageLoad}
              // style={{ transform: `scale(3) rotate(0deg)` }}
            />
          </ReactCrop>
        ) : null}
        {/* {props.resultImage && (
          <div>
            <img src={props.resultImage} alt="Cropped Image" />
          </div>
        )} */}
      </Modal.Body>
      <Modal.Footer>
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
          onClick={() => props.getCroppedImage()}
        >
          Upload
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropModal;
