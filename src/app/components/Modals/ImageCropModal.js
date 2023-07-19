import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Cropper from "react-easy-crop";
import { style } from "../styles/MuiModalStyle";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-bootstrap";

const ImageCropModal = (props) => {
  useEffect(() => {
    //console.log("Props are: ", props);
  }, [props.aspect]);
  return (
    // <Modal open={props.show} onClose={props.handleClose}>
    //   <Box sx={style.box}>
    //     {/* HEADER CONTAINER */}
    //     <Container sx={style.containerHeader}>
    //       <div>
    //         <Typography sx={style.text}>Crop your picture</Typography>
    //       </div>
    //       <div>
    //         <IconButton sx={{ color: "white" }}>
    //           <CloseIcon onClick={props.handleClose} />
    //         </IconButton>
    //       </div>
    //     </Container>

    //     {/* BODY */}
    //     <Container sx={style.containerBody}>
    //       {props.imageSrc ? (
    //         <div className="crop-container">
    //           <Cropper
    //             image={props.imageSrc}
    //             crop={props.crop}
    //             onCropChange={props.setCrop}
    //             aspect={props.aspect}
    //             cropShape={props.cropShape}
    //             zoom={props.zoom}
    //             showGrid={true}
    //             rotation={0}
    //             onCropComplete={props.onCropComplete}
    //           />
    //         </div>
    //       ) : null}
    //     </Container>

    //     {/* FOOTER CONTAINER */}
    //     <Container sx={style.containerFooter}>
    //       {props.isUploadingCroppedImage ? (
    //         <button
    //           className="btn"
    //           type="button"
    //           style={{
    //             width: "25%",
    //             margin: "10px",
    //             marginRight: 0,
    //             backgroundColor: "#000",
    //             border: "1px solid #fff",
    //             borderRadius: 0,
    //             padding: 10,
    //             height: "46px",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <CircularProgress size={30} sx={{ color: "#FFFFFF" }} />
    //         </button>
    //       ) : (
    //         <button
    //           className="btn"
    //           type="button"
    //           style={{
    //             margin: "10px",
    //             marginRight: 0,
    //             backgroundColor: "#000",
    //             border: "1px solid #fff",
    //             borderRadius: 0,
    //             padding: 10,
    //             width: "25%",
    //             height: "46px",
    //           }}
    //           onClick={() => props.uploadImage()}
    //         >
    //           Upload
    //         </button>
    //       )}
    //     </Container>
    //   </Box>
    // </Modal>

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
            }}
          >
            <CircularProgress size={30} sx={{ color: "#FFFFFF" }} />
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            style={{
              margin: "10px",
              marginRight: 0,
              backgroundColor: "#000",
              border: "1px solid #fff",
              borderRadius: 0,
              padding: 10,
              width: "25%",
              height: "46px",
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
