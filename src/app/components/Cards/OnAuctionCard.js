// REACT
import React from "react";
import { Link } from "react-router-dom";
// MUI
import { Avatar, CardHeader, Grid, Paper } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
// IMAGES
import nft from "../../assets/img/pexels-mo-eid-8832898.jpg";
import kangaroo from "../../assets/img/NFTs/astranaut.jpg";
// COMPONENTS
import Countdown from "react-countdown";
import XamButton from "../buttons/XamButton";

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
    marginTop: "0.5rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "1rem",
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
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    // borderRadius: "12px",
    fontWeight: "bold",
  },
}));

const OnAuctionCard = (props) => {
  const styles = useStyles();
  return (
    <div className="col-12 p-2" key={props.index}>
      {/* <Paper elevation={1}> */}
      <Card id="marketCardProps">
        <div className="row no-gutters">
          <Link
            // to={
            //   "/marketPlace/Cubes/Nfts/userauction/" +
            //   props.i._id +
            //   "/" +
            //   props.userAuctionData[props.index]._id
            // }
            to="/fixdropnft"
            style={{ width: "100%" }}
          >
            <div className="nftImgWrapper">
              <CardMedia
                className={styles.media}
                image={props.i.image}
                title="Drop Image"
              />
              {/* <img
                  src={props.i.image}
                  alt="a sample nft"
                  className="myNFTImg"
                /> */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: "1000",
                  // height: 100,
                  width: "100%",
                  // border: "1px solid orange",
                }}
                className="p-3"
              >
                <div className="row no-gutters justify-content-between align-itmes-end">
                  {/* Creator Details */}
                  <div className="col-2 w-100">
                    {/* Creator Image */}
                    <Link to="/">
                      <div
                        style={{
                          // borderRadius: 12,
                          backgroundColor: "#000",
                          // height: 80,
                        }}
                      >
                        <img
                          src={kangaroo}
                          alt="a sample nft"
                          style={{
                            width: "85px",
                            height: "85px",
                            objectFit: "cover",
                            // borderRadius: "12px",
                          }}
                        />
                      </div>
                      {/* Creator Name */}
                    </Link>
                  </div>
                  {/* Explore Button */}
                  <div className="col w-100 text-right align-self-end">
                    {/* <CardActions
                        style={{
                          marginTop: "5px",
                          // padding: "12px 0px",
                          justifyContent: "end",
                        }}
                      > */}

                    <Link
                      // to={
                      //   "/marketPlace/Cubes/Nfts/userauction/" +
                      //   props.i._id +
                      //   "/" +
                      //   props.userAuctionData[props.index]._id
                      // }
                      to="/fixdropnft"
                    >
                      <button className="exploreBtn">
                        Explore{" "}
                        <span>
                          <OpenInNewIcon />
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
          <CardContent style={{ paddingBottom: 0, width: "100%" }}>
            <div
              className="row no-gutters justify-content-between"
              style={{ minHeight: "60px" }}
            >
              <div className="col-8 align-self-end">
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
                  {props.i.description}
                </Typography>
              </div>
              <div className="col-4 align-self-end text-right">
                <p
                  style={{
                    marginBottom: "0",
                    color: "#999",
                    fontFamily: "inter",
                    fontSize: "1rem",
                    lineHeight: "0.75",
                  }}
                >
                  Minimum Bid{" "}
                </p>
                <p className="nftPrice mb-0 p-0">
                  {props.userAuctionData[props.index].minimumBid / 10 ** 18}{" "}
                  WETH
                </p>
              </div>
            </div>
            {/* Artist Leads */}
            {/* <Link
              to={
                "/User/Profile/Detail/musicArtist/" +
                props.i.MusicArtistId +
                "/null"
              }
              style={{ color: "#000" }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  padding: "5px",
                  border: "1px solid #ccc",
                  marginTop: "0.75rem",
                  fontFamily: "orbitron",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={props.i.MusicArtistProfile}
                      aria-label="Artist"
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #777",
                        fontFamily: "orbitron",
                      }}
                    />
                  }
                  title={props.i.MusicArtistName}
                  subheader={props.i.MusicArtistAbout}
                />
              </div>
            </Link> */}
            {/* Alerts */}
            <Typography
              variant="h6"
              gutterBottom
              color="textSecondary"
              className="text-center"
            >
              {/* Auction Ends and Auction Ended */}
              {new Date() <
              new Date(props.userAuctionData[props.index].auctionStartsAt) ? (
                <div style={{ marginTop: "1rem" }}>
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionStartsAt))} */}
                  <Alert severity="warning" className={styles.textAlert}>
                    <span
                      style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                    >
                      Auction Starts At:{" "}
                    </span>
                    <span>
                      <Countdown
                        daysInHours
                        date={
                          new Date(
                            props.userAuctionData[props.index].auctionStartsAt
                          )
                        }
                        style={{ fontFamily: "orbitron" }}
                      ></Countdown>
                    </span>
                  </Alert>
                </div>
              ) : new Date() >
                  new Date(
                    props.userAuctionData[props.index].auctionStartsAt
                  ) &&
                new Date() <
                  new Date(props.userAuctionData[props.index].auctionEndsAt) ? (
                <div style={{ marginTop: "1rem" }}>
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                  <Alert severity="warning" className={styles.textAlert}>
                    <span
                      style={{ fontFamily: "orbitron", fontWeight: "bold" }}
                    >
                      Auction Ends At:{" "}
                    </span>
                    <span>
                      <Countdown
                        daysInHours
                        date={
                          new Date(
                            props.userAuctionData[props.index].auctionEndsAt
                          )
                        }
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
                    // marginBottom: "1.25rem",
                  }}
                  component="p"
                >
                  <Alert
                    severity="error"
                    // variant="filled"
                    className={styles.textAlert}
                    style={{ fontWeight: "bold" }}
                  >
                    Auction Ended
                  </Alert>
                </Typography>
              )}
            </Typography>
          </CardContent>
          {/* Explore Button */}
          {/* <div className="row no-gutters px-3 w-100">
            <div className="col-12">
              <CardActions
                style={{
                  marginTop: "5px",
                  padding: "12px 0px",
                  justifyContent: "end",
                }}
              >
                <Link
                  to={
                    "/marketPlace/Cubes/Nfts/userauction/" +
                    props.i._id +
                    "/" +
                    props.userAuctionData[props.index]._id
                  }
                >
                  <button className="exploreBtn">
                    Explore{" "}
                    <span>
                      <OpenInNewIcon />
                    </span>
                  </button>
                </Link>
              </CardActions>
            </div>
          </div> */}
        </div>
      </Card>
      {/* </Paper> */}
    </div>
  );
};

export default OnAuctionCard;
