import React, { useState } from "react";
import "../../../../assets/css/mediaQueries.css";
import { BuyNowImage } from "../../../../components/ImageURLs/URLs";

function BuyNow() {
  const [bannerImage, setBannerImage] = useState(BuyNowImage);
  
  return (
    <div id="hBanner" >
      <div className="row no-gutters">
        <div className="col-12">
          <div className="bannerWrapperBuyNow">
            <img src={bannerImage} className="bannerImgHome" />
          </div>
        </div>
      </div>
    </div >
  );
}

export default BuyNow;
