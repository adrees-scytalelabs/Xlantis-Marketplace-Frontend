import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  createTheme,
  Divider,
  Fade,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

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
    marginLeft:'2%',
    marginRight:'2%'
  },
  root: {
    width: "100%",
    marginLeft:'2%',
    marginRight:'2%'
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
    marginLeft:'2%',
    marginRight:'2%'
  },
  paragraph:{
    color:'white'
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "inter",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    lineHeight: "1.2",
    fontSize: "14px",
    marginLeft:'2%',
    marginRight:'2%'
  },
  cardHeading: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    textAlign: "center",
    marginLeft:'2%',
    
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
};

const makeTheme = createTheme({
  components: {
    MuiBadge: {
      styleOverrides: {
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
          marginTop:'12px'
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          minWidth: "350px",
          backgroundColor: "#000",
          color:'white'
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          
        },
        content: {
          margin: "16px 0 0 0",
          
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color:'red'
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
});

const PublishDropModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [costInfo, setCostInfo] = useState({});
  const [amount, setAmount] = useState(5);
  const [topUpModal, setTopUpModal] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    if (props.cost.isTopupRequired === true) {
      let variant = "error";
      enqueueSnackbar(
        "Your account has insufficient funds for this transaction. Kindly top up your account.",
        { variant }
      );
    } else {
      props.handlePublish();
    }
  };
  useEffect(() => {
    clearTimeout();
  }, [props]);

  return (
    props.open === true && (
      <div className="mt-5">
        <ThemeProvider theme={makeTheme}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={styles.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            className="mt-5"
          >
            <Box className="mt-4" style={{backgroundColor:'black',border:'2px solid white'}}>
              <Fade in={props.open}>
                <div sx={styles.paper}>
                  <div className="row no-gutters mb-3 mt-2">
                    <div className="col-12 align-self-center">
                      <Typography variant="h4" sx={styles.cardHeading}>
                        Purchase Summary
                      </Typography>
                    </div>
                  </div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={styles.heading}>
                        Collections
                        <Badge
                          badgeContent={
                            props.dropData.collectionTxSummary.collectionCount
                          }
                          color="primary"
                        />
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
                          <p>
                            {props.dropData.collectionTxSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Total Collection(s) To Create
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p sx={styles.cardTitle}>
                            {props.dropData.collectionTxSummary.collectionCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div
                        className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                      >
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            sx={styles.cardTitle}
                            style={{ wordWrap: "break-word" }}
                          >
                            ${props.cost.estimates.collection}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Divider />
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={styles.heading}>
                        NFTs{" "}
                        <Badge
                          badgeContent={
                            props.dropData.NFTsTxSummary.NFTCount
                          }
                          color="primary"
                        />
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
                            {props.dropData.NFTsTxSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Total NFTs To Mint
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p sx={styles.cardTitle}>
                            {props.dropData.NFTsTxSummary.NFTCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div
                        className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                      >
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            sx={styles.cardTitle}
                            style={{ wordWrap: "break-word" }}
                          >
                            ${props.cost.estimates.nftMint}
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
                      expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={styles.heading}>
                        Approval{" "}
                        <Badge
                          badgeContent={
                            props.dropData.approvalSummary.NFTCount
                          }
                          color="primary"
                        />
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
                            {props.dropData.approvalSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>

                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Nft's for approval
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p sx={styles.cardTitle}>
                            {props.dropData.approvalSummary.superAdminApprovalPending}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div
                        className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                      >
                        <div className="col-8 align-self-center">
                          <Typography variant="h6" sx={styles.cardTitle}>
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            sx={styles.cardTitle}
                            style={{ wordWrap: "break-word" }}
                          >
                            ${props.cost.estimates.superAdminApproval}
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
                        <Typography variant="h6" sx={styles.cardTitle}>
                          Your Balance
                        </Typography>
                      </div>
                      <div className="col-4 align-self-center text-right p-0">
                        <p
                          className="mr-3"
                          sx={styles.cardTitle}
                          style={{ wordWrap: "break-word" }}
                        >
                          ${props.cost.balance.dollar}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`row no-gutters justify-content-between w-100 ${styles.wrapper}`}
                    >
                      <div className="col-8 align-self-center">
                        <Typography variant="h6" sx={styles.cardTitle}>
                          Total cost
                        </Typography>
                      </div>
                      <div
                        className={`col-4 align-self-center text-right p-0 ${styles.wrapper}`}
                      >
                        <p
                          className="mr-3"
                          sx={styles.cardTitle}
                          style={{ wordWrap: "break-word", }}
                        >
                          ${props.cost.estimates.totalCostInDollars}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="row no-gutters justify-content-center justify-content-sm-between align-items-center mt-5 ml-4 mb-3">
                    <div className="col-12 col-sm-6 pr-sm-2">
                      <button className="bttn" onClick={props.handleClose}>
                        Reject
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 pl-sm-2">
                      <button
                        className="bttn"
                        sx={styles.buttons}
                        onClick={(e) => handleConfirm(e)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </Box>
          </Modal>
        </ThemeProvider>
      </div>
    )
  );
};

export default PublishDropModal;
