

import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import { Col, Row, Table } from "react-bootstrap";



function PropertiesAccordian({
        keys, 
        properties
    }) {

    

  return (
    <div>
        <Accordion style={{ backgroundColor: "black" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
            variant="body1"
            style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
            <BlurLinear />
            <strong> Properties</strong>
            </Typography>
        </AccordionSummary>
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
        </Accordion>
    </div>
    

  )
}

export default PropertiesAccordian;