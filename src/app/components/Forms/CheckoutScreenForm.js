import React from 'react'
import Grid from "@material-ui/core/Grid";
import { CountryDropdown } from "react-country-region-selector";

function CheckoutScreenForm({classes,selectCountry,country}) {
  return (
    <div>
        <form action="" autoComplete="off" className="checkoutForm">
                    <h4 className={classes.formHeadings}>Billing Details</h4>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <label>First Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
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
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
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
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Street Address</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            required
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
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
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>State/County</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
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
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Company Name</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <label>Appartment Address</label>
                        <div className="form-group newNftWrapper">
                          <input
                            type="text"
                            placeholder=""
                            className="form-control-login -login newNftInput w-100"
                            onChange={(e) => {
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </form>
    </div>
  )
}

export default CheckoutScreenForm