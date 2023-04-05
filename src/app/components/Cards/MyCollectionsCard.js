import React from "react";
// REACT ROUTER
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// UTILS
import { truncate } from "../../assets/js/utils";

// STYLES
const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    paddingTop: "100%",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "0.625rem 0rem 0.25rem 0rem",
    lineHeight: "1.2",
    fontSize: "1rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "0.875rem",
    marginTop: "0.15rem",
  },
}));


const MyCollectionsCard = (props) => {
  const classes = useStyles();

  return (
    <Card style={{ height: "100%" }} id="collectionCardProps">
      <div className="row no-gutters">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.i.thumbnail}
            title="Collection thumbnail"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              className={`${classes.cardTitle}`}
              component="div"
            >
              {props.i.name}
            </Typography>
            {/* Descriptions */}
            <div className="row no-gutters justify-content-start align-items-center pb-2">
              <Typography
                variant="body2"
                className={classes.cardDescriptions}
                component="p"
              >
                {truncate(props.i.description, 35)}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default MyCollectionsCard;
