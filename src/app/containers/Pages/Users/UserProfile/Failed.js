import React, { useEffect, useState } from "react";
// REACT ROUTER
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";

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
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const customTheme = createMuiTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "black",
      },
      expandIcon: {
        color: "white",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "8px 0px 16px",
        backgroundColor: "black",
      },
    },
    MuiOutlinedInput: {
      input: {
        border: "1px solid white",
        color: "white",
        borderRadius: "5px",
        padding: "16px 14px",
      },
    },
    MuiCardContent: {
      root: {
        padding: "16px 0px",
      },
    },
  },
});

function Failed() {
  const classes = useStyles();
  let history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    history.push("/")
  };
  return (
    <>
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} role={null} />
      </div>
      <ThemeProvider theme={customTheme}></ThemeProvider>
      <div className="">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" style={{color:'black'}}>NFT Purchase</h2>
              <p id="transition-modal-description" style={{color:"black"}}>
                Something went wrong. Try again
              </p>
              <button onClick={handleClose}>Close</button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Failed;
