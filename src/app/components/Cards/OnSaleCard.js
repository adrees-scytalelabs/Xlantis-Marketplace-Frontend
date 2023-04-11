import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import kangaroo from "../../assets/img/NFTs/astranaut.jpg";
import { truncate } from "../../assets/js/utils";

const useStyles = makeStyles((theme) => ({
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
    marginTop: "0rem",
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
}));

const OnSaleCard = (props) => {
  const styles = useStyles();
  const matchScrn = useMediaQuery("(max-width: 991px)");

  return (
    <div className="col-12 p-2">
      <Card id="marketCardProps">
        <div className="row no-gutters mdColHeight">
          <Link
            to={{
              pathname: `/fixdropnft/${props.i._id}`,
              state: {
                saleType: props.i.saleType,
                description: props.i.description,
              },
            }}
            style={{ width: "100%" }}
          >
            <div className="nftImgWrapper">
              <CardMedia
                className={styles.media}
                image={props.i.image}
                title="Drop Image"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
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
                          src={kangaroo}
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
                  <div className="col-8 w-100 text-right align-self-end">

                    <Link
                      to={{
                        pathname: `/fixdropnft/${props.i._id}`,
                        state: {
                          saleType: props.i.saleType,
                          startTime: props.i.startTime,
                          endTime: props.i.endTime
                        },
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
              className="row no-gutters justify-content-between"
              style={{ minHeight: "60px" }}
            >
              <div className="col-8 align-self-start">
                <Typography
                  variant="h6"
                  component="p"
                  className={styles.cardTitle}
                >
                  {props.i.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={styles.cardDescriptions}
                >
                  {truncate(props.i.description, 20)}
                </Typography>
              </div>
              <div className="col-4 align-self-start text-right p-0">
                <p className="nftPrice mb-0 p-0">
                  {props.i.NFTIds.length > 1
                    ? `${props.i.NFTIds.length} NFTs`
                    : `${props.i.NFTIds.length} NFT`}
                </p>
              </div>
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
                    className={
                      matchScrn ? styles.textAlertMd : styles.textAlert
                    }
                  >
                    <span
                      style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                    >
                      Sale Starts At:{" "}
                    </span>
                    <span>
                      <Countdown
                        daysInHours
                        date={new Date(props.i.startTime)}
                        style={{ fontFamily: "orbitron" }}
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
                      Sale Ends At:{" "}
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
                    Sale Ended
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

export default OnSaleCard;
