import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { truncate } from "../../assets/js/utils";

const styles = {
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
};

const CategoryDropsCards = (props) => {
  useEffect(() => {
    console.log("Props in in in: ", props);
  }, []);

  return (
    <Card style={{ height: "100%" }} id="collectionCardProps">
      <div className="row no-gutters">
        <CardActionArea>
          <CardMedia
            sx={styles.media}
            image={props.i.image}
            title="Collection thumbnail"
          />
          <CardContent>
            <div className="text-center">
              <Typography
                gutterBottom
                variant="h6"
                sx={styles.cardTitle}
                component="div"
              >
                {truncate(props.i.title, 15)}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default CategoryDropsCards;
