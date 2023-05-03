import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Backdrop, Badge, Divider, Fade, Modal, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useEffect, useState } from "react";
import { getDropTxCostSummary } from "../API/AxiosInterceptor";
const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "1px solid #fff",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
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
}

const makeTheme = createTheme({
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
  slippage: 10,
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

//console.log("json: ", data);

const BuyTxModal = (props) => {
  const [expanded, setExpanded] = useState("panel1");
  const [disabled, setDisabled] = useState(false);

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
    getDropTxCostSummary(dropId)
      .then((response) => {
        data.collections.noOfTxs = response.data.collectionTxSummary.txsCount;
        data.collections.totalCollectionsToCreate =
          response.data.collectionTxSummary.collectionCount;
        data.nfts.noOfTxs = response.data.NFTsTxSummary.txsCount;
        data.nfts.totalNftsToMint = response.data.NFTsTxSummary.NFTCount;
        data.approval.noOfTxs = response.data.approvalTxSummary.txsCount;
        data.drop.noOfTxs = response.data.dropTxSummary.txsCount;
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    clearTimeout();
  }, []);

  return (
    <div>
      <ThemeProvider theme={makeTheme}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          sx={styles.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div sx={styles.paper}>
              <div className="row no-gutters mb-3">
                <div className="col-12 align-self-center">
                  <Typography variant="h4" sx={styles.cardHeading}>
                    Purchase Summary
                  </Typography>
                </div>
              </div>

              <Divider />

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={styles.heading}>
                    Payment Token Approval <Badge badgeContent={4} color="primary" />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography variant="h6" sx={styles.cardTitle}>
                        Number of Transactions
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p sx={styles.cardTitle}>
                        {1}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography variant="h6" sx={styles.cardTitle} >
                        Total Approval
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p sx={styles.cardTitle}>
                        {1}

                      </p>
                    </div>
                  </div>
                </AccordionDetails>

                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography variant="h6" sx={styles.cardTitle}>
                        Estimated Gas
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p sx={styles.cardTitle}>
                        {props.isOpen ? (props.dropData.data[0].estimatedGas) : (2150)}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Divider />

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={styles.heading}>Purchase NFT</Typography>
                </AccordionSummary><AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography
                        variant="h6"

                        sx={styles.cardTitle}
                      >
                        Number of Transactions
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p style={styles.cardTitle}>
                        {1}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>

                <AccordionDetails>
                  <div className="row no-gutters justify-content-between w-100">
                    <div className="col-8 align-self-center">
                      <Typography variant="h6" sx={styles.cardTitle}>
                        Estimated Gas
                      </Typography>
                    </div>
                    <div className="col-4 align-self-center text-right p-0">
                      <p sx={styles.cardTitle}>
                        {props.isOpen ? (props.dropData.data[1].estimatedGas) : (1129)}
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Divider />
              <div className="mt-5">
                <div
                  className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                >
                  <div className="col-8 align-self-center">
                    <Typography variant="h6" sx={styles.cardTitle} >
                      total cost
                    </Typography>
                  </div>
                  <div className="col-4 align-self-center text-right p-0">
                    <p sx={styles.cardTitle}>
                      $115,780.00
                    </p>
                  </div>
                </div>
                <div
                  className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                >
                  <div className="col-8 align-self-center">
                    <Typography variant="h6" sx={styles.cardTitle}>
                      Estimated Time
                    </Typography>
                  </div>
                  <div className="col-4 align-self-center text-right p-0">
                    <p sx={styles.cardTitle}>
                      1min 30sec
                    </p>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="row no-gutters justify-content-center justify-content-sm-between align-items-center mt-5">
                <div className="col-12 col-sm-6 pr-sm-2">
                  <button sx={styles.buttons} onClick={props.handlePay}>
                    Pay
                  </button>
                </div>
                <div className="col-12 col-sm-6 pl-sm-2">
                  {disabled ? (
                    <button
                      sx={styles.buttonDisabled}
                      onClick={() => console.log("Active!")}
                      disabled
                    >
                      Buy
                    </button>
                  ) : (
                    <button
                      sx={styles.buttons}
                      onClick={(e) => { props.handleBuy(e) }}
                    >
                      Buy
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

export default BuyTxModal;
