import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import Countdown from "react-countdown";

const OnAuctionDropCard = (props) => {
  return (
    <Card
      style={{ height: "100%" }}
      variant="outlined"
      className={props.classes.root}
    >
      <CardActionArea>
        <CardHeader className="text-center" title={props.dropDetails.title} />
        <CardMedia
          className={props.classes.media}
          image={props.dropDetails.image}
          title=""
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Drop Description: </strong>
            {props.dropDetails.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Minimum Bid: </strong>
            {props.dropDetails.MinimumBid / 10 ** 18} WETH
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            color="textSecondary"
            className="text-center"
          >
            {new Date() < new Date(props.dropDetails.AuctionStartsAt) ? (
              <div style={{ color: "#00FF00" }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Auction Starts At:</strong>
                </Typography>
                <Countdown
                  daysInHours
                  date={new Date(props.dropDetails.AuctionStartsAt)}
                />
              </div>
            ) : new Date() > new Date(props.dropDetails.AuctionStartsAt) &&
              new Date() < new Date(props.dropDetails.AuctionEndsAt) ? (
              <div style={{ color: "#FF0000" }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Auction Ends At:</strong>
                </Typography>
                <Countdown
                  daysInHours
                  date={new Date(props.dropDetails.AuctionEndsAt)}
                />
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
    </Card>
  );
};

export default OnAuctionDropCard;
