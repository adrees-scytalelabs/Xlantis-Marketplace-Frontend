// REACT
import React, { useEffect, useState } from "react";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// MUI GRID
import Grid from "@material-ui/core/Grid";
// COMPONENTS
import HeaderHome from "../../../components/Headers/Header";

// CUSTOM STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainHeading: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    textAlign: "center",
  },
  divider: {
    margin: "12px 0px",
  },
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255,255,255,0.45)",
      },
    },
  },
});

// COMPONENT FUNCTION
const CheckoutScreen = () => {
  // states
  const classes = useStyles();
  // content
  return (
    <>
      <ThemeProvider theme={makeTheme}>
        <div className="main-wrapper">
          {/* Header */}
          <div style={{ minHeight: "95px" }}>
            <HeaderHome selectedNav={"Market"} />
          </div>

          {/* Heading */}
          <div className="row no-gutters justify-content-center align-items-center w-100 mt-5">
            <div className="col-12 text-center">
              <Typography variant="h5" className={classes.mainHeading}>
                CHECKOUT
              </Typography>
              <Divider className={classes.divider} />
            </div>
          </div>
          <div className="container">
            {/* Content */}
            <div className="row no-gutters justify-content-center">
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <label>First Name</label>
                      <input type="text" placeholder="First Name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label>Last Name</label>
                      <input type="text" placeholder="Last Name" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <div className="row no-gutters">
                        <h4>Product</h4>
                        <h4>Details</h4>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default CheckoutScreen;
