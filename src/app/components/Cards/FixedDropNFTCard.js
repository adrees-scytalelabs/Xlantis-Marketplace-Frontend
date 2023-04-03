import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { truncate } from "../../assets/js/utils";
import { drop } from "lodash";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    
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
    width: "100%",
    paddingTop: "100%",
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
    fontSize: "1rem",
    lineHeight: 1,
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "0.875rem",
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


function FixedDropNFTCard(props) {
  console.log("props nftCrad", props);
  const classes = useStyles();
  const rarity = props.type;
  let singleNFTid = props.data._id;
  console.log("NFT id for fixed drop: ", singleNFTid);

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
    <Link
      to={{
        pathname: `/fixedDropNFTHome/${singleNFTid}`,
        state: {
          nftDetails: props.data,
          dropId: props.data.dropId,
          // isSold: props.data.currentMarketplaceId.isSold,
          // price: props.data.currentMarketplaceId.price,
          saleType: props.saleType,
          description: props.description,
         
        },
      }}
    >
      <Card style={{ height: "100%" }} id="nftCardProps">
        {/* <Link to={"/dashboard/nftDetail/" + props.data._id}> */}
        <div className="row no-gutters mb-3">
          {/* NFT Image */}
          <CardMedia
            className={classes.media}
            image={props.data.nftURI}
            title="NFT Image"
          />
          {/* </CardMedia> */}
          <CardContent
            style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          >
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
                {truncate(props.data.description, 30)}
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
    </Link>
  );
}

export default FixedDropNFTCard;
