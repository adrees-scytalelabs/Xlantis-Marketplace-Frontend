import React from "react";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const DropBannerUpload = ({ isUploading, onChangeBanner, bannerURL }) => {
  return (
    <>
      <div className="bannerWrapper">
        {isUploading ? (
          <div
            style={{
              border: "1px solid white",
              width: "100%",
              height: "350px",
            }}
          >
            <div style={{marginTop:'10%'}}>
              <WhiteSpinner />
            </div>
          </div>
        ) : (
          <img className="bannerImg" src={bannerURL} />
        )}
      </div>
      <div className="co-12 col-md-auto">
        <label htmlFor="uploadDropBanner" className="uploadLabel">
          {isUploading ? <WhiteSpinner /> : "Choose File"}
        </label>
        <input
          name="sampleFile"
          type="file"
          id="uploadDropBanner"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={onChangeBanner}
          hidden
        />
        <small className="form-text text-muted">
          Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
        </small>
      </div>
    </>
  );
};

export default DropBannerUpload;
