import { ThemeProvider, createTheme } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import CheckoutScreenForm from "../../../components/Forms/CheckoutScreenForm";
import CheckoutScreenTable from "../../../components/tables/CheckoutScreenTable";

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
                  <CheckoutScreenForm classes={classes} country={country} selectCountry={selectCountry} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <h4 className={classes.formHeadings}>You Order</h4>
                      <CheckoutScreenTable classes={classes} />
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
