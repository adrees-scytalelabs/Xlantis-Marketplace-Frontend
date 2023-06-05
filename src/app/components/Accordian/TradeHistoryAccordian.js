import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import MessageCard from "../MessageCards/MessageCard";
import TradeHistoryTable from "../tables/TradeHistoryTable";
function TradeHistoryAccordian({ tradeHistory }) {
  useEffect(() => {
    console.log("props in tradeHistory accordion", tradeHistory);
  }, []);

  return (
    <div>
      <Accordion sx={{ backgroundColor: "#000" }}>
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
            <TradeHistoryTable tradeHistory={tradeHistory} />
          </AccordionDetails>
        ) : (
          <MessageCard msg="No Trade History" />
        )}
      </Accordion>
    </div>
  );
}

export default TradeHistoryAccordian;
