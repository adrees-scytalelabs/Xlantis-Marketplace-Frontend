

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Table } from "react-bootstrap";
const styles = {

  noMaxWidth: {
    maxWidth: "none",
  }
};


function Bids({
  bidDetail,
}) {

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" style={{ color: "#F64D04" }}>
            <ListIcon />
            <strong> Offers</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table striped hover bordered size="sm" responsive>
            <thead>
              <tr>
                <th style={{ padding: "0.75rem" }}>#</th>
                <th style={{ padding: "0.75rem" }}>Bidder</th>
                <th style={{ padding: "0.75rem" }}>Bid</th>
              </tr>
            </thead>
            <tbody>
              {bidDetail?.map((bid, index) => (
                <tr key={index}>
                  <td style={{ padding: "0.75rem" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                  <Tooltip
                      title={<Typography fontSize={16}>{bid.bidderAddress}</Typography>}
                    >
                      <span>
                        {bid.bidderAddress.slice(0, 8)}...
                      </span>
                    </Tooltip>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    {bid.bidAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </div>


  )
}

export default Bids;