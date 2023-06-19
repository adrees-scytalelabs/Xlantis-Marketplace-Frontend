import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import { defaultProfile } from "../../components/ImageURLs/URLs";
import UploadFile from "../Upload/UploadFile";

function CreateCategoryModal({
  handleClose,
  show,
  setImage,
  image,
  setName,
  name,
  viewDetail,
  editData,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const handleCloseModal = () => {
    //props.setOpen(true);
    handleClose();
  };
  const handleProceed = () => {
    handleClose();
  };
  let onChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setImage(URL.createObjectURL(e.target.files[0]));
      setIsUploading(false);
    }
  };
  // useEffect(()=>{
  //   // props.setAmount(Math.abs(props.amount - props.required).toFixed(4));
  // },[props])
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

            <UploadFile
              fileURL={image}
              isUploading={isUploading}
              viewDetail={viewDetail}
              changeFile={onChangeFile}
              class="col-12 col-md-auto profile-img mr-3"
              accept=".png,.jpg,.jpeg,.gif"
              inputId="uploadPreviewImg"
            />
          </Col>
        </Row>
        <Row>
          <Typography variant="h6" className="ml-3">
            Category Name
          </Typography>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="form-group newNftWrapper">
              <input
                style={{ padding: "10px" }}
                type="text"
                value={name}
                disabled={viewDetail}
                placeholder="Enter Category Name"
                className="form-control-login -login newNftInput"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
              onClick={(e) => handleProceed()}
              style={{ backgroundColor: "#000" }}
            >
              Update
            </button>
          ) : (
            <button
              className="newTemplateBtn mb-3"
              onClick={(e) => handleProceed()}
              style={{ backgroundColor: "#000" }}
            >
              Create
            </button>
          )
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCategoryModal;
