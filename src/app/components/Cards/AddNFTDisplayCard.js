import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { truncate } from "../../assets/js/utils";
const AddNFTDisplayCard = (props) => {
  return (
    <>
      <Card id="nftCardProps">
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
          <div className="text-center">
            <Typography variant="h6" component="p" sx={props.classes.cardTitle}>
              {truncate(props.nftDetail.title, 15)}
            </Typography>
          </div>
        </CardContent>
      </Card>
      {props.place === "list" ? (
        <CardActions>
          <Button
            onClick={(e) => {
              props.handleRemoveNFT(e, props.nftDetail._id, props.index);
            }}
            className="btn btn-sm btn-block propsActionBtn"
          >
            Remove NFT
          </Button>
        </CardActions>
      ) : null}
    </>
  );
};

export default AddNFTDisplayCard;
