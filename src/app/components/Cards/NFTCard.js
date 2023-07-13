import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { truncate } from "../../assets/js/utils";
import TypographyText from "../Typography/TypographyText";
const styles = {
  media: {
    paddingTop: "100%",
    width: "100%",
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
};

function NFTCard(props) {
  return (
    <Link to={"/dashboard/nftDetail/" + props.data._id} state={{supply:props.data.supply,totalSupply:props.data?.totalSupply}}>
      <Card style={{ height: "100%" }} id="nftCardProps">
        <div className="row no-gutters">
          <CardMedia
            sx={styles.media}
            image={
              props.data.previewImageURI
                ? props.data.previewImageURI
                : props.data.nftURI
            }
          />
          <CardContent
            style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          >
            <div className="text-center">
              <TypographyText
                variant="h6"
                component="p"
                class={styles.cardTitle}
                value={truncate(props.data.title, 15)}
                isSpan={false}
              ></TypographyText>
            </div>
            <div className="row no-gutters justify-content-start align-items-center">
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: "#999",
                fontFamily: "inter",
                fontSize: "0.985rem",
                marginTop: "0.3rem",
              }}
            >
              <strong>Description : {""}</strong>
              {truncate(props.data.description, 50)}
            </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default NFTCard;
