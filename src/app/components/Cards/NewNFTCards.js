import { Card, CardContent, CardHeader, CardMedia, Grid } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';
import TypographyText from '../Typography/TypographyText';
const styles = {
  media: {
    height: 0,
    paddingTop: "100%",
  },
}

function NewNFTCard(props) {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card style={{ height: "100%" }} variant="outlined">
        <CardHeader className="text-center" title={props.data.title} />
        <CardMedia
          variant="outlined"
          style={{
            border:
              props.data.type === "Mastercraft"
                ? "4px solid #ff0000"
                : props.data.type === "Legendary"
                  ? "4px solid #FFD700"
                  : props.data.type === "Epic"
                    ? "4px solid #9400D3"
                    : props.data.type === "Rare"
                      ? "4px solid #0000FF"
                      : props.data.type === "Uncommon"
                        ? "4px solid #008000"
                        : props.data.type === "Common"
                          ? "4px solid #FFFFFF"
                          : "none",
          }}
          className={classes.media}
          image={props.data.artwork}
          title="NFT Image"
        />
        <CardContent>
          <TypographyText variant="body2" key="Artwork Description: " value={props.data.description} isSpan={false}></TypographyText>
          <TypographyText variant="body2" key="Token Rarity: " value={props.data.type}></TypographyText>
          <TypographyText variant="body2" key="Token Supply: " value={props.data.tokensupplyalternative}></TypographyText>

          <TypographyText variant="h6" value="Image Artist"></TypographyText>


          <Link
            to={
              "/User/Profile/Detail/imageArtist/" +
              props.data.ImageArtistId +
              "/null"
            }
            style={{ color: "#000" }}
          >
            <CardHeaderWithAvatar
              src={props.data.ImageArtistProfile}
              title={props.data.ImageArtistName}
              subheader={props.data.ImageArtistAbout}
            />
          </Link>
          <TypographyText variant="body2" key="Website URL: " value={props.data.ImageArtistWebsite}></TypographyText>
          <TypographyText variant="h6" value="Producer"></TypographyText>

          <Link
            to={
              "/User/Profile/Detail/producer/" + props.data.ProducerId + "/null"
            }
            style={{ color: "#000" }}
          >
            <CardHeaderWithAvatar
              src={props.data.ProducerProfile}
              title={props.data.ProducerName}
              subheader={props.data.ProducerInspiration}
            />
          </Link>
          <TypographyText variant="h6" value="Executive Producer"></TypographyText>


          <Link
            to={
              "/User/Profile/Detail/executiveProducer/" +
              props.data.ExecutiveProducerId +
              "/null"
            }
            style={{ color: "#000" }}
          >
            <CardHeaderWithAvatar
              src={props.data.ExecutiveProducerProfile}
              title={props.data.ExecutiveProducerName}
              subheader={props.data.ExecutiveProducerInspiration}
            />
          </Link>
          <TypographyText key="Other: " value={props.data.other}></TypographyText>


          <Link
            to={"/User/Profile/Detail/fan/" + props.data.FanId + "/null"}
            style={{ color: "#000" }}
          >
            <CardHeaderWithAvatar
              src={props.data.FanProfile}
              title={props.data.FanName}
              subheader={props.data.FanInspiration}
            />
          </Link>
          <TypographyText key="Other: " value={props.data.other}></TypographyText>


        </CardContent>
      </Card>
    </Grid>
  );
}

export default NewNFTCard;
