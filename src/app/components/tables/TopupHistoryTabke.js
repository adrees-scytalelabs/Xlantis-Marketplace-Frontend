import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
const styles = {
  tableHeader: {
    "& th": {
      fontSize: "1.25rem",
      fontWeight: "bold",
      padding: "14px",
      color: "#000",
      backgroundColor: "white",
    },
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
    paddingTop: "10px",
  },
};
const TopupHistoryTable = ({ topupHistory, styles }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
      <Table>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>Tx No.</TableCell>
            <TableCell>Amount (USD)</TableCell>
            <TableCell>Amount (MATIC)</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        {topupHistory.map((row, index) => (
          <TableRow key={index} style={styles.collectionTitle}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.amountInUSD}</TableCell>
            <TableCell>{row.amountInMatic}</TableCell>
            <TableCell>{new Date(row.date).toDateString()}</TableCell>
            <TableCell style={styles.collectionTitle}>
              {new Date(row.date).toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default TopupHistoryTable;
