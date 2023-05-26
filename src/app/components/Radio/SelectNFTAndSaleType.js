import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

const styles = {
  tooltip: {
    fontSize: "16px",
  },
};

function SelectNFTAndSaleType({
  label,
  onChange,
  onChangeWorkInProgress,
  type,
  radioType,
}) {
  const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
  const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";
  const AuctionText =
    "Auction will have bidding for NFTs and after some time NFT will be sold to best bidder.";
  const FixedPriceText =
    "In Fixed-Price sale NFT will be sold to buyer on the spot.";

  let checkedFirst = false;
  let checkedSecond = true;
  let labelFirst = radioType === "nft" ? "Single" : "Auction";
  let labelSecond = radioType === "nft" ? "Mutliple" : "Fixed-Price";

  if (radioType === "nft" && type === "721") {
    checkedFirst = true;
  } else if (radioType === "sale" && type === "auction") {
    checkedFirst = true;
  }

  if (radioType === "nft" && type === "1155") {
    checkedSecond = true;
  } else if (radioType === "sale" && type === "fixed-price") {
    checkedSecond = true;
  }

  return (
    <div>
      <FormControl component="fieldset">
        <label
          component="legend"
          style={{ fontWeight: "bold", fontFamily: "orbitron" }}
        >
          {label}
        </label>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <Tooltip
            title={
              radioType === "nft" ? (
                <Typography fontSize={18}>{Text721}</Typography>
              ) : (
                <Typography fontSize={18}>{AuctionText}</Typography>
              )
            }
            placement="bottom"
            classes={{ tooltip: styles.tooltip }}
          >
            <FormControlLabel
              style={{ color: "white" }}
              value={radioType === "nft" ? "ERC721" : "auction"}
              onChange={onChangeWorkInProgress}
              checked={checkedFirst}
              control={<Radio style={{ color: "#fff" }} />}
              label={
                <span style={{ fontSize: "0.9rem" }}>
                  {labelFirst}{" "}
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </span>
              }
            />
          </Tooltip>
          <Tooltip
          placement="bottom"
            title={
              radioType === "nft" ? (
                <Typography fontSize={18}>{Text1155}</Typography>
              ) : (
                <Typography fontSize={18}>{FixedPriceText}</Typography>
              )
            }
            
          >
            <FormControlLabel
              style={{ color: "white" }}
              value={radioType === "nft" ? "ERC1155" : "fixed-price"}
              onChange={onChange}
              checked={checkedSecond}
              control={<Radio style={{ color: "#fff" }} />}
              label={
                <span style={{ fontSize: "0.9rem" }}>
                  {labelSecond}{" "}
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </span>
              }
            />
          </Tooltip>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default SelectNFTAndSaleType;
