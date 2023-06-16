import React from "react";
import { Table } from "react-bootstrap";

const BalanceSpentHistoryTable = (props) => {
  return (
    <Table responsive>
      <thead style={{ color: "black" }}>
        <tr>
          <th style={props.styles.tableHeader}>Sr No.</th>
          <th style={props.styles.tableHeader}>Type</th>
          <th style={props.styles.tableHeader}>Amount Spend</th>
          <th style={props.styles.tableHeader}>Details</th>
          <th style={props.styles.tableHeader}>Date</th>
          <th style={props.styles.tableHeader}>Time</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody style={{ color: "white" }}>
        {props.balanceHistory.map((history, index) => (
          <tr>
            <td style={props.styles.collectionTitle}>{index + 1}</td>
            <td style={props.styles.collectionTitle}>{history.type}</td>
            <td style={props.styles.collectionTitle}>
              {history.amountSpentInUsd.toFixed(5)}
            </td>
            <td style={props.styles.collectionTitle}>
              <button
                className="btn btn-submit propsActionBtn"
                onClick={() => {
                  props.setBalanceHistoryModalData(history);
                  props.handleShowBalanceSpentModal();
                }}
              >
                View
              </button>
            </td>
            <td style={props.styles.collectionTitle}>
              {new Date(history.createdAt).toDateString()}
            </td>
            <td style={props.styles.collectionTitle}>
              {new Date(history.createdAt).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BalanceSpentHistoryTable;
