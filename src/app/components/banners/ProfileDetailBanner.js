import React from 'react'
import { Spinner } from "react-bootstrap";
import Edit from "@material-ui/icons/Edit";

function ProfileDetailBanner({
  bannerImage,
  isUploadingBannerIPFS,
  onChangeBannerFile,
  profileImage,
  isUploadingIPFS,
  onChangeFile
}) {
  return (
    <div>
        <div className="row no-gutters">
        <div className="col-12">
          <div
            className="banner-img"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            {isUploadingBannerIPFS ? (
              <div
                className="text-center"
                style={{ position: "relative", top: "150px", right: "10px" }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#FFFFFF" }}
                ></Spinner>
              </div>
            ) : (
              <label htmlFor="banner-file-input" className="banner-input-label">
                <div className="banner-dark-layer">
                  <Edit fontSize="large" id="banner-icon" />
                </div>
              </label>
            )}

            <input
              id="banner-file-input"
              type="file"
              onChange={onChangeBannerFile}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${profileImage})`,
              marginLeft: "1%",
            }}
            className="profile-backgrnd"
          >
            {isUploadingIPFS ? (
              <div
                className="text-center"
                style={{ position: "relative", top: "70px" }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#FFFFFF" }}
                ></Spinner>
              </div>
            ) : (
              <label
                htmlFor="profile-file-input"
                className="profile-input-label"
              >
                <div className="profile-dark-layer">
                  <Edit fontSize="medium" id="profile-icon" />
                </div>
              </label>
            )}

            <input
              id="profile-file-input"
              type="file"
              onChange={onChangeFile}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetailBanner