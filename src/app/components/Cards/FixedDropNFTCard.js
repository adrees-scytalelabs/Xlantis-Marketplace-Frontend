import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { truncate } from "../../assets/js/utils";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import CornerRibbon from "react-corner-ribbon";

const unCommon = {
  fontFamily: "orbitron",
  color: "#007f5f",
  fontWeight: "bold",
};
const rare = {
  fontFamily: "orbitron",
  color: "#3f37c9",
  fontWeight: "bold",
};
const epic = {
  fontFamily: "orbitron",
  color: "#fb5607",
  fontWeight: "bold",
};
const legendary = {
  fontFamily: "orbitron",
  color: "#7400b8",
  fontWeight: "bold",
};
const mastercraft = {
  fontFamily: "orbitron",
  color: "#ffb600",
  fontWeight: "bold",
};

const defaultStyles = {
  fontFamily: "orbitron",
  color: "#04111D",
  fontWeight: "bold",
};

function FixedDropNFTCard(props) {
  const rarity = props.type;
  let singleNFTid = props.data._id;
  const selectedRarity = {
    style:
      rarity === "Common"
        ? defaultStyles
        : rarity === "Uncommon"
          ? unCommon
          : rarity === "Rare"
            ? rare
            : rarity === "Epic"
              ? epic
              : rarity === "Legendary"
                ? legendary
                : rarity === "Mastercraft"
                  ? mastercraft
                  : defaultStyles,
  };
  useEffect(()=>{
      console.log("props data in single nft",props.orderListing)
  },[props])

  return (
    <Link
      to={`/fixedDropNFTHome/${singleNFTid}`}
      state={{
        nftDetails: props.data,
        orderListing:props.orderListing,
        dropId: props.data.dropId,
        saleType: props.saleType,
        description: props.description,
        imageURL: props.titleImage,
        bannerURL: props.dropbanner
      }}
    >
      <Card
        variant="outlined"
        sx={props.classes.cardHeight}
        style={{
          backgroundColor: 'black',
          borderRadius: 0,
          border: "1px solid #fff",
        }}
      >
        <div style={{ position: "relative" }}>
          <CardMedia
            sx={props.classes.media}
            image={props.data.nftURI}
            title="NFT Image"
          />
          {props.data.currentOrderListingId.isSold === true ? (
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
        <CardContent
          className="mb-3"
          style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
        >
          <div
            className="row no-gutters justify-content-between align-items-center"
          >
            <div className="col-auto">
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#fff",
                  fontFamily: "orbitron",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  margin: "0.625rem 0rem 0.25rem 0rem",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                {truncate(props.data.title, 15)}
              </Typography>
            </div>
            <div className="col-auto">
              <Typography
                variant="body2"
                component="p"
                style={selectedRarity.style}
              >
                {rarity}
              </Typography>
            </div>
          </div>
          <div className="row no-gutters justify-content-start align-items-center pb-2">
            <Typography
              variant="body2"
              sx={{
                color: "#999",
                fontFamily: "inter",
                fontSize: "0.875rem",
              }}
              component="p"
            >
              {truncate(props.data.description, 50)}
            </Typography>
          </div>
          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "#999",
              fontFamily: "inter",
              fontSize: "0.875rem",
            }}
          >
            <strong>Token Supply: </strong>
            {props.orderListing.supply}
          </Typography>
        </CardContent>

      </Card>
    </Link>
  );
}

export default FixedDropNFTCard;
