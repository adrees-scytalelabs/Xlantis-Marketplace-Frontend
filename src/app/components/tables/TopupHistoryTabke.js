import React from "react";
import { Table } from "react-bootstrap";

const TopupHistoryTable = ({ topupHistory, styles }) => {
  return (
    <Table responsive>
      <thead style={{ color: "black" }}>
        <tr>
          <th style={styles.tableHeader}>Tx No.</th>
          <th style={styles.tableHeader}>Amount (USD)</th>
          <th style={styles.tableHeader}>Amount (MATIC)</th>
          <th style={styles.tableHeader}>Date</th>
          <th style={styles.tableHeader}>Time</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody style={{ color: "white" }}>
        {topupHistory.map((row, index) => (
          <tr key={index}>
            <td style={styles.collectionTitle}>{index + 1}</td>
            <td style={styles.collectionTitle}>{row.amountInUSD}</td>
            <td style={styles.collectionTitle}>{row.amountInMatic}</td>
            <td style={styles.collectionTitle}>
              {new Date(row.date).toDateString()}
            </td>
            <td style={styles.collectionTitle}>
              {new Date(row.date).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TopupHistoryTable;
