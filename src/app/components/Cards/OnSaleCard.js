// REACT
import React from "react";
import { Link } from "react-router-dom";
// MUI
import { Avatar, Button, CardHeader, Grid, Paper } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI ICONS
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
// UTILS
import Countdown from "react-countdown";
import nft from "../../assets/img/pexels-mo-eid-8832898.jpg";
import kangaroo from "../../assets/img/NFTs/astranaut.jpg";
import { AlertTitle } from "@material-ui/lab";
import { truncate } from "../../assets/js/utils";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  cardTheme: {
    // borderRadius: "12px",
    boxShadow: "none",
  },
  media: {
    // height: 0,
    width: "100%",
    paddingTop: "100%", // 16:9
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
    // marginTop: "0.15rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    // borderRadius: "12px",
    fontSize: "1rem",
  },
  textAlertMd: {
    justifyContent: "center",
    // borderRadius: "12px",
    fontSize: "12px",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    // borderRadius: "12px",
    fontWeight: "bold",
  },
}));

const OnSaleCard = (props) => {
  const styles = useStyles();
  const matchScrn = useMediaQuery("(max-width: 991px)");

  return (
    <div className="col-12 p-2">
      {/* <Paper> */}
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
                {/* Creator Details and  Explore Button */}
                <div className="row no-gutters justify-content-between align-itmes-end">
                  {/* Creator Image */}
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
                      {/* Creator Name */}
                    </Link>
                  </div>
                  {/* Explore Button */}
                  <div className="col-8 w-100 text-right align-self-end">
                    {/* <CardActions
                        style={{
                          marginTop: "5px",
                          // padding: "12px 0px",
                          justifyContent: "end",
                        }}
                      > */}
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
                    {/* </CardActions> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mainDiv">
              <div className="square"></div>
              <div className="square2"></div>
              <div className="square3"></div>
            </div> */}
          </Link>
          <CardContent style={{ paddingBottom: 16, width: "100%" }}>
            {/* Title, Description and Price */}
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
            {/* Alerts */}
            <Typography
              variant="h6"
              gutterBottom
              color="textSecondary"
              className="text-center"
            >
              {/* Sale Ends and Sale Ended */}

              {new Date() < new Date(props.i.startTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
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
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
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
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                </div>
              ) : (
                <Typography
                  variant="body2"
                  style={{
                    marginTop: "1rem",
                    // marginBottom: "1.25rem",
                  }}
                  component="p"
                >
                  <Alert
                    severity="error"
                    // variant="filled"
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
      {/* </Paper> */}
    </div>
  );
};

export default OnSaleCard;
