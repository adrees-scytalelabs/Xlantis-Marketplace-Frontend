import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
const AddNFTDisplayCard = (props) => {
  return (
    <Card style={{ height: "100%" }} id="nftCardProps">
      <CardMedia
        variant="outlined"
        sx={props.classes.media}
        image={
          props.nftDetail.previewImageURI
            ? props.nftDetail.previewImageURI
            : props.nftDetail.nftURI
        }
        title="NFT Image"
      />
      <CardContent
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          width: "100%",
        }}
      >
        <div className="row no-gutters justify-content-start align-items-center">
          <Typography
            variant="h6"
            component="p"
            sx={props.classes.cardTitle}
          >
            {props.nftDetail.title}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNFTDisplayCard;
