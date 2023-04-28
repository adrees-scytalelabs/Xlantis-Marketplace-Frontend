import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';

function BiddingHistory({ bidHistory }) {
  return (
    <div>
      <div className="form-group" style={{ marginTop: "20px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" gutterBottom>
              Bidding History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bidHistory.length === 0 ? (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <strong>No Bidding History Found </strong>
              </Typography>
            ) : null}
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
            >
              {bidHistory
                .slice(0)
                .reverse()
                .map((i, index) => (
                  <BiddingHistory data={i} key={index} />
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default BiddingHistory