import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import React from "react";
import CornerRibbon from "react-corner-ribbon";

const MyDropNFTsCard = (props) => {
  return (
    <Card
      style={{
        height: "100%",
        backgroundColor: "black",
        border: "1px solid white",
        color: "white",
      }}
      variant="outlined"
      className={props.classes.cardHeight}
    >
      <div style={{ position: "relative" }}>
        {props.nftDetails.currentMarketplaceId.isSold === true ? (
          <CornerRibbon
            position="top-right"
            fontColor="#f0f0f0"
            backgroundColor="#4caf50"
            style={{ fontWeight: "bold" }}
          >
            SOLD
          </CornerRibbon>
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        <CardMedia
          variant="outlined"
          style={{
            border:
              props.nftDetails.type === "Mastercraft"
                ? "4px solid #ff0000"
                : props.nftDetails.type === "Legendary"
                ? "4px solid #FFD700"
                : props.nftDetails.type === "Epic"
                ? "4px solid #9400D3"
                : props.nftDetails.type === "Rare"
                ? "4px solid #0000FF"
                : props.nftDetails.type === "Uncommon"
                ? "4px solid #008000"
                : props.nftDetails.type === "Common"
                ? "4px solid #FFFFFF"
                : "none",
          }}
          className={props.classes.media}
          image={
            props.nftDetails.previewImageURI
              ? props.nftDetails.previewImageURI
              : props.nftDetails.nftURI
          }
          title="NFT Image"
        />

        {props.nftDetails.nftFormat === "mp3" ? (
          <div
            style={{
              position: "absolute",
              left: "75%",
              bottom: "5%",
            }}
          >
            {props.nftDetails.isPlaying === false ? (
              <button
                className="btn"
                style={{
                  borderRadius: "80%",
                  backgroundColor: "rgba(0,0,0,.5)",
                  border: "#9f9f9f",
                }}
                onClick={(e) => props.handlePlay(e, props.nftDetails)}
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
                onClick={(e) => props.handlePause(e, props.nftDetails)}
              >
                <Pause />
              </button>
            )}
          </div>
        ) : null}
      </div>
      <CardContent>
        <div
          className="row no-gutters justify-content-between"
          style={{ minHeight: "60px" }}
        >
          <div className="col-8 align-self-end">
            <Typography variant="h6" className={props.classes.cardTitle}>
              {props.nftDetails.title.length > 12 ? (
                <span>{props.nftDetails.title.slice(0, 7)}...</span>
              ) : (
                props.nftDetails.title
              )}
            </Typography>
            <Typography
              variant="body2"
              className={props.classes.cardDescriptions}
            >
              <strong>Artwork Description: </strong>
              {props.nftDetails.description}
            </Typography>
          </div>
          <div className="col-4 align-self-end text-right p-0">
            <p className="nftPrice mb-0 p-0">
              {props.nftDetails.currentMarketplaceId.price} USD
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyDropNFTsCard;
