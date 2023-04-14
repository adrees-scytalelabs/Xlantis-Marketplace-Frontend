

import React from 'react'
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tooltip,
} from "@material-ui/core";
import {  ExpandMore } from "@material-ui/icons";
import { Table } from "react-bootstrap";
import ListIcon from "@material-ui/icons/List";
import Countdown from "react-countdown";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    noMaxWidth: {
      maxWidth: "none",
    },
    badge: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  
    card: {
      minWidth: 250,
    },
    media1: {
      height: 300,
    },
    media: {
      height: 0,
      paddingTop: "100%",
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


function AcceptBidAccordian({
        bidDetail,
        isSold,
        versionB,
        handleAcceptBid,
        handleOpenModal
    }) {

  const classes = useStyles();
  

  return (
    <div>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
                variant="body1"
                style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
                <ListIcon />
                <strong> Offers</strong>
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Table striped hover bordered size="sm" responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Bidder</th>
                    <th>Bid</th>
                    <th>Expiration</th>
                    <th colSpan={2}></th>
                </tr>
                </thead>
                <tbody>
                {bidDetail?.map((bid, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <Tooltip
                        classes={{ tooltip: classes.noMaxWidth }}
                        leaveDelay={1500}
                        title={bid.bidderAddress}
                        arrow
                        >
                        <span>
                            {bid.bidderAddress.slice(0, 8)}...
                        </span>
                        </Tooltip>
                    </td>
                    <td>{bid.bidAmount}</td>
                    <td>
                        {bid.isAccepted ? (
                        <span>Accepted</span>
                        ) : new Date() > new Date(bid.expiryTime) ? (
                        <span>Expired</span>
                        ) : (
                        <Countdown
                            daysInHour
                            date={new Date(bid.expiryTime)}
                        />
                        )}
                    </td>
                    <td>
                        {new Date() > new Date(bid.expiryTime) ? (
                        <button className="btn" disabled>
                            Accept
                        </button>
                        ) : bid.isAccepted ||
                        isSold ? (
                        <button className="btn" disabled>
                            Accept
                        </button>
                        ) : (
                        <button
                            className="btn"
                            onClick={(e) => {
                            versionB === "v1-sso"
                                ? handleOpenModal(e, bid._id)
                                : handleAcceptBid(e, bid._id);
                            }}
                        >
                            Accept
                        </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </AccordionDetails>
        </Accordion>
    </div>
    

  )
}

export default AcceptBidAccordian;