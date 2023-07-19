import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const SingleNFTDetailCard = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: "#000",
        border: "1px solid #fff",
      }}
    >
      <CardContent sx={{ color: "#fff" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {props.nftDetail.title}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Description </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {props.nftDetail.description}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Total Supply </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {props.nftDetail.totalSupply}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Available Supply </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {props.nftDetail.totalSupply - props.supply}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Supply Sold </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {props.supply}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleNFTDetailCard;
