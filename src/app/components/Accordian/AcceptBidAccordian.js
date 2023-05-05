

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Table } from "react-bootstrap";
import Countdown from "react-countdown";


function AcceptBidAccordian({
  bidDetail,
  isSold,
  versionB,
  handleAcceptBid,
  handleOpenModal
}) {

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ color: "#F64D04", fontFamily: "orbitron" }}
          >
            <ListIcon />
            <strong> Offers</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table striped hover bordered size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Bidder</th>
                <th>Bid</th>
                <th>Expiration</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {bidDetail?.map((bid, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Tooltip
                      classes={{ maxWidth: "none", }}
                      leaveDelay={1500}
                      title={bid.bidderAddress}
                      arrow
                    >
                      <span>
                        {bid.bidderAddress.slice(0, 8)}...
                      </span>
                    </Tooltip>
                  </td>
                  <td>{bid.bidAmount}</td>
                  <td>
                    {bid.isAccepted ? (
                      <span>Accepted</span>
                    ) : new Date() > new Date(bid.expiryTime) ? (
                      <span>Expired</span>
                    ) : (
                      <Countdown
                        date={new Date(bid.expiryTime)}
                        renderer={props => {  
                            if (props.days==0){
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                            }
                            else {
                              return <span>{props.days} days {props.hours} hr</span>
                            }
                          }
                        }

                      />
                    )}
                  </td>
                  <td>
                    {new Date() > new Date(bid.expiryTime) ? (
                      <button className="btn" disabled>
                        Accept
                      </button>
                    ) : bid.isAccepted ||
                      isSold ? (
                      <button className="btn" disabled>
                        Accept
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={(e) => {
                          versionB === "v1-sso"
                            ? handleOpenModal(e, bid._id)
                            : handleAcceptBid(e, bid._id);
                        }}
                      >
                        Accept
                      </button>
                    )}
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

export default AcceptBidAccordian;