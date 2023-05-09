import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import MessageCard from "../MessageCards/MessageCard";
function PropertiesAccordian({ keys, properties }) {
  useEffect(() => {
    console.log("props in properties accordion", { keys, properties });
  }, []);
  return (
    <div>
      <Accordion sx={{ backgroundColor: "black" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}>
          <Typography
            variant="body1"
            sx={{ color: "#F64D04", fontFamily: "orbitron" }}
          >
            <BlurLinearIcon />
            <strong> Properties</strong>
          </Typography>
        </AccordionSummary>
        {keys.length !== 0 && keys[0]!=='' ? (
        <AccordionDetails>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {keys?.map((j, index) => (
                <tr key={index}>
                  <td>{j}</td>
                  <td>{properties[j]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AccordionDetails>
        ):(
          <MessageCard msg="No Properties" />
        )}
      </Accordion>
    </div>
  );
}

export default PropertiesAccordian;
