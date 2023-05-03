import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import TxHistory from '../Cards/TxHistory';
function TxHistoryAccordian({ transactionHistory }) {
  return (
    <div>
      <div className="form-group" style={{ marginTop: "20px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" gutterBottom>
              Tx History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {transactionHistory.length === 0 ? (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <strong>No Transaction History Found </strong>
              </Typography>
            ) : null}
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
            >
              {transactionHistory
                .slice(0)
                .reverse()
                .map((i, index) => (
                  <TxHistory data={i} key={index} />
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default TxHistoryAccordian