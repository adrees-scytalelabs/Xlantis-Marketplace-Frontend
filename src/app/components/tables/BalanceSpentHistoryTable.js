import React from "react";
import { Table } from "react-bootstrap";

const BalanceSpentHistoryTable = (props) => {
  return (
    <Table responsive>
      <thead style={{ color: "black" }}>
        <tr>
          <th style={props.styles.tableHeader}>Sr No.</th>
          <th style={props.styles.tableHeader}>Amount Spend</th>
          <th style={props.styles.tableHeader}>Details</th>
          <th style={props.styles.tableHeader}>Date</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody style={{ color: "white" }}>
        {props.balanceHistory.map((row, index) => (
          <tr>
            <td style={props.styles.collectionTitle}>1</td>
            <td style={props.styles.collectionTitle}>1</td>
            <td style={props.styles.collectionTitle}>
              <button
                className="btn btn-submit propsActionBtn"
                onClick={() => {
                  props.handleShowBalanceSpentModal();
                }}
              >
                View
              </button>
            </td>
            <td style={props.styles.collectionTitle}>1</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BalanceSpentHistoryTable;
