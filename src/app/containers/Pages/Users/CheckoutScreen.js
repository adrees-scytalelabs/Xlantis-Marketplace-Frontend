import { ThemeProvider, createTheme } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";

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
    margin: "16px 0px",
  },
  formHeadings: {
    margin: "24px 0px",
    fontFamily: "orbitron",
    fontWeight: "bold",
  },
  table: {
    minWidth: "320px",
    border: "none",
  },
  tableBodyCell: {
    paddingTop: "16px",
  },
  subtotal: {
    paddingTop: "16px",
    fontWeight: "bold",
  },
  total: {
    paddingTop: "16px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  checkoutPolicy: {
    color: "#F64D04",
    "&:hover": {
      color: "#F64D04",
    },
  },
  CheckoutBtn: {
    padding: "5px 16px",
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #f64d04",
    borderRadius: "0px 15px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
}));

const makeTheme = createTheme({
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255,255,255,0.45)",
      },
    },
    MuiTableFooter: {
      root: {
        backgroundColor: "white",
      },
    },
    MuiTableCell: {
      root: {
        paddingTop: "0px",
      },
      head: {
        color: "#fff",
        fontFamily: "inter",
        fontWeight: "bold",
      },
      body: {
        marginTop: "16px",
        color: "#fff",
      },
    },
    MuiGrid: {
      item: { width: "100%" },
    },
    MuiTableRow: {
    },
  },
});

const CheckoutScreen = () => {
  const [country, setCountry] = useState("");
  const [accepted, setAccepted] = useState(false);
  const classes = useStyles();
  const selectCountry = (val) => {
    setCountry(val);
  };

  const handleTermsAccepted = () => {
    setAccepted(!accepted);
  };
  return (
    <>
      <ThemeProvider theme={makeTheme}>
        <div className="main-wrapper">
          <div style={{ minHeight: "95px" }}>
            <HeaderHome selectedNav={"Market"} role={null} />
          </div>
          <div className="container py-4">
            <div className="row no-gutters justify-content-center align-items-center w-100 mt-5">
              <div className="col-12 text-center">
                <Typography variant="h5" className={classes.mainHeading}>
                  CHECKOUT
                </Typography>
              </div>
            </div>
            <Divider className={classes.divider} />
            <div className="row no-gutters justify-content-center mb-5 pb-5">
              <Grid container spacing={3} style={{ paddingtop: "16px" }}>
                <Grid item xs={12} md={8}>
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
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <h4 className={classes.formHeadings}>You Order</h4>
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell align="right">Subtotal</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              style={{ borderBottom: "2px solid black" }}
                            >
                              <TableCell className={classes.tableBodyCell}>
                                Common x3
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.tableBodyCell}
                              >
                                $115,780.00
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.tableBodyCell}>
                                Anciet x3
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.tableBodyCell}
                              >
                                $115,780.00
                              </TableCell>
                            </TableRow>
                            <TableRow
                              style={{ borderBottom: "2px solid black" }}
                            >
                              <TableCell className={classes.subtotal}>
                                Subtotal
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.tableBodyCell}
                              >
                                $115,780.00
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.total}>
                                Total
                              </TableCell>
                              <TableCell
                                align="right"
                                className={classes.total}
                              >
                                $115,780.00
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="row no-gutters mt-5 justif-content-center align-items-center">
                        <div className="col-12">
                          <Divider className={classes.divider} />
                          <Typography variant="body2">
                            Your Personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our{" "}
                            <Link to="/" className={classes.checkoutPolicy}>
                              privay policy
                            </Link>
                            .
                          </Typography>
                          <Divider className={classes.divider} />
                        </div>
                        <label
                          for="acceptedTerms"
                          className="checkoutAcceptedTermsCheckbox"
                        >
                          <input
                            type="checkbox"
                            id="acceptedTerms"
                            name="accepted the terms"
                            onChange={handleTermsAccepted}
                          />{" "}
                          I have read and agreed to the website{" "}
                          <Link className={classes.checkoutPolicy}>
                            terms and conditions*
                          </Link>
                        </label>

                      </div>
                      <div className="row no-gutters justify-content-center align-items-center mt-3">
                        <div className="col-12">
                          <button className={classes.CheckoutBtn}>
                            Place Order
                          </button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <Footer position={"relative"} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default CheckoutScreen;
