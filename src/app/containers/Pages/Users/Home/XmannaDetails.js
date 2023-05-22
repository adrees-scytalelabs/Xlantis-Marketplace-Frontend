import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/mediaQueries.css";
import videoBg from "../../../../assets/img/Seoul - 21116.mp4";
import INXWebsiteBanner from '../../../../assets/img/INXWebsiteBanner.png'
import XLogo from '../../../../assets/img/XLogo.jpg'
import { InputBase } from "@mui/material";

import { Box, Paper, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { useMedia } from 'react-use';


function XmannaDetails() {
  const min600 = useMedia('(min-width: 600px)');
  const min700 = useMedia('(min-width: 700px)');
  const min800 = useMedia('(min-width: 800px)');
  const min900 = useMedia('(min-width: 900px)');

  return (
    <div id="hBanner" >
      <div className="row">
        <div className="col-12 col-md-12 text-md-center text-center">

          <div style={{ marginTop:min900?"30px": min600?'130px':"30px" }}>
            <Paper sx={{ margin: '10px', paddingTop: '20px', paddingBottom: '20px', borderRadius: '25px', border: "2px solid black", bgcolor: "rgba(54,54,54,255)", }}>
              <Typography
                // className="vertical-center"
                variant={min900 ? "h4" : min800 ? "h4" : min700 ? "h5" : "h6"}
                component="div"
                sx={{ fontStyle: 'italic', fontFamily: "Jost", color: '#fff', fontWeight: 1000, }}
              >
                XMANNA - A B2B2C SAAS PROVIDER FOCUSED ON ENHANCING THE USER EXPERIENCE THROUGH

              </Typography>
              <Typography
                // className="vertical-center"
                variant={min900 ? "h4" : min800 ? "h4" : min700 ? "h5" : "h6"}
                component="div"
                sx={{ fontStyle: 'italic', paddingTop: '40px', fontFamily: "Jost", color: '#fff', fontWeight: 1000, }}
              >
                ENGAGEMENT, REWARDS, AND GAMIFICATION  THROUGH MOBILE APPLICATIONS, GAMES AND THE METAVERSE.
              </Typography>


            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XmannaDetails;
