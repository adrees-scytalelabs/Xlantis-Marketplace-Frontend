// REACT
import React from "react";
// MUI
import { Grid } from "@material-ui/core/";
// COMPONENTS
import HeaderHome from "../../../components/Headers/Header";
import FixedDropNFTCard from "../../../components/Cards/FixedDropNFTCard";
// UTILS
import { nftImage } from "../../../assets/js/images";

// COMPONENT FUNCTION
const FixedPriceDropNFTs = () => {
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        {/* Header */}
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} />
        </div>
        {/* Body */}
        <div className="container-fluid mt-5">
          <div className="row no-gutters">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              item
            >
              <FixedDropNFTCard image={nftImage[0]} type={"Epic"} />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedPriceDropNFTs;
