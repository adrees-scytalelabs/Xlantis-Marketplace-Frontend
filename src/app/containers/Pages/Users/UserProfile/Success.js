import React, { useEffect, useState } from "react";
// REACT ROUTER
import {
  useParams,
  useHistory,
  useLocation,
  Redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import transakSDK from "@transak/transak-sdk";
import DropFactory721 from "../../../../components/blockchain/Abis/DropFactory721.json";
import DropFactory1155 from "../../../../components/blockchain/Abis/DropFactory1155.json";

import ERC20SaleDrop from "../../../../components/blockchain/Abis/ERC20SaleDrop.json";
import Collectible721 from "../../../../components/blockchain/Abis/Collectible721.json";

import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import { useSnackbar } from "notistack";
import BuyTxModal from "../../../../components/Modals/BuyTxModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ReactTooltip from "react-tooltip";
// MUI
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import { Col, Row, Table } from "react-bootstrap";
// COMPONENTS
import HeaderHome from "../../../../components/Headers/Header";
import Web3 from "web3";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import DateTimePicker from "react-datetime-picker";
import ListIcon from "@material-ui/icons/List";
import Footer from "../../../../components/Footers/Footer";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  mainInfoHeading: {
    fontFamily: "orbitron",
    fontWeight: "bold",
    color: "#009850",
    textAlign: "center",
  },
  infoIcon: {
    fontSize: "3rem",
    color: "#F64D04",
  },
  infoMessage: {
    marginTop: "16px",
    padding: "8px",
    textAlign: "center",
  },
  infoOK: {
    color: "#009850",
    marginLeft: "5px",
  },
}));

function Success() {
  const classes = useStyles();
  let history = useHistory();
  return (
    <>
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} role={null} />
      </div>
      <div className="main-wrapper">
        <div className="container px-md-0">
          <div
            className="row no-gutters justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-md-6">
              <div className="redirectInfoBoxWrapper">
                {/* <Typography variant="h3" className={classes.mainInfoHeading}>
                  <InfoIcon className={classes.infoIcon} /> Information
                </Typography> */}
                <Typography variant="h3" className={classes.mainInfoHeading}>
                  Payment Successful!{" "}
                  <CheckCircleIcon className={classes.infoOK} />
                </Typography>
                <div className="row no-gutters justify-content-end align-items-center w-100 mt-4 detailRedirectWrapper border-0">
                  <Link to="/" className="w-100">
                    <button>OK</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
