import React from 'react'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core/";
import TxHistory from '../Cards/TxHistory';


function TxHistoryAccordian({transactionHistory}) {
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