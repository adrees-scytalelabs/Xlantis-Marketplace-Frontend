import React from "react";

function DropBanner({ bannerURL, titleURL }) {
  return (
    <div className="row no-gutters">
      <div className="col-12">
        <div className="bannerWrapper">
          <img src={bannerURL} className="bannerImg" alt="Drop banner" />
          <div className="dropThumbWrapper">
            <img src={titleURL} className="thumbImg" alt="drop thumb" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropBanner;
