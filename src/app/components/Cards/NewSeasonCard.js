import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import Countdown from "react-countdown";
const styles = {
  root: {
    maxWidth: 345,
  },

  media: {
    height: 300,
  },
}

function NewSeasonCard({ i, handleRemoveClick, index }) {
  return (
    <div>
      <Card
        style={{ height: "100%" }}
        variant="outlined"
        sx={styles.root}
      >
        <CardActionArea>
          <CardHeader
            className="text-center"
            title={i.title}
          />
          <CardMedia
            sx={styles.media}
            image={i.image}
            title=""
          ></CardMedia>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <strong>Drop Description: </strong>
              {i.description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <strong>Minimum Bid: </strong>
              {i.MinimumBid / 10 ** 18} WETH
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              color="textSecondary"
              className="text-center"
            >
              {new Date() < new Date(i.AuctionStartsAt) ? (
                <div style={{ color: "#00FF00" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Auction Starts At:</strong>
                  </Typography>
                  {console.log(
                    "Date(i.AuctionStartsAt)",
                    Date(i.AuctionStartsAt)
                  )}
                  <Countdown
                    daysInHours
                    date={new Date(i.AuctionStartsAt)}
                  ></Countdown>
                </div>
              ) : new Date() >
                new Date(i.AuctionStartsAt) &&
                new Date() < new Date(i.AuctionEndsAt) ? (
                <div style={{ color: "#FF0000" }}>
                  {console.log(
                    "Date(i.AuctionStartsAt)",
                    Date(i.AuctionEndsAt.toLoca)
                  )}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Auction Ends At:</strong>
                  </Typography>
                  <Countdown
                    daysInHours
                    date={new Date(i.AuctionEndsAt)}
                  ></Countdown>
                </div>
              ) : (
                <Typography
                  variant="body2"
                  style={{ color: "#FF0000" }}
                  component="p"
                >
                  <strong>Auction Ended</strong>
                </Typography>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveClick(index);
            }}
            className="btn btn-sm bg-danger-light btn-block"
          >
            Remove Drop
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default NewSeasonCard