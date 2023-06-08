import { Tooltip, Typography } from "@mui/material";
import React from "react";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const UploadFile = (props) => {
  return (
    <div className="filter-widget">
      <div className="form-group">
        <div className="row no-gutters align-items-end justify-content-start">
          <div className={props.class}>
            {props.isUploading ? (
              <div
                className="text-center"
                style={{
                  border: "1px solid white",
                  height: "250px",
                  width: "220px",
                }}
              >
                {" "}
                <div style={{ marginTop: "50%" }}>
                  <WhiteSpinner />{" "}
                </div>
              </div>
            ) : (
              <img src={props.fileURL} alt="Selfie" />
            )}
          </div>
          <div className="co-12 col-md-auto">
            <label htmlFor={props.inputId} className="uploadLabel">
              {props.isUploading ? <WhiteSpinner /> : "Choose File"}
            </label>
            {props.inputId === "dropImage" && (
              <Tooltip
                className="ml-2"
                title={
                  <Typography fontSize={18}>
                    This Image is shown as the drop image
                  </Typography>
                }
              >
                <span style={{ fontSize: "0.9rem" }}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </span>
              </Tooltip>
            )}
            <input
              name="sampleFile"
              type="file"
              id={props.inputId}
              accept={props.accept}
              onChange={props.changeFile}
              hidden
            />
            <small className="form-text text-muted">
              Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadFile;
