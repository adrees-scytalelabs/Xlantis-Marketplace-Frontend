import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const FixedDropSingleNFTCard = (props) => {
  let incNum = (max) => {
    if (props?.singleNFTPrice * Number(props?.num + 1) > 999999.99) {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage(
        "Total buying price cannot be greater than $999,999.99"
      );
      props?.setSnackbarOpen(true);
    } else {
      if (props?.num < max) {
        props?.setNum(Number(props?.num) + 1);
      } else {
        props?.setSnackbarSeverity("error");
        props?.setSnackbarMessage("Value can't be greater than token supply");
        props?.setSnackbarOpen(true);
      }
    }
  };

  let decNum = () => {
    if (props?.num > 1) {
      props?.setNum(props?.num - 1);
    } else {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage("Value can't be negative");
      props?.setSnackbarOpen(true);
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const char = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(char)) {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage("Value must be greater than zero");
      props?.setSnackbarOpen(true);
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      props?.setNum(value);
    } else if (value < 1) {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage("Value must be greater than or equal to 1");
      props?.setSnackbarOpen(true);
    } else if (value > props?.orderListing?.supply) {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage("Value can't be greater than token supply");
      props?.setSnackbarOpen(true);
    } else if (props?.singleNFTPrice * value > 999999.99) {
      props?.setSnackbarSeverity("error");
      props?.setSnackbarMessage(
        "Total buying price cannot be greater than $999,999.99"
      );
      props?.setSnackbarOpen(true);
    } else {
      props?.setNum(value);
    }
  };
  return (
    <Card style={{ backgroundColor: "#000" }}>
      <CardContent>
        <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Typography
              className=""
              variant="body1"
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props?.nftData?.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Typography
              variant="body1"
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
            md={4}
            lg={4}
            xl={3}
            style={{
              color: "white",
              fontFamily: "inter",
              fontSize: "1rem",
            }}
          >
            {props?.nftData?.description}
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Price </strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            style={{
              color: "white",
              fontFamily: "inter",
              fontSize: "1rem",
            }}
          >
            {props?.price} USD
          </Grid>
        </Grid>
        {props?.nftData?.supplyType ? (
          <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Typography
                variant="body1"
                component="p"
                style={{
                  color: "#F64D04",
                  fontFamily: "orbitron",
                }}
              >
                <strong>Supply Type </strong>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props?.nftData?.supplyType ? props?.nftData?.supplyType : null}
            </Grid>
          </Grid>
        ) : null}
        {props?.nftData?.currentOrderListingId?.supply ? (
          <>
            <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{
                    color: "#F64D04",
                    fontFamily: "orbitron",
                  }}
                >
                  <strong>Total Supply </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                style={{
                  color: "white",
                  fontFamily: "inter",
                  fontSize: "1rem",
                }}
              >
                {props?.nftData?.currentOrderListingId?.totalSupplyOnSale}
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{
                    color: "#F64D04",
                    fontFamily: "orbitron",
                  }}
                >
                  <strong>Available Supply </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                style={{
                  color: "white",
                  fontFamily: "inter",
                  fontSize: "1rem",
                }}
              >
                {props?.nftData?.currentOrderListingId?.supply}
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ paddingBottom: "5px" }}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{
                    color: "#F64D04",
                    fontFamily: "orbitron",
                  }}
                >
                  <strong>Supply Sold </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                style={{
                  color: "white",
                  fontFamily: "inter",
                  fontSize: "1rem",
                }}
              >
                {props?.nftData?.currentOrderListingId?.supplySold}
              </Grid>
            </Grid>
          </>
        ) : null}
        {props?.nftData?.supplyType === "Variable" ? (
          <Grid container spacing={1} style={{ paddingTop: "25px" }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              style={{ paddingTop: "15px" }}
            >
              <Typography
                variant="body1"
                component="p"
                style={{
                  color: "#F64D04",
                  fontFamily: "orbitron",
                }}
              >
                <strong>Select Supply </strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <div
                className="responsive-field"
                style={{ border: "1px solid red" }}
              >
                <button className="responsive-field-button" onClick={decNum}>
                  -
                </button>
                <input
                  className="input"
                  type="number"
                  value={props?.num ?? ""}
                  placeholder="1"
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  style={{ backgroundColor: "transparent" }}
                />
                <button
                  className="responsive-field-button"
                  style={{ backgroundColor: "transparent" }}
                  onClick={() =>
                    incNum(props?.nftData?.currentOrderListingId?.supply)
                  }
                >
                  +
                </button>
              </div>
            </Grid>
          </Grid>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default FixedDropSingleNFTCard;
