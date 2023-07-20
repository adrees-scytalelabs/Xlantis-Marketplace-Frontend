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

function Bids({ bidDetail }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" style={{ color: "#F64D04" }}>
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
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Bids;
