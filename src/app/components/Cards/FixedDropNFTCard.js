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
    // backgroundColor: theme.palette.background.paper,
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
    // height: 0,
    width: "100%",
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
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.625rem 0rem 0.25rem 0rem",
    lineHeight: "1.2",
    fontSize: "1rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "0.875rem",
    // marginTop: "0.15rem",
  },
  cardMediaImg: {
    width: "100%",
  },
}));

// CONDITIONAL STYLES

const unCommon = {
  fontFamily: "orbitron",
  color: "#007f5f",
  fontWeight: "bold",
};
const rare = {
  fontFamily: "orbitron",
  color: "#3f37c9",
  fontWeight: "bold",
};
const epic = {
  fontFamily: "orbitron",
  color: "#fb5607",
  fontWeight: "bold",
};
const legendary = {
  fontFamily: "orbitron",
  color: "#7400b8",
  fontWeight: "bold",
};
const mastercraft = {
  fontFamily: "orbitron",
  color: "#ffb600",
  fontWeight: "bold",
};

const defaultStyles = {
  fontFamily: "orbitron",
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
    <Card style={{ height: "100%" }} id="nftCardProps">
      {/* <Link to={"/dashboard/nftDetail/" + props.data._id}> */}
      <div className="row no-gutters mb-3">
        {/* NFT Image */}
        <CardMedia
          className={classes.media}
          image={props.data.nftURI}
          title="NFT Image"
        />
        {/* <div className="nftImgWrapper">
            <img
              className="myNFTImg"
              src={props.image.url}
              alt="a sample nft"
            />
          </div> */}
        {/* </CardMedia> */}
        <CardContent style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}>
          {/* <CardHeader className="text-center" title={props.data.title} /> */}
          {/* Title & Rarity */}
          <div
            className="row no-gutters justify-content-between align-items-center"
            // style={{ minHeight: "60px" }}
          >
            {/* title */}
            <div className="col-auto">
              <Typography
                variant="h6"
                component="div"
                className={classes.cardTitle}
              >
                {props.data.title}
              </Typography>
            </div>
            {/* rarity */}
            <div className="col-auto">
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
          </div>
          {/* Descriptions */}
          <div className="row no-gutters justify-content-start align-items-center pb-2">
            <Typography
              variant="body2"
              className={classes.cardDescriptions}
              component="p"
            >
              {/* <strong>Artwork Description: </strong> */}
              {/* {props.data.description} */}
              {truncate(props.data.description, 35)}
              {/* {description} */}
            </Typography>
          </div>
          <Typography
            variant="body2"
            component="p"
            className={classes.cardDescriptions}
          >
            <strong>Token Supply: </strong>
            {props.data.tokenSupply}
          </Typography>
        </CardContent>
      </div>
      {/* </Link> */}
    </Card>
  );
}

export default FixedDropNFTCard;
//User/Profile/Detail/userId
