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
  text: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
    paddingTop: "10px",
  },
};
const BalanceSpentHistoryTable = (props) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
      <Table>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount Spend</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        {props.balanceHistory.map((history, index) => (
          <TableRow key={index} style={styles.text}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{history.type}</TableCell>
            <TableCell>${history.amountSpentInUsd.toFixed(5)}</TableCell>
            <TableCell>{new Date(history.createdAt).toDateString()}</TableCell>
            <TableCell>
              {new Date(history.createdAt).toLocaleTimeString()}
            </TableCell>
            <TableCell>
              <button
                className="btn btn-submit propsActionBtn"
                onClick={() => {
                  props.setBalanceHistoryModalData(history);
                  props.handleShowBalanceSpentModal();
                }}
              >
                View
              </button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default BalanceSpentHistoryTable;
