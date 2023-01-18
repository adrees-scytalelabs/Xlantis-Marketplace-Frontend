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

const OnSaleCard = (props) => {
  console.log("the props in OnSaleCard: ", props);
  Cookies.set("DropID", props.i._id, {});

  const styles = useStyles();
  return (
    <div className="col-12 p-2" key={props.index}>
      {/* <Paper> */}
      <Card id="marketCardProps">
        <div className="row no-gutters">
          <Link
            // to={
            //   "/marketPlace/Cubes/Nfts/notdrop/" +
            //   props.userSaleData[props.index].expiresAt +
            //   "/" +
            //   props.i._id +
            //   "/" +
            //   props.userSaleData[props.index]._id
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
                {/* Creator Details and  Explore Button */}
                <div className="row no-gutters justify-content-between align-itmes-end">
                  {/* Creator Image */}
                  <div className="col-2 w-100">
                    <Link to="/">
                      <div
                        style={{
                          // borderRadius: 12,
                          backgroundColor: "#000",
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
                      //   "/marketPlace/Cubes/Nfts/notdrop/" +
                      //   props.userSaleData[props.index].expiresAt +
                      //   "/" +
                      //   props.i._id +
                      //   "/" +
                      //   props.userSaleData[props.index]._id
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
            {/* Title, Description and Price */}
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
                  {truncate(props.i.description, 35)}
                </Typography>
              </div>
              <div className="col-4 align-self-end text-right p-0">
                <p className="nftPrice mb-0 p-0">
                  {props.i.SalePrice / 10 ** 18} ETH
                </p>
              </div>
            </div>
            {/* Artist Lead */}
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
                  fontFamily: "poppins",
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
                        fontFamily: "poppins",
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
              {/* Sale Ends and Sale Ended */}

              {new Date() < new Date(props.i.startTime) ? (
                <div style={{ marginTop: "1rem" }}>
                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                  <Alert severity="info" className={styles.textAlert}>
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
                  <Alert severity="warning" className={styles.textAlert}>
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
                    className={styles.textAlert}
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
