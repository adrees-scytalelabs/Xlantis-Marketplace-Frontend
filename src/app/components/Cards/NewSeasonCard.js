import React from 'react'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CardHeader } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import Countdown from "react-countdown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
  
    media: {
      height: 300,
    },
    badge: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    card: {
      minWidth: 250,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

function NewSeasonCard({i,handleRemoveClick,index}) {
    const classes = useStyles();
  return (
    <div>
        <Card
                            style={{ height: "100%" }}
                            variant="outlined"
                            className={classes.root}
                          >
                            <CardActionArea>
                              <CardHeader
                                className="text-center"
                                title={i.title}
                              />
                              <CardMedia
                                className={classes.media}
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