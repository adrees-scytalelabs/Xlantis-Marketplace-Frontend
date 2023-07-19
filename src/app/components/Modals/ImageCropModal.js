import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import Cropper from "react-easy-crop";
import CloseIcon from "@mui/icons-material/Close";

const ImageCropModal = (props) => {
  useEffect(() => {
    //console.log("Props are: ", props);
  }, [props.aspect]);
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          background: "#000",
          color: "white",
          border: "1px solid white",
        },
      }}
    >
      <DialogTitle
        className=""
        onClose={props.handleClose}
        style={{
          color: "white",
          borderBottom: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Crop your picture
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "black" }}
          onClick={(e) => props.handleClose(e, props.setShow)}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent
        style={{
          background: "#000",
        }}
      >
        {props.imageSrc ? (
          <div
            className="crop-container"
            style={{ position: "relative", zIndex: 1 }}
          >
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
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
          marginTop: "20px",
        }}
      >
        {props.isUploadingCroppedImage ? (
          <Button
            variant="contained"
            className="btn btn-sm btn-block propsActionBtn"
            style={{
              width: "25%",
              margin: "10px",
              marginRight: 0,
              backgroundColor: "#000",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
            }}
          >
            <CircularProgress size={30} />
          </Button>
        ) : (
          <Button
            variant="contained"
            className="btn btn-sm btn-block propsActionBtn"
            style={{
              borderRadius: 0,
              padding: 10,
              width: "25%",
              height: "46px",
            }}
            onClick={props.uploadImage}
          >
            Upload
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropModal;
