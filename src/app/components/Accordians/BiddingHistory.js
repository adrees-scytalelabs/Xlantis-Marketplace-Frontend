import React from 'react'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core/";

function BiddingHistory({bidHistory}) {
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