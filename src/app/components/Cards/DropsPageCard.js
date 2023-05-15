import {
  Alert,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import Countdown from "react-countdown";
import { truncate } from "../../assets/js/utils";

const DropsPageCard = (props) => {
  console.log("props.dropDetails", props.dropDetails);
  return (
    <Card
      id="marketCardProps"
      style={{ height: "100%" }}
      variant="outlined"
      sx={props.classes.root}
    >
      <CardActionArea>
        <CardMedia
          sx={props.classes.media}
          image={props.dropDetails.image}
          title="Drop Image"
        />
        <CardContent>
          <div
            className=""
            style={{ minHeight: "60px" }}
          >
            <div className="text-center">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={props.cardClasses.cardTitle}
              >
                {truncate(props.dropDetails.title, 15)}
              </Typography>
            </div>
            
            <div className="row no-gutters justify-content-start align-items-center pb-2">
              <Typography
                variant="body2"
                sx={props.cardClasses.cardTitle}
                component="p"
              >
                {truncate(props.dropDetails.description, 70)}
              </Typography>
            </div>
          </div>
          <div className="text-right ">
            <p className="nftPrice mb-0 p-0" style={{ lineHeight: "1.6" }}>
              {props.dropDetails.totalNFTs} NFTs
            </p>
          </div>
          <br></br>

          {props.dropDetails.status === "draft" ? (
            <Typography variant="h6" gutterBottom className="text-center">
              (
              <Typography
                variant="body2"
                style={{ marginTop: "1rem" }}
                component="p"
              >
                <Alert
                  severity="info"
                  sx={props.cardClasses.textAlert}
                  style={{ fontWeight: "bold" }}
                >
                  Publish Drop
                </Alert>
              </Typography>
              )
            </Typography>
          ) : props.dropDetails.saleType === "auction" ? (
            <Typography variant="h6" gutterBottom className="text-center">
              {new Date() < new Date(props.dropDetails.startTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  <Alert
                    severity="info"
                    sx={props.cardClasses.textAlert}
                  >
                    <span
                      style={{
                        fontFamily: "orbitron",
                        fontWeight: "bold",
                      }}
                    >
                      Auction Starts At
                    </span>
                    <br></br>
                    <span>
                      <Countdown

                        date={new Date(props.dropDetails.startTime)}
                        style={{ fontFamily: "orbitron" }}
                        renderer={props => {
                          if (props.days === 0) {
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                          }
                          else {
                            return <span>{props.days} days {props.hours} hr</span>
                          }
                        }
                        }
                      />
                    </span>
                  </Alert>
                </div>
              ) : new Date() > new Date(props.dropDetails.startTime) &&
                new Date() < new Date(props.dropDetails.endTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  <Alert
                    severity="warning"
                    sx={props.cardClasses.textAlert}
                  >
                    <span
                      style={{
                        fontFamily: "orbitron",
                        fontWeight: "bold",
                      }}
                    >
                      Auction Ends At
                    </span>
                    <br></br>
                    <span>
                      <Countdown
                        date={new Date(props.dropDetails.endTime)}
                        style={{ fontFamily: "orbitron" }}
                        renderer={props => {
                          if (props.days === 0) {
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                          }
                          else {
                            return <span>{props.days} days {props.hours} hr</span>
                          }
                        }
                        }
                      />
                    </span>
                  </Alert>
                </div>
              ) : (
                <Typography
                  variant="body2"
                  style={{ marginTop: "1rem" }}
                  component="p"
                >
                  <Alert
                    severity="error"
                    sx={props.cardClasses.textAlert}
                    style={{ fontWeight: "bold" }}
                  >
                    Auction Ended
                  </Alert>
                </Typography>
              )}
            </Typography>
          ) : (
            <Typography variant="h6" gutterBottom className="text-center">
              {new Date() < new Date(props.dropDetails.startTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  <Alert
                    severity="info"
                    sx={props.cardClasses.textAlert}
                  >
                    <span
                      style={{
                        fontFamily: "orbitron",
                        fontWeight: "bold",
                      }}
                    >
                      Sale Starts At
                    </span>
                    <br></br>
                    <span>
                      <Countdown
                        date={new Date(props.dropDetails.startTime)}
                        style={{ fontFamily: "orbitron" }}
                        renderer={props => {
                          if (props.days === 0) {
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                          }
                          else {
                            return <span>{props.days} days {props.hours} hr</span>
                          }
                        }
                        }
                      />
                    </span>
                  </Alert>
                </div>
              ) : new Date() > new Date(props.dropDetails.startTime) &&
                new Date() < new Date(props.dropDetails.endTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  <Alert
                    severity="warning"
                    sx={props.cardClasses.textAlert}
                  >
                    <span
                      style={{
                        fontFamily: "orbitron",
                        fontWeight: "bold",
                      }}
                    >
                      Sale Ends At
                    </span>
                    <br></br>
                    <span>
                      <Countdown

                        date={new Date(props.dropDetails.endTime)}
                        style={{ fontFamily: "orbitron" }}
                        renderer={props => {
                          if (props.days === 0) {
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                          }
                          else {
                            return <span>{props.days} days {props.hours} hr</span>
                          }
                        }
                        }
                      />
                    </span>
                  </Alert>
                </div>
              ) : (
                <Typography
                  variant="body2"
                  style={{
                    marginTop: "1rem",
                  }}
                  component="p"
                >
                  <Alert
                    severity="error"
                    sx={props.cardClasses.textAlert}
                    style={{ fontWeight: "bold" }}
                  >
                    Sale Ended
                  </Alert>
                </Typography>
              )}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};

export default DropsPageCard;
