import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Alert, Card, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material';
import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { truncate } from "../../assets/js/utils";
import { defaultProfile } from '../ImageURLs/URLs';
const styles = {
  cardTheme: {
    boxShadow: "none",
  },
  media: {
    width: "100%",
    paddingTop: "100%",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: "0.5rem",
    fontSize: "12px",
    lineHeight: 1,
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "12px",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    fontSize: "1rem",
  },
  textAlertMd: {
    justifyContent: "center",
    fontSize: "12px",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    fontWeight: "bold",
  },
}

const OnAuctionCard = (props) => {
  const matchScrn = useMediaQuery("(max-width: 991px)");

  return (
    <div className="col-12 p-2">
      <Card id="marketCardProps">
        <div className="row no-gutters mdColHeight">
          <Link
            style={{ width: "100%" }}
            to={`/fixdropnft/${props.i._id}`}
            state={{
              saleType: props.i.saleType,
              description: props.i.description,
            }}
          >
            <div className="nftImgWrapper">
              <CardMedia
                sx={styles.media}
                image={props.i.image}
                title="Drop Image"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: "1000",
                  width: "100%",
                }}
                className="p-3"
              >
                <div className="row no-gutters justify-content-between align-itmes-end">
                  <div className="col-2 w-100">
                    <Link to="/">
                      <div
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        <img
                          src={defaultProfile}
                          alt="a sample nft"
                          style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="col w-100 text-right align-self-end">
                    <Link
                      to={`/fixdropnft/${props.i._id}`}
                      state={{
                        saleType: props.i.saleType,
                        startTime: props.i.startTime,
                        endTime: props.i.endTime
                      }}
                    >
                      <button className="exploreBtn">
                        Explore{" "}
                        <span>
                          <OpenInNewIcon style={{ fontSize: "1rem" }} />
                        </span>
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </Link>
          <CardContent style={{ paddingBottom: 16, width: "100%" }}>
            <div
              style={{ minHeight: "60px" }}
            >

              <div className="text-center">
                <Typography
                  variant="h6"
                  component="p"
                  sx={styles.cardTitle}
                >
                  {truncate(props.i.title, 15)}
                </Typography>

              </div>
              <div className="row no-gutters justify-content-start align-items-center pb-2">
                <Typography
                  variant="body2"
                  component="p"
                  sx={styles.cardDescriptions}
                >
                  {truncate(props.i.description, 50)}
                </Typography>
              </div>
            </div>
            <div className="text-right">
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
                    severity="warning"
                    className={
                      matchScrn ? styles.textAlertMd : styles.textAlert
                    }
                  >
                    <span
                      style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                    >
                      Auction Starts At:{" "}
                    </span>
                    <span>
                      <Countdown

                        date={new Date(props.i.startTime)}
                        style={{ fontFamily: "orbitron" }}
                        renderer={props => {
                          if (props.days == 0) {
                            return <span>{props.hours}:{props.minutes}:{props.seconds}</span>
                          }
                          else {
                            return <span>{props.days}days {props.hours}hr</span>
                          }
                        }
                        }
                      ></Countdown>
                    </span>
                  </Alert>
                </div>
              ) : new Date() > new Date(props.i.startTime) &&
                new Date() < new Date(props.i.endTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  <Alert
                    severity="warning"
                    className={
                      matchScrn ? styles.textAlertMd : styles.textAlert
                    }
                  >
                    <span
                      style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                    >
                      Auction Ends In:{" "}
                    </span>
                    <span>
                      <Countdown
                        daysInHours
                        date={new Date(props.i.endTime)}
                        style={{ fontFamily: "orbitron" }}
                      ></Countdown>
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
                    className={
                      matchScrn ? styles.textAlertMd : styles.textAlert
                    }
                    style={{ fontWeight: "bold" }}
                  >
                    Auction Ended
                  </Alert>
                </Typography>
              )}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default OnAuctionCard;
