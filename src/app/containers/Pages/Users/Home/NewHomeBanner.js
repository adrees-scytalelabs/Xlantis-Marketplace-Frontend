import { Grid, InputBase } from "@mui/material";
import React, { useState } from "react";
import "../../../../assets/css/mediaQueries.css";
import INXWebsiteBanner from '../../../../assets/img/INXWebsiteBanner.png';
import XLogo from '../../../../assets/img/XLogo.jpg';

import { Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMedia } from 'react-use';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(3, 0, 3, 1),
    margin: '10px',
    fontWeight: 1000, fontFamily: "Jost",
    fontSize: "30px",
    border: '1px solid black',
    borderRadius: '25px',
    backgroundColor: "rgba(229,229,229,255)",
    transition: theme.transitions.create('width'),
    height: '12px',
    '&::placeholder': {
      letterSpacing: '2px',
      fontWeight: 1000, fontFamily: "Jost",
      fontSize: "30px"
    },
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));
function HomeBanner() {
  const [titleImage, setTitleImage] = useState(XLogo);
  const [bannerImage, setBannerImage] = useState(INXWebsiteBanner);
  const min600 = useMedia('(min-width: 600px)');
  const min700 = useMedia('(min-width: 700px)');
  const min800 = useMedia('(min-width: 800px)');
  const min900 = useMedia('(min-width: 900px)');
  return (
    <div id="hBanner" >
      <div className="row no-gutters">
        <div className="col-12">
          <div className="bannerWrapperHome">
            <img src={bannerImage} className="bannerImgHome" />
            <div className="dropThumbWrapperHome">
              <img src={titleImage} className="thumbImgHome" />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 text-md-right text-right margin-bottom">
          <div style={{ width: min700 ? "60%" : min600 ? "50%" : '30%', float: min600 ? "right" : "left", marginRight: '20px' }} className="text-right">
            <Paper sx={{ display: { xs: 'none', md: 'block' }, margin: "10px", borderRadius: '25px', border: "2px solid black", bgcolor: "rgba(54,54,54,255)", width: "100%", height: '90px' }}>
              <Grid container spacing={2} >
                <Grid item xs={12} md={6}>
                  <Typography
                    className="vertical-center"
                    variant={min900 ? "h3" : min800 ? "h3" : min700 ? "h4" : "h5"}
                    component="div"
                    sx={{ fontFamily: "Jost", padding: '18px 18px 18px 40px', float: 'left', color: '#fff', fontWeight: 1000, }}
                  >
                    MENU
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <StyledInputBase
                    sx={{ width: min900 ? "80%" : "100%" }}
                    placeholder="SEARCH"
                    inputProps={{ 'aria-label': 'Search' }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </div >
  );
}

export default HomeBanner;
