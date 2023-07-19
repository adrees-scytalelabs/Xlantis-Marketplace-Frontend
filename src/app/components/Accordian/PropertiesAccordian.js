import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import MessageCard from "../MessageCards/MessageCard";
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
function PropertiesAccordian({ keys, properties }) {
  useEffect(() => {
    console.log("props in properties accordion", { keys, properties });
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
            <strong> Properties</strong>
          </Typography>
        </AccordionSummary>
        {keys.length !== 0 && keys[0] !== "" ? (
          <AccordionDetails>
            <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
              <Table striped bordered hover>
                <TableHead sx={styles.tableHeader}>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                {keys?.map((j, index) => (
                  <TableRow key={index}>
                    <TableCell style={styles.text}>{j}</TableCell>
                    <TableCell style={styles.text}>{properties[j]}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </AccordionDetails>
        ) : (
          <MessageCard msg="No Properties" />
        )}
      </Accordion>
    </div>
  );
}

export default PropertiesAccordian;
