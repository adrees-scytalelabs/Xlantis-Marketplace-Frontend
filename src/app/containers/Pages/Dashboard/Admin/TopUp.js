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

function TopUp(props) {
  const { enqueueSnackbar } = useSnackbar();
  let { path } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0.1);

  const classes = useStyles();
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      newDrop: "",
      newCube: "",
      mySeason: "",
      myCubes: "",
      myDrops: "",
      myNFTs: "",
      newCollection: "",
      orders: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newRandomDrop: "",
      topUp: "active",
    }); 
  }, []);
  const handleTopUpAmount = (e) => {
    e.preventDefault();
    let data = {
      amount: amount,
    };
    axios.post(`/usd-payments/admin/topup`, data).then(
      (response) => {
        console.log("response of top up amount", response);
        window.location.replace(response.data.sessionUrl)
        
        
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        }
      }
    );
  };

  return (
    <div className="backgroundDefault">
      
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Top Up</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Top Up</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <label>Select your Top Up Amount</label>
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
              min={0.1}
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
              onClick={(e) => handleTopUpAmount(e)}
              style={{ backgroundColor: "black",float:'right' }}
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

export default TopUp;
