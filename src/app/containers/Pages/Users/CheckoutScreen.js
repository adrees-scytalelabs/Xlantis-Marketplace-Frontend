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
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

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
  const [country, setCountry] = useState("");
  const classes = useStyles();

  //   Handlers
  const selectCountry = (val) => {
    setCountry(val);
  };

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
          <div className="container pt-4">
            <div className="row no-gutters justify-content-center align-items-center w-100 mt-5">
              <div className="col-12 text-center mb-5">
                <Typography variant="h5" className={classes.mainHeading}>
                  CHECKOUT
                </Typography>
                {/* <Divider className={classes.divider} /> */}
              </div>
            </div>

            {/* Content */}
            <div className="row no-gutters justify-content-center mb-5">
              <Grid container spacing={3} style={{ paddingtop: "16px" }}>
                <Grid item xs={12} md={8}>
                  <form action="" autoComplete="off">
                    <h2>Billing Details</h2>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        {/* 
                          <div className="form-group"> */}
                        <label>First Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label>First Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Country</label>
                        <div className="form-group newNftWrapper checkoutCountryWrapper">
                          <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)}
                          />
                          {/* <input
                            type="text"
                            required
                            // value={name}
                            placeholder="First Name"
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          /> */}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Street Address</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Town/City</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>State/County</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            // required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Zip/Postcode</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="number"
                            required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Company Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            // required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Appartment Address</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            // required
                            // value={name}
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                              // setName(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <h2>You Order</h2>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <Divider className={classes.divider} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default CheckoutScreen;
