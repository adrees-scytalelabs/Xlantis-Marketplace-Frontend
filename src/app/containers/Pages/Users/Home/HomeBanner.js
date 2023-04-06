import React from "react";
import Typography from "@material-ui/core/Typography";
import { FontDownload } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "../../../../assets/css/mediaQueries.css";
import videoBg from "../../../../assets/img/Seoul - 21116.mp4";
import collectionImg from "../../../../assets/img/direWolf.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardTheme: {
    maxWidth: "170px",
    background: "#000",
  },
  cardThemeSm: {
    maxWidth: 120,
    background: "#000",
  },
  cardMediaProps: {
    width: 170,
    height: 170,
    objectFit: "contain",
  },
  cardMediaPropsSm: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },
  cardTitle: {
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#fff",
  },
  cardTitleSm: {
    fontSize: "1rem",
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  creatorTitle: {
    fontFamily: "orbitron",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "2px",
    wordSpacing: "8px",
  },
  creatorTitleSm: {
    fontFamily: "orbitron",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "2px",
    wordSpacing: "5px",
    fontSize: "0.875rem",
  },
  checkIcon: {
    fill: "deepskyblue",
  },
  checkIconSm: {
    fill: "deepskyblue",
    width: "0.75em",
    height: "0.75em",
  },
  dropPrice: {
    fontWeight: "600",
    fontFamily: "orbitron",
    color: "#fff",
  },
  dropPriceSm: {
    fontWeight: "600",
    fontFamily: "orbitron",
    color: "#fff",
    fontSize: "0.875rem",
  },
}));

function HomeBanner() {
  const styles = useStyles();
  const matchMedia = useMediaQuery("(max-width: 575px)");
  return (
    <Link to={"/dashboard"}>
      <section className="section sectionHomeBanner">
        <div className="container-fluid">
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="featuredContainer">
                <div className="featuredBackdrop"></div>
                <video
                  src={videoBg}
                  autoPlay
                  loop
                  mute
                  type="video/mp4"
                  className="videoContent"
                />
                <div className="videoContentText p-4">
                  <div className="row no-gutters align-items-end justify-content-sm-between justify-content-center">
                    <div className="col-12 col-sm-6">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default HomeBanner;
