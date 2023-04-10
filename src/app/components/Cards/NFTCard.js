import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { truncate } from "../../assets/js/utils";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { truncate } from "../../assets/js/utils";
import TypographyText from "../Typography/TypographyText";
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

function NFTCard(props) {
  const classes = useStyles();

  return (
    <Link to={"/dashboard/nftDetail/" + props.data._id}>
      <Card style={{ height: "100%" }} id="nftCardProps">
        <div className="row no-gutters">
          <CardMedia className={classes.media} image={props.data.nftURI} />
          <CardContent
            style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          >
            <div className="row no-gutters justify-content-start align-items-center">
            <TypographyText variant = "h6" component="p" class={classes.cardTitle} value = {props.data.title} isSpan = {false}></TypographyText>

            </div>
            <div className="row no-gutters justify-content-start align-items-center">
              <TypographyText variant = "body2" component="p" style={{ minHeight: "2.5rem" }} class={classes.cardDescriptions} value = {truncate(props.data.description, 35)} isSpan = {false}></TypographyText>         
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default NFTCard;
