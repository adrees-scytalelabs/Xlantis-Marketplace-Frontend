import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const AuctionNFTDetailCard = (props) => {
  return (
    <Card style={{ backgroundColor: "#000" }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ color: "white", fontFamily: "inter" }}
          >
            {props.nftDetail.title}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Description </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ color: "white", fontFamily: "inter" }}
          >
            {props.nftDetail.description}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Total Supply </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ color: "white", fontFamily: "inter" }}
          >
            {props?.nftDetail?.currentOrderListingId?.totalSupplyOnSale}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Available Supply </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ color: "white", fontFamily: "inter" }}
          >
            {props?.nftDetail?.currentOrderListingId?.supply}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Supply Sold </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ color: "white", fontFamily: "inter" }}
          >
            {props?.nftDetail?.currentOrderListingId?.supplySold}
          </Grid>
        </Grid>
        {props.nftDetail.nftType === "1155" ? (
          <span>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ color: "#F64D04", fontFamily: "orbitron" }}
                >
                  <strong>Supply Type </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                style={{ color: "white", fontFamily: "inter" }}
              >
                {props.nftDetail.supplyType}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ color: "#F64D04", fontFamily: "orbitron" }}
                >
                  <strong>Token Supply </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                style={{ color: "white", fontFamily: "inter" }}
              >
                {props.nftDetail.tokenSupply}
              </Grid>
            </Grid>
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AuctionNFTDetailCard;
