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
  cardMediaImg: {
    width: "100%",
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

// COMPONENT FUNCTION
function FixedDropNFTCard(props) {
  console.log("props", props);
  const classes = useStyles();
  const rarity = props.type;
  let description =
    "This is a short description for this NFT. It is out of the box.";

  // Styling
  const selectedRarity = {
    style:
      rarity === "Common"
        ? defaultStyles
        : rarity === "Uncommon"
        ? unCommon
        : rarity === "Rare"
        ? rare
        : rarity === "Epic"
        ? epic
        : rarity === "Legendary"
        ? legendary
        : rarity === "Mastercraft"
        ? mastercraft
        : defaultStyles,
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
      {/* <Link to={"/dashboard/nftDetail/" + props.data._id}> */}
      <Card style={{ height: "100%" }} id="nftCardProps">
        <div className="row no-gutters mb-3">
          {/* NFT Image */}
          <CardMedia
            className={classes.cardMediaImg}
            // variant="outlined"
            // style={{
            //   border:
            //     rarity === "Mastercraft"
            //       ? "4px solid #ff0000"
            //       : rarity === "Legendary"
            //       ? "4px solid #FFD700"
            //       : rarity === "Epic"
            //       ? "4px solid #9400D3"
            //       : rarity === "Rare"
            //       ? "4px solid #0000FF"
            //       : rarity === "Uncommon"
            //       ? "4px solid #008000"
            //       : rarity === "Common"
            //       ? "4px solid #FFFFFF"
            //       : "none",
            // }}
            // className={classes.media}
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
                {/* {props.data.title} */}
                Card Title
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
                {/* {props.data.description} */}
                {truncate(description, 35)}
                {/* {description} */}
              </Typography>
            </div>
            {/* Rarity */}
            <div className="row no-gutters justify-content-start align-items-center">
              <Typography
                variant="body2"
                component="p"
                // className={classes.commonRarity}
                style={selectedRarity.style}
              >
                {/* <strong>Token Rarity: </strong> */}
                {rarity}
              </Typography>
            </div>
            <Typography
              variant="body2"
              component="p"
              className={classes.cardDescriptions}
            >
              <strong>Token Supply: </strong>
              {/* {props.data.tokenSupply} */}
              150
            </Typography>
          </CardContent>
        </div>
      </Card>
      {/* </Link> */}
    </Grid>
  );
}

export default FixedDropNFTCard;
//User/Profile/Detail/userId
