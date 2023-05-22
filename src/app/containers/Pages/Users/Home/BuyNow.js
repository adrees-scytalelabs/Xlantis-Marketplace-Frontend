import { Grid, InputBase } from "@mui/material";
import React, { useState } from "react";
import "../../../../assets/css/mediaQueries.css";
import BuyNowImage from '../../../../assets/img/BuyNow.png';
import XLogo from '../../../../assets/img/XLogo.jpg';

import { Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMedia } from 'react-use';

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
