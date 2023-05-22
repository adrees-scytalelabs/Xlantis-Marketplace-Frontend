import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import MessageCard from "../MessageCards/MessageCard";
function TradeHistoryAccordian({ tradeHistory }) {
  useEffect(() => {
    console.log("props in tradeHistory accordion", tradeHistory);
  }, []);
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
    <div>
      <Accordion sx={{ backgroundColor: "rgba(32,32,32,255)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        >
          <Typography
            variant="body1"
            sx={{ color: "#F64D04", fontFamily: "orbitron" }}
          >
            <BlurLinearIcon style={{ color: "#F64D04" }} />
            <strong> Trade History</strong>
          </Typography>
        </AccordionSummary>
        {tradeHistory.length !== 0 ? (
          <AccordionDetails>
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
                        <span>{i.sellerId.walletAddress.slice(0, 4)}...</span>
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
                        <span>{i.buyerId.walletAddress.slice(0, 4)}...</span>
                      </Tooltip>
                    </td>
                    <td>{formatDate(i.soldAt)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </AccordionDetails>
        ) : (
          <MessageCard msg="No Trade History" />
        )}
      </Accordion>
    </div>
  );
}

export default TradeHistoryAccordian;
