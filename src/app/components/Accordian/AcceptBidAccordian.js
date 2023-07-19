import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React from "react";
import Countdown from "react-countdown";

const styles = {
  noMaxWidth: {
    maxWidth: "none",
  },
  tableHeader: {
    "& th": {
      fontSize: "1.25rem",
      fontWeight: "bold",
      padding: "14px",
      color: "#000",
      backgroundColor: "white",
    },
  },
  text: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
    paddingTop: "10px",
  },
};
function AcceptBidAccordian({
  bidDetail,
  isSold,
  versionB,
  handleAcceptBid,
  handleOpenModal,
}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ color: "#F64D04", fontFamily: "orbitron" }}
          >
            <ListIcon />
            <strong> Offers</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
            <Table size="small">
              <TableHead sx={styles.tableHeader}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Bidder</TableCell>
                  <TableCell>Bid</TableCell>
                  <TableCell>Expiration</TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableHead>

              {bidDetail?.map((bid, index) => (
                <TableRow key={index}>
                  <TableCell style={styles.text}>{index + 1}</TableCell>
                  <TableCell style={styles.text}>
                    <Tooltip
                      title={
                        <Typography fontSize={16}>
                          {bid.bidderAddress}
                        </Typography>
                      }
                    >
                      <span>{bid.bidderAddress.slice(0, 8)}...</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell style={styles.text}>{bid.bidAmount}</TableCell>
                  <TableCell style={styles.text}>
                    {bid.isAccepted ? (
                      <span>Accepted</span>
                    ) : new Date() > new Date(bid.expiryTime) ? (
                      <span>Expired</span>
                    ) : (
                      <Countdown
                        date={new Date(bid.expiryTime)}
                        renderer={(props) => {
                          if (props.days == 0) {
                            return (
                              <span>
                                {props.hours}:{props.minutes}:{props.seconds}
                              </span>
                            );
                          } else {
                            return (
                              <span>
                                {props.days} days {props.hours} hr
                              </span>
                            );
                          }
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date() > new Date(bid.expiryTime) ? (
                      <button className="btn" disabled>
                        Accept
                      </button>
                    ) : bid.isAccepted || isSold ? (
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
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AcceptBidAccordian;
