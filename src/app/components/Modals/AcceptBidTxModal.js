// REACT
import React, { useEffect, useState } from "react";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Badge from "@material-ui/core/Badge";
import axios from "axios";


// CUSTOM MATERIAL UI STYLING
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "#000",
    marginTop: "70px",
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
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    textAlign: "center",
  },
  wrapper: {
    // padding: "8px 16px 16px",
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
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiBadge: {
      anchorOriginTopRightRectangle: {
        transform: "none",
        transformOrigin: "unset",
      },
      colorPrimary: {
        color: "#000",
        backgroundColor: "#fff",
      },
      badge: {
        position: "unset",
        marginLeft: "8px",
      },
    },
    MuiAccordion: {
      root: {
        minWidth: "350px",
        backgroundColor: "#000",
      },
    },
    MuiAccordionSummary: {
      root: {
        // borderBottom: "1px solid #fff",
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

let data = {
  gasPriceInGwei: "20",
  totalCostInWei: "20000000000",
  estimatedTimeInSec: 123654,
  slippage: 10, // in percentage
  collections: {
    noOfTxs: 1,
    totalCollectionsToCreate: 1,
    gasUsed: 123456,
    totalCostInWei: "20000000000",
  },
  nfts: {
    noOfTxs: 0,
    totalNftsToMint: 1,
    MuiAccordion: {
      root: {},
    },
    gasUsed: 123456,
    totalCostInWei: "20000000000",
  },
  approval: {
    noOfTxs: 1,
    gasUsed: 123456,
    totalCostInWei: "20000000000",
  },
  drop: {
    noOfTxs: 1,
    gasUsed: 123456,
    totalCostInWei: "20000000000",
  },
};

console.log("json: ", data);

//   COMPONENT FUNCTION
const AcceptBidTxModal = (props) => {
  // States
  const [expanded, setExpanded] = useState("panel1");
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

  // Handlers
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleBuyCrypto = () => {
    if (disabled) {
      console.log("Buy Crypto!");
      setTimeout(() => {
        setDisabled(false);
      }, 10000);
    } else console.log("why are you so greedy?");
  };

  const getTxSummary = (dropId) => {
    
    axios.get(`drop/${dropId}/tx-cost-summary`).then(
      (response) => {
        console.log("response", response);
        data.collections.noOfTxs = response.data.collectionTxSummary.txsCount;
        data.collections.totalCollectionsToCreate = response.data.collectionTxSummary.collectionCount;
        data.nfts.noOfTxs = response.data.NFTsTxSummary.txsCount;
        data.nfts.totalNftsToMint = response.data.NFTsTxSummary.NFTCount;
        data.approval.noOfTxs = response.data.approvalTxSummary.txsCount;
        data.drop.noOfTxs = response.data.dropTxSummary.txsCount;
        
        
      
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            // setMsg(error.response.data.message);
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
        } else {
          // setMsg("Unknown Error Occured, try again.");
        }
        // setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    clearTimeout();
    console.log("Props : ", props);
    // getTxSummary(props.dropId);
  }, []);

  return (
    <div>
      <ThemeProvider theme={makeTheme}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div className={classes.paper}>
              <div className="row no-gutters mb-3">
                <div className="col-12 align-self-center">
                  <Typography
                    variant="h4"
                    //   component="h6"
                    className={classes.cardHeading}
                  >
                    Purchase Summary
                  </Typography>
                </div>
              </div>
              {/* Gas Price */}
              {/* <div
                className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
              >
                <div className="col-8 align-self-center">
                  <Typography
                    variant="h6"
                    //   component="h6"
                    className={classes.cardTitle}
                  >
                    Gas Price in Gwei:
                  </Typography>
                </div>
                <div className="col-4 align-self-center text-right p-0">
                  <p
                    className={classes.cardTitle}
                    //   style={{ lineHeight: "1.6" }}
                  >
                    {response.gasPriceInGwei}
                  </p>
                </div>
              </div> */}
              {/* <Divider /> */}
              {/* Slippage */}
              {/* <div
                className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
              >
                <div className="col-8 align-self-center">
                  <Typography
                    variant="h6"
                    //   component="h6"
                    className={classes.cardTitle}
                  >
                    Slippage:
                  </Typography>
                </div>
                <div className="col-4 align-self-center text-right p-0">
                  <p
                    className={classes.cardTitle}
                    //   style={{ lineHeight: "1.6" }}
                  >
                    {response.slippage}
                  </p>
                </div>
              </div>
              <Divider /> */}
              {/* COLLECTIONS */}
              
              <Divider />
              {/* NFTs */}
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Accept Bid On NFT <Badge badgeContent={4} color="primary" />
                  </Typography>
                </AccordionSummary>
                {/* Number of Tx */}
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        //   component="h6"
                        className={classes.cardTitle}
                      >
                        Number of Transactions
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                        //   style={{ lineHeight: "1.6" }}
                      >
                        {1} 
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
                {/* <Divider /> */}
                {/* Total NFTs to Mint */}
                
                {/* <Divider /> */}
                {/* Gas Used */}
                {/* <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        //   component="h6"
                        className={classes.cardTitle}
                      >
                        gas used:
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                        //   style={{ lineHeight: "1.6" }}
                      >
                        {response.collections.gasUsed}
                      </p>
                    </div>
                  </div>
                </AccordionDetails> */}
                {/* <Divider /> */}
                {/* Total Cost in Wei */}
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        //   component="h6"
                        className={classes.cardTitle}
                      >
                        Estimated Gas
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                        //   style={{ lineHeight: "1.6" }}
                      >
                        {props.isOpen ? (props.dropData.data.estimatedGas) : (2150)}
                        
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Divider />
              {/* APPROVAL */}
              {/* <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Approval</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                      >
                        Number of Transactions:
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                      >
                        {response.collections.noOfTxs}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
                <Divider />
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                      >
                        gas used:
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                      >
                        {response.collections.gasUsed}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
                <Divider />
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                      >
                        total cost in wei:
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p
                        className={classes.cardTitle}
                      >
                        {response.collections.totalCostInWei}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
                <Divider />
              </Accordion> */}
              {/* DROP */}
              
              <Divider />
              <div className="mt-5">
                {/* Total Cost */}
                <div
                  className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
                >
                  <div className="col-8 align-self-center">
                    <Typography
                      variant="h6"
                      //   component="h6"
                      className={classes.cardTitle}
                    >
                      total cost
                    </Typography>
                  </div>
                  <div className="col-4 align-self-center text-right p-0">
                    <p
                      className={classes.cardTitle}
                      //   style={{ lineHeight: "1.6" }}
                    >
                      $115,780.00
                      {/* {response.totalCostInWei} */}
                    </p>
                  </div>
                </div>

                {/* Estimated Time in Sec */}
                <div
                  className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
                >
                  <div className="col-8 align-self-center">
                    <Typography
                      variant="h6"
                      //   component="h6"
                      className={classes.cardTitle}
                    >
                      Estimated Time
                    </Typography>
                  </div>
                  <div className="col-4 align-self-center text-right p-0">
                    <p
                      className={classes.cardTitle}
                      //   style={{ lineHeight: "1.6" }}
                    >
                      1min 30sec
                      {/* {response.estimatedTimeInSec} */}
                    </p>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="row no-gutters justify-content-center justify-content-sm-between align-items-center mt-5">
                <div className="col-12 col-sm-6 pr-sm-2">
                  <button className={classes.buttons} onClick={props.handlePay}>
                    Pay
                  </button>
                </div>
                <div className="col-12 col-sm-6 pl-sm-2">
                  {disabled ? (
                    <button
                      className={classes.buttonDisabled}
                      onClick={() => console.log("Active!")}
                      disabled
                    >
                      Accept Bid
                    </button>
                  ) : (
                    <button
                      className={classes.buttons}
                      onClick={(e) => {props.handleAcceptBid(e)}}
                    >
                      Accept Bid
                    </button>
                  )}
                </div>
                <div className="col-12 mt-2 text-center">
                  {disabled && (
                    <Alert
                      variant="outlined"
                      severity="warning"
                      style={{ border: "none", justifyContent: "center" }}
                    >
                      You do not have enough Crypto!
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default AcceptBidTxModal;
