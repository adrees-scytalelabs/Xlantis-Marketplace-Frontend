import { Avatar, CardHeader, Grid } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tooltip: {
    fontSize: "16px",
  },
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
    MuiRadio: {
      root: {
        color: "white",
      },
    },
  },
});

function PlatformFee(props) {
  const { enqueueSnackbar } = useSnackbar();
  let { path } = useRouteMatch();
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const classes = useStyles();
  useEffect(() => {
    if (props.tab === 1) {
      setValue(1);
      props.setTab(0);
    }
    if (props.tab === 2) {
      setValue(2);
      props.setTab(0);
    }
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties:"",
      template:"",
      saved:"",
      platformFee:"active",
    }); 
  }, []);
  

  return (
    <div className="backgroundDefault">
      
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Platform Fee</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Platform Fee</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <label>Select your Platform Fee</label>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <input
              type="number"
              required
              value={amount}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={1}

              style={{ backgroundColor: "black", color: "white" }}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <button
              className="newTemplateBtn mb-3"
              style={{ backgroundColor: "black", float: "right" }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default PlatformFee;
