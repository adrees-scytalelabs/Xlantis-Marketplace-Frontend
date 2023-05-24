import React, { useState } from "react";
import "../../../../assets/css/mediaQueries.css";

import { Box, Grid, Paper } from "@mui/material";
import { useMedia } from 'react-use';
import { Avatar, BuyNowImage, Goblin, XmannaMysteryBox, XmannaSkyBox } from "../../../../components/ImageURLs/URLs";

function HomeCards() {
  const [bannerImage, setBannerImage] = useState(BuyNowImage);
  const min600 = useMedia('(min-width: 600px)');
  const min700 = useMedia('(min-width: 700px)');
  const min800 = useMedia('(min-width: 800px)');
  const min900 = useMedia('(min-width: 900px)');
  return (
    <div className="row">
      <div className="col-12 col-md-12 text-md-center text-center">

        <div style={{ margin: '60px 20px 90px 10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: '25px', border: "4px solid #ff0000",
                }}
                alt="Mystery Boxes"
                src={XmannaMysteryBox}
              />
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: '25px', border: "4px solid #00ffff",
                }}
                alt="Goblin"
                src={Goblin}
              />
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: '25px', border: "4px solid #00ffff",
                }}
                alt="Avatar"
                src={Avatar}
              />
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: '25px', border: "4px solid #ff0000",
                }}
                alt="Sky Boxes"
                src={XmannaSkyBox}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div >
  );
}

export default HomeCards;
