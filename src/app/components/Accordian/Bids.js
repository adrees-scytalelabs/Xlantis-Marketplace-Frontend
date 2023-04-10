

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


function Bids({
        bidDetail,
    }) {

  const classes = useStyles();
  

  return (
    <div>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="body1" style={{ color: "#F64D04" }}>
            <ListIcon />
            <strong> Offers</strong>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Table striped hover bordered size="sm" responsive>
            <thead>
                <tr>
                <th style={{ padding: "0.75rem" }}>#</th>
                <th style={{ padding: "0.75rem" }}>Bidder</th>
                <th style={{ padding: "0.75rem" }}>Bid</th>
                </tr>
            </thead>
            <tbody>
                {bidDetail?.map((bid, index) => (
                <tr key={index}>
                    <td style={{ padding: "0.75rem" }}>
                    {index + 1}
                    </td>
                    <td style={{ padding: "0.75rem" }}>
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
                    <td style={{ padding: "0.75rem" }}>
                    {bid.bidAmount}
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

export default Bids;