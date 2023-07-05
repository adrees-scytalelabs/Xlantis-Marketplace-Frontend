import { Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import WhiteSpinner from "../Spinners/WhiteSpinner";
import InfoIcon from "@mui/icons-material/Info";

const UploadFile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setImageLoaded(true);
    };
    img.src = props.fileURL;
  }, [props.fileURL]);

  return (
    <div className="filter-widget">
      <div className="form-group">
        <div className="row no-gutters align-items-end justify-content-start">
          <div className={props.class}>
            {isLoading ? (
              <div
                className="text-center"
                style={{
                  border: "1px solid white",
                  height: "250px",
                  width: "220px",
                }}
              >
                <div style={{ marginTop: "50%" }}>
                  <WhiteSpinner />
                </div>
              </div>
            ) : imageLoaded ? (
              <img src={props.fileURL} alt="Selfie" />
            ) : null}
          </div>
          <div className="co-12 col-md-auto">
            {props?.viewDetail !== true ? (
              <label htmlFor={props.inputId} className="uploadLabel">
                {isLoading ? <WhiteSpinner /> : "Choose File"}
              </label>
            ) : null}
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
                  <InfoIcon />
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
            {props?.viewDetail !== true ? (
              <small className="form-text text-muted">
                Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
              </small>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadFile;
