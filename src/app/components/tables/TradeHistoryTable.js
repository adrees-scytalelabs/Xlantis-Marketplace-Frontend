import {
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
      color: "white",
      backgroundColor: "red",
    },
  },
  text: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
    paddingTop: "10px",
  },
};
const TradeHistoryTable = ({ tradeHistory }) => {
  const formatDate = (date) => {
    const backendDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - backendDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    const mintueDifference = hoursDifference * 60;
    console.log("Hours Difference", hoursDifference);
    console.log("Mintue Difference", mintueDifference);
    if (mintueDifference < 60) {
      return `${Math.floor(mintueDifference)} min ago`;
    } else if (hoursDifference < 24) {
      if (hoursDifference < 2) {
        return `${Math.floor(hoursDifference)} hour ago`;
      } else {
        return `${Math.floor(hoursDifference)} hours ago`;
      }
    } else {
      const year = backendDate.getFullYear();
      const month = (backendDate.getMonth() + 1).toString().padStart(2, "0");
      const day = backendDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
      <Table striped bordered hover>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        {tradeHistory?.map((i, index) => (
          <TableRow key={index} style={styles.text}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <span className="ml-3">{i.unitPrice}</span>
            </TableCell>
            <TableCell>
              <span className="ml-3">{i.supply}</span>
            </TableCell>
            <TableCell>
              <Tooltip
                title={
                  <Typography fontSize={16}>
                    {i.sellerId.walletAddress}
                  </Typography>
                }
              >
                <span>
                  {i.sellerId.walletAddress.slice(0, 4)}
                  ...
                </span>
              </Tooltip>
            </TableCell>
            <TableCell>
              {" "}
              <Tooltip
                title={
                  <Typography fontSize={16}>
                    {i.buyerId.walletAddress}
                  </Typography>
                }
              >
                <span>
                  {i.buyerId.walletAddress.slice(0, 4)}
                  ...
                </span>
              </Tooltip>
            </TableCell>
            <TableCell>{formatDate(i.soldAt)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default TradeHistoryTable;
