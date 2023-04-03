import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
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

const PublishDropModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState("panel1");
  const [disabled, setDisabled] = useState(false);
  const [costInfo, setCostInfo] = useState({});
  const [amount, setAmount] = useState(5);
  const [topUpModal, setTopUpModal] = useState(false);
  const classes = useStyles();

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
    }
    else {
      props.handlePublish();
    }
  };
  useEffect(() => {
    clearTimeout();
  }, [props]);

  return (
    props.open === true && (
      <div>
        <ThemeProvider theme={makeTheme}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
          >
            <Box>
              <Fade in={props.open}>
                <div className={classes.paper}>
                  <div className="row no-gutters mb-3">
                    <div className="col-12 align-self-center">
                      <Typography
                        variant="h4"
                        className={classes.cardHeading}
                      >
                        Purchase Summary
                      </Typography>
                    </div>
                  </div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
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
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Number of Transactions
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.collectionTxSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Total Collection(s) To Create
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.collectionTxSummary.collectionCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}>
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
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
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        NFTs{" "}
                        <Badge
                          badgeContent={props.dropData.NFTsTxSummary.NFTCount}
                          color="primary"
                        />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Number of Transactions
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.NFTsTxSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Total NFTs To Mint
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.NFTsTxSummary.NFTCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}>
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
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
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Approval{" "}
                        <Badge
                          badgeContent={props.dropData.approvalSummary.NFTCount}
                          color="primary"
                        />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Number of Transactions
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.approvalSummary.txsCount}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>

                    <AccordionDetails>
                      <div className="row no-gutters justify-content-between w-100">
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Nft's for approval
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0">
                          <p
                            className={classes.cardTitle}
                          >
                            {props.dropData.approvalSummary.superAdminApprovalPending}
                          </p>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}>
                        <div className="col-8 align-self-center">
                          <Typography
                            variant="h6"
                            className={classes.cardTitle}
                          >
                            Cost
                          </Typography>
                        </div>
                        <div className="col-4 align-self-center text-right p-0" >
                          <p
                            className={classes.cardTitle}
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
                      className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
                    >
                      <div className="col-8 align-self-center">
                        <Typography
                          variant="h6"
                          className={classes.cardTitle}
                        >
                          Your Balance
                        </Typography>
                      </div>
                      <div className="col-4 align-self-center text-right p-0">
                        <p
                          className={classes.cardTitle}
                          style={{ wordWrap: "break-word" }}
                        >
                          ${props.cost.balance.dollar}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`row no-gutters justify-content-between w-100 ${classes.wrapper}`}
                    >
                      <div className="col-8 align-self-center">
                        <Typography
                          variant="h6"
                          className={classes.cardTitle}
                        >
                          Total cost
                        </Typography>
                      </div>
                      <div
                        className={`col-4 align-self-center text-right p-0 ${classes.wrapper}`}
                      >
                        <p
                          className={classes.cardTitle}
                          style={{ wordWrap: "break-word" }}
                        >
                          ${props.cost.estimates.totalCostInDollars}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="row no-gutters justify-content-center justify-content-sm-between align-items-center mt-5">
                    <div className="col-12 col-sm-6 pr-sm-2">
                      <button
                        className={classes.buttons}
                        onClick={props.handleClose}
                      >
                        Reject
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 pl-sm-2">
                      <button
                        className={classes.buttons}
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
