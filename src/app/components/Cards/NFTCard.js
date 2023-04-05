import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { truncate } from "../../assets/js/utils";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";

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
    paddingTop: "100%",
    width: "100%",
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
    <Link to={"/dashboard/nftDetail/" + props.data._id}>
      <Card style={{ height: "100%" }} id="nftCardProps">
        <div className="row no-gutters">
          <CardMedia className={classes.media} image={props.data.nftURI} />
          <CardContent
            style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          >
            <div className="row no-gutters justify-content-start align-items-center">
              <Typography
                variant="h6"
                component="p"
                className={classes.cardTitle}
              >
                {props.data.title}
              </Typography>
            </div>
            <div className="row no-gutters justify-content-start align-items-center">
              <Typography
                variant="body2"
                className={classes.cardDescriptions}
                component="p"
                style={{ minHeight: "2.5rem" }}
              >
                {truncate(props.data.description, 35)}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default NFTCard;
//User/Profile/Detail/userId
