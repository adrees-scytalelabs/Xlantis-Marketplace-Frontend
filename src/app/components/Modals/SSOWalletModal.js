import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmailIcon from '@mui/icons-material/Email';
import { Backdrop, Fade, Grid, Modal, ThemeProvider, Typography, createTheme } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  gridRoot: {
    flexGrow: 1,
    marginTop: "8px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "1px solid #fff",
    borderRadius: 5,
    backgroundColor: "#000",
    "&:focus-visible": {
      outline: "none",
    },
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "inter",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    lineHeight: "1.2",
    fontSize: "14px",
  },
  cardHeading: {
    color: "#000",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    padding: "20px 0px",
    backgroundColor: "#fff",
    width: "100%",
    border: "1px solid white",
  },
  wrapper: {
    padding: "4px 0px",
  },
  buttons: {
    padding: "6px",
    width: "100%",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    color: "#fff",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
  buttonDisabled: {
    padding: "6px",
    width: "100%",
    backgroundColor: "#111",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    color: "#777",
    fontFamily: "orbitron",
    cursor: "default !important",
  },
  loginType: {
    margin: "8px 0 0 0",
    textAlign: "center",
  },
}

const makeTheme = createTheme({
  overrides: {
    MuiAccordion: {
      root: {
        minWidth: "350px",
        backgroundColor: "#000",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: 0,
      },
      content: {
        margin: "16px 0 0 0",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "4px 0px",
      },
    },
    MuiIconButton: {
      root: {
        color: "#fff",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
});

const SSOWalletModal = (props) => {

  const [expanded, setExpanded] = useState("panel1");
  const [disabled, setDisabled] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <ThemeProvider theme={makeTheme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        disableScrollLock={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div sx={styles.paper}>
            <div className="row no-gutters ssoModalwrapper">
              <div className="col-12">
                <Typography variant="h5" sx={styles.cardHeading}>
                  Welcome back!
                </Typography>
              </div>
            </div>
            <div className="SSOModalbg">
              <div className="row no-gutters w-100">
                <div className="col-12">
                  <Typography variant="body2">Continue with</Typography>
                </div>
              </div>
              <Grid container sx={styles.gridRoot} spacing={1}>
                <Grid item xs={12} sm={6}>
                  <button
                    className="ssoModalCard"
                    onClick={() => {
                      props.openWorkProgressModal();
                    }}
                  >
                    <div className="row no-gutters justify-content-center align-items-center w-100">
                      <div className="col-12 text-center">
                        <AccountBalanceWalletIcon />
                      </div>
                      <div className="col-12">
                        <Typography
                          variant="body1"
                          sx={styles.loginType}
                        >
                          Wallet
                        </Typography>
                      </div>
                    </div>
                  </button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link to="/user-account">
                    <button className="ssoModalCard">
                      <div className="row no-gutters justify-content-center align-items-center w-100">
                        <div className="col-12 text-center">
                          <EmailIcon />
                        </div>
                        <div className="col-12">
                          <Typography
                            variant="body1"
                            sx={styles.loginType}
                          >
                            Email
                          </Typography>
                        </div>
                      </div>
                    </button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default SSOWalletModal;
