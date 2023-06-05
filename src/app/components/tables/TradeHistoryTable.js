import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";

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
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {tradeHistory?.map((i, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <span className="ml-3">{i.unitPrice}</span>
            </td>
            <td>
              <span className="ml-3">{i.supply}</span>
            </td>
            <td>
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
            </td>
            <td>
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
            </td>
            <td>{formatDate(i.soldAt)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TradeHistoryTable;
