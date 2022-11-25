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
// MUI ICONS
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// MEDIA
import videoBg from "../../../../assets/img/Seoul - 21116.mp4";
import collectionImg from "../../../../assets/img/direWolf.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardTheme: {
    borderRadius: "12px",
    maxWidth: "150px",
    background: "#fbfeff",
  },
  cardMediaProps: {
    width: 150,
    height: 150,
    objectFit: "contain",
    borderRadius: "12px 12px 0 0",
  },
  cardTitle: {
    // color: "#04111D",
    fontFamily: "poppins",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    backgroundImage:
      "linear-gradient(180deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  creatorTitle: {
    fontFamily: "poppins",
    fontWeight: "bold",
    color: "#fbfeff",
    letterSpacing: "2px",
    wordSpacing: "8px",
  },
  dropPrice: {
    fontWeight: "400",
    fontFamily: "poppins",
    color: "#fbfeff",
    // backgroundImage:
    //   "linear-gradient(180deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
  },
}));

// COMPONENT FUNCTION
function HomeBanner() {
  const styles = useStyles();
  // Jsx
  return (
    <Link to={"/"}>
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
                  <div className="row no-gutters align-items-end justify-content-between">
                    {/* Tile and Name */}
                    <div className="col-6">
                      {/* Collection Tile */}
                      <Card className={styles.cardTheme}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            // height="140"
                            image={collectionImg}
                            alt="Kangroo Robot"
                            className={styles.cardMediaProps}
                          />
                          <CardContent style={{ padding: "8px" }}>
                            <Typography
                              variant="h5"
                              component="div"
                              className={styles.cardTitle}
                            >
                              Dire Wolf
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      {/* Creator Name */}
                      <section className="creatorName mt-2 d-flex">
                        <Link to={"/"}>
                          <Typography
                            variant="h6"
                            component="div"
                            className={styles.creatorTitle}
                          >
                            Astro League
                            <span className="px-2">
                              <CheckCircleIcon />
                            </span>
                          </Typography>
                        </Link>
                      </section>
                      <section>
                        <h4 className={styles.dropPrice}>Floor: 2.28 ETH</h4>
                      </section>
                    </div>
                    {/* View Button */}
                    <div className="col-6 text-right py-2">
                      <button className="featuredExploreBtn">View Drop</button>
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
