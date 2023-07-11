import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import CornerRibbon from "react-corner-ribbon";
import { truncate } from "../../assets/js/utils";

const DropNFTCard = (props) => {
  return (
    <Card
      variant="outlined"
      sx={props.classes.cardHeight}
      style={{
        borderRadius: 0,
        border: "1px solid #fff",
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          sx={props.classes.media}
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
                <PlayArrowIcon />
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
                <PauseIcon />
              </button>
            )}
          </div>
        ) : null}
        {props.details.currentOrderListingId.isSold === true ? (
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
        <div style={{ minHeight: "60px" }}>
          <div className="align-self-end">
            <div className="text-center">
              <Typography
                variant="h6"
                component="div"
                sx={props.cardClasses.cardTitle}
              >
                {truncate(props.details.title, 15)}
              </Typography>
            </div>    
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
              {truncate(props.details.description, 50)}
            </Typography>
          </div>
        </div>
        <div className="align-self-end text-center text-lg-right py-3  p-lg-0">
          <p className="nftPrice mb-0 p-0" style={{ lineHeight: "1.6" }}>
            {props.details.currentOrderListingId.price} USD
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DropNFTCard;
