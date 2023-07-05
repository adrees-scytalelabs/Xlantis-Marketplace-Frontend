import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { Link, useParams } from "react-router-dom";
import { truncate } from "../../assets/js/utils";
import { defaultProfile } from "../ImageURLs/URLs";

const OnSaleCard = (props) => {
  const { marketPlace } = useParams();
  const alertStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const matchScrn = useMediaQuery("(max-width: 991px)");
  useEffect(() => {
    console.log("Data of props", props);
  }, [props]);
  return (
    <div className="col-12 p-2">
      <Card id="marketCardProps">
        <div className="row no-gutters mdColHeight">
          <Link
            to={`/${marketPlace}/fixdropnft/${props.i._id}`}
            state={{
              saleType: props.i.saleType,
              description: props.i.description,
              bannerURL: props.i.bannerURL,
              imageURL: props.i.image,
              dropTitle: props.i.title,
              marketplaceId: props.marketplaceId,
            }}
            style={{ width: "100%" }}
          >
            <div className="nftImgWrapper">
              <CardMedia
                sx={{
                  width: "100%",
                  paddingTop: "100%",
                }}
                image={props.i.image}
                title="Drop Image"
              />
            </div>
            <CardContent style={{ paddingBottom: 16, width: "100%" }}>
              <div style={{ minHeight: "60px" }}>
                <div className="align-self-start">
                  <div className="text-center">
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{
                        color: "#fff",
                        fontFamily: "orbitron",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginTop: "0rem",
                        fontSize: "12px",
                        lineHeight: 1,
                      }}
                    >
                      {truncate(props.i.title, 15)}
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      color: "#999",
                      fontFamily: "inter",
                      fontSize: "12px",
                    }}
                  >
                    {truncate(props.i.description, 50)}
                  </Typography>
                </div>
              </div>
              <div className=" text-right">
                <p className="nftPrice mb-0 p-0">
                  {props.i.NFTIds.length > 1
                    ? `${props.i.NFTIds.length} NFTs`
                    : `${props.i.NFTIds.length} NFT`}
                </p>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                color="textSecondary"
                className="text-center"
              >
                {new Date() < new Date(props.i.startTime) ? (
                  <div style={{ marginTop: "1rem" }}>
                    <Alert
                      severity="info"
                      sx={
                        matchScrn
                          ? {
                              justifyContent: "center",
                              fontSize: "12px",
                            }
                          : {
                              justifyContent: "center",
                              fontSize: "1rem",
                            }
                      }
                    >
                      <span
                        style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                      >
                        Sale Starts At
                      </span>
                      <br></br>
                      <span>
                        <Countdown
                          date={new Date(props.i.startTime)}
                          style={{ fontFamily: "orbitron" }}
                          renderer={(props) => {
                            if (props.days == 0) {
                              return (
                                <span>
                                  {props.hours}:{props.minutes}:{props.seconds}
                                </span>
                              );
                            } else {
                              return (
                                <span>
                                  {props.days} days {props.hours} hr
                                </span>
                              );
                            }
                          }}
                        ></Countdown>
                      </span>
                    </Alert>
                  </div>
                ) : new Date() > new Date(props.i.startTime) &&
                  new Date() < new Date(props.i.endTime) ? (
                  <Typography
                    variant="body2"
                    style={{
                      marginTop: "1rem",
                    }}
                    component="p"
                  >
                    <Alert
                      severity="warning"
                      sx={
                        matchScrn
                          ? {
                              justifyContent: "center",
                              fontSize: "12px",
                            }
                          : {
                              justifyContent: "center",
                              fontSize: "1rem",
                            }
                      }
                      style={alertStyle}
                    >
                      <span
                        style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                      >
                        Sale Ends In
                      </span>
                      <br></br>
                      <span>
                        <Countdown
                          date={new Date(props.i.endTime)}
                          style={{ fontFamily: "orbitron" }}
                          renderer={(props) => {
                            if (props.days == 0) {
                              return (
                                <span>
                                  {props.hours}:{props.minutes}:{props.seconds}
                                </span>
                              );
                            } else {
                              return (
                                <span>
                                  {props.days} days {props.hours} hr
                                </span>
                              );
                            }
                          }}
                        ></Countdown>
                      </span>
                    </Alert>
                  </Typography>
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
                      sx={
                        matchScrn
                          ? {
                              justifyContent: "center",
                              fontSize: "12px",
                            }
                          : {
                              justifyContent: "center",
                              fontSize: "1rem",
                            }
                      }
                      style={{ ...alertStyle, fontWeight: "bold" }}
                    >
                      Sale Ended
                    </Alert>
                  </Typography>
                )}
              </Typography>
            </CardContent>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default OnSaleCard;
