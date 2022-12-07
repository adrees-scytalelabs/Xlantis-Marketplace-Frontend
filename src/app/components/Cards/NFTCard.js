import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { truncate } from "../../assets/js/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  card: {
    minWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardTitle: {
    color: "#04111D",
    fontFamily: "poppins",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.625rem 0rem 0.25rem 0rem",
    lineHeight: "1.2",
    fontSize: "1rem",
  },
  cardDescriptions: {
    color: "#444",
    fontFamily: "poppins",
    fontSize: "0.875rem",
    // marginTop: "0.15rem",
  },
}));

// CONDITIONAL STYLES

const unCommon = {
  fontFamily: "poppins",
  color: "#007f5f",
  fontWeight: "bold",
};
const rare = {
  fontFamily: "poppins",
  color: "#3f37c9",
  fontWeight: "bold",
};
const epic = {
  fontFamily: "poppins",
  color: "#fb5607",
  fontWeight: "bold",
};
const legendary = {
  fontFamily: "poppins",
  color: "#7400b8",
  fontWeight: "bold",
};
const mastercraft = {
  fontFamily: "poppins",
  color: "#ffb600",
  fontWeight: "bold",
};

const defaultStyles = {
  fontFamily: "poppins",
  color: "#04111D",
  fontWeight: "bold",
};

function NFTCard(props) {
  console.log("props", props);
  const classes = useStyles();

  // Styling
  const selectedRarity = {
    style:
      props.data.type === "Common"
        ? defaultStyles
        : props.data.type === "Uncommon"
        ? unCommon
        : props.data.type === "Rare"
        ? rare
        : props.data.type === "Epic"
        ? epic
        : props.data.type === "Legendary"
        ? legendary
        : props.data.type === "Mastercraft"
        ? mastercraft
        : defaultStyles,
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
      <Link to={"/dashboard/nftDetail/" + props.data._id}>
        <Card style={{ height: "100%" }} id="nftCardProps">
          <div className="row no-gutters mb-3">
            {/* NFT Image */}
            <CardMedia
            // variant="outlined"
            // style={{
            //   border:
            //     props.data.type === "Mastercraft"
            //       ? "4px solid #ff0000"
            //       : props.data.type === "Legendary"
            //       ? "4px solid #FFD700"
            //       : props.data.type === "Epic"
            //       ? "4px solid #9400D3"
            //       : props.data.type === "Rare"
            //       ? "4px solid #0000FF"
            //       : props.data.type === "Uncommon"
            //       ? "4px solid #008000"
            //       : props.data.type === "Common"
            //       ? "4px solid #FFFFFF"
            //       : "none",
            // }}
            //   className={classes.media}
            //   image={
            //     props.data.previewImageURI
            //       ? props.data.previewImageURI
            //       : props.data.nftURI
            //   }
            //   title="NFT Image"
            >
              <div className="nftImgWrapper">
                <img
                  className="myNFTImg"
                  src={props.image.url}
                  alt="a sample nft"
                />
              </div>
            </CardMedia>
            <CardContent
              style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
            >
              {/* <CardHeader className="text-center" title={props.data.title} /> */}
              {/* Title */}
              <div
                className="row no-gutters justify-content-start align-items-center"
                // style={{ minHeight: "60px" }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  className={classes.cardTitle}
                >
                  {props.data.title}
                </Typography>
              </div>
              {/* Descriptions */}
              <div className="row no-gutters justify-content-start align-items-center">
                <Typography
                  variant="body2"
                  className={classes.cardDescriptions}
                  component="p"
                  style={{ minHeight: "2.5rem" }}
                >
                  {/* <strong>Artwork Description: </strong> */}
                  {truncate(props.data.description, 35)}
                  {/* {props.data.description} */}
                </Typography>
              </div>
              {/* Rarity */}
              {/* <div className="row no-gutters justify-content-start align-items-center">
                <Typography
                  variant="body2"
                  component="p"
                  // className={classes.commonRarity}
                  style={selectedRarity.style}
                >
                  <strong>Token Rarity: </strong>
                  {props.data.type}
                </Typography>
              </div> */}

              {/* <Typography
                variant="body2"
                component="p"
                className={classes.cardDescriptions}
              >
                <strong>Token Supply: </strong>
                {props.data.tokenSupply}
                150
              </Typography> */}
              {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Image Artist</Typography>
                        <Link to={"/User/Profile/Detail/imageArtist/" + props.data.ImageArtistId + "/null"} style={{ color: '#000' }}>
                            <CardHeader
                                avatar={<Avatar src={props.data.ImageArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                title={props.data.ImageArtistName}
                                subheader={props.data.ImageArtistAbout}
                            />
                        </Link>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Website URL: </strong>{props.data.ImageArtistWebsite}
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Producer</Typography>
                        <Link to={"/User/Profile/Detail/producer/" + props.data.ProducerId + "/null"} style={{ color: '#000' }}>
                            <CardHeader
                                avatar={<Avatar src={props.data.ProducerProfile} aria-label="Producer" className={classes.avatar} />}
                                title={props.data.ProducerName}
                                subheader={props.data.ProducerInspiration}
                            />
                        </Link>
                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Executive Producer</Typography>
                        <Link to={"/User/Profile/Detail/executiveProducer/" + props.data.ExecutiveProducerId + "/null"} style={{ color: '#000' }}>
                            <CardHeader
                                avatar={<Avatar src={props.data.ExecutiveProducerProfile} aria-label="Executive Producer" className={classes.avatar} />}
                                title={props.data.ExecutiveProducerName}
                                subheader={props.data.ExecutiveProducerInspiration}
                            />
                        </Link>
                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Fan</Typography>
                        <Link to={"/User/Profile/Detail/fan/" + props.data.FanId + "/null"} style={{ color: '#000' }}>
                            <CardHeader
                                avatar={<Avatar src={props.data.FanProfile} aria-label="Fan" className={classes.avatar} />}
                                title={props.data.FanName}
                                subheader={props.data.FanInspiration}
                            />
                        </Link>

                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Other: </strong>{props.data.other}
                        </Typography> */}
            </CardContent>
          </div>
        </Card>
      </Link>
    </Grid>
  );
}

export default NFTCard;
//User/Profile/Detail/userId
