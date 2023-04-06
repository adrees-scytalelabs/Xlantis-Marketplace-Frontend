import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import React from "react";
import CornerRibbon from "react-corner-ribbon";
import { truncate } from "../../assets/js/utils";

const DropNFTCard = (props) => {
  return (
    <Card
      variant="outlined"
      className={props.classes.cardHeight}
      style={{
        borderRadius: 0,
        border: "1px solid #fff",
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          className={props.classes.media}
          image={
            props.details.previewImageURI
              ? props.details.previewImageURI
              : props.details.nftURI
          }
          title="NFT Image"
        />

        {props.details.nftFormat === "mp3" ? (
          <div
            style={{
              position: "absolute",
              left: "75%",
              bottom: "5%",
            }}
          >
            {props.details.isPlaying === false ? (
              <button
                className="btn"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,.5)",
                  border: "#9f9f9f",
                }}
                onClick={(e) => props.handlePlay(e, props.details)}
              >
                <PlayArrow />
              </button>
            ) : (
              <button
                className="btn"
                style={{
                  borderRadius: "80%",
                  backgroundColor: "rgba(0,0,0,.5)",
                  border: "#9f9f9f",
                }}
                onClick={(e) => props.handlePause(e, props.details)}
              >
                <Pause />
              </button>
            )}
          </div>
        ) : null}
        {props.details.currentMarketplaceId.isSold === true ? (
          <CornerRibbon
            position="top-right"
            fontColor="#f0f0f0"
            backgroundColor="#f44336"
            style={{ fontWeight: "bold" }}
          >
            SOLD
          </CornerRibbon>
        ) : null}
      </div>
      <CardContent>
        <div
          className="row no-gutters justify-content-between"
          style={{ minHeight: "60px" }}
        >
          <div className="col-lg-8 align-self-end">
            <Typography
              variant="h6"
              component="div"
              className={props.cardClasses.cardTitle}
            >
              {props.details.title.length > 12 ? (
                <span>{props.details.title.slice(0, 7)}...</span>
              ) : (
                props.details.title
              )}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={props.cardClasses.cardDescriptions}
            >
              {truncate(props.details.description, 25)}
            </Typography>
          </div>
          <div className="col-lg-4 align-self-end text-center text-lg-right py-3  p-lg-0">
            <p className="nftPrice mb-0 p-0" style={{ lineHeight: "1.6" }}>
              {props.details.currentMarketplaceId.price} USD
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DropNFTCard;
