import React, { useEffect } from "react";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const UploadFile = (props) => {
  return (
    <div className="filter-widget">
      <div className="form-group">
        <div className="row no-gutters align-items-end justify-content-start">
          <div className={props.class}>
            <img src={props.fileURL} alt="Selfie" />
          </div>
          <div className="co-12 col-md-auto">
            <label htmlFor="uploadPreviewImg" className="uploadLabel">
              {props.isUploading ? <WhiteSpinner /> : "Choose File"}
            </label>
            <input
              name="sampleFile"
              type="file"
              id="uploadPreviewImg"
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
