// REACT
import React from "react";
// MUI
import Typography from "@material-ui/core/Typography";
import { FontDownload } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI ICONS
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// STYLESHEETS
import "../../../../assets/css/mediaQueries.css";
// MEDIA
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

// COMPONENT FUNCTION
function HomeBanner() {
  const styles = useStyles();
  const matchMedia = useMediaQuery("(max-width: 575px)");
  // Jsx
  return (
    <Link to={"/dashboard"}>
      <section className="section sectionHomeBanner">
        <div className="container-fluid">
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              {/* <section className="text-center">
              <h1 style={{ fontFamily: "poppins", fontWeight: "bold" }}>
                Buy, sell and discover rare Digital Items
              </h1>
              <p>The Largest NFT MarketPlace</p>
            </section> */}
              <div className="featuredContainer">
                {/* The backdrop */}
                <div className="featuredBackdrop"></div>
                {/* Video Background */}
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
                    {/* Tile and Name */}
                    <div className="col-12 col-sm-6">
                      {/* Collection Tile */}
                      {/* <Card
                        className={
                          matchMedia ? styles.cardThemeSm : styles.cardTheme
                        }
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            // height="140"
                            image={collectionImg}
                            alt="Kangroo Robot"
                            className={
                              matchMedia
                                ? styles.cardMediaPropsSm
                                : styles.cardMediaProps
                            }
                          />
                          <CardContent style={{ padding: "8px" }}>
                            <Typography
                              variant="h5"
                              component="div"
                              className={
                                matchMedia
                                  ? styles.cardTitleSm
                                  : styles.cardTitle
                              }
                            >
                              Dire Wolf
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card> */}
                      {/* Creator Name */}
                      {/* <section className="creatorName mt-sm-2 d-flex">
                        <Link to={"/"}>
                          <Typography
                            variant="h6"
                            component="div"
                            className={
                              matchMedia
                                ? styles.creatorTitleSm
                                : styles.creatorTitle
                            }
                          >
                            Astro League
                            <span className="px-2">
                              <CheckCircleIcon
                                className={
                                  matchMedia
                                    ? styles.checkIconSm
                                    : styles.checkIcon
                                }
                              />
                            </span>
                          </Typography>
                        </Link>
                      </section> */}
                      {/* <section>
                        <h4
                          className={
                            matchMedia ? styles.dropPriceSm : styles.dropPrice
                          }
                        >
                          Floor: 2.28 ETH
                        </h4>
                      </section> */}
                    </div>
                    {/* View Button */}
                    {/* <div className="col-12 col-sm-6 text-right py-2">
                      <Link to="/fixdropnft">
                        <button className="featuredExploreBtn">
                          View Drop
                        </button>
                      </Link>
                    </div> */}
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
