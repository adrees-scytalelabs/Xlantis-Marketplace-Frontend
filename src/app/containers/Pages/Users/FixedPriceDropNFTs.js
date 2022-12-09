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
        {/* Banner and Thumb */}
        <div className="row no-gutters">
          <div className="col-12">
            <div className="bannerWrapper">
              {/* banner */}
              <img
                src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
                className="bannerImg"
              />

              {/* thumbg */}
              <div className="dropThumbWrapper">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
                  className="thumbImg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* NFTs */}
        <div className="container-fluid mt-5">
          {/* Heading */}
          <div className="row no-gutters justify-content-start align-items-end my-4 pt-5">
            {/* On Sale */}
            <div className="col-12">
              <h1 className="marketCatHeadings">NFTs inside Sample Drop </h1>
            </div>
            <div className="col-12">
              <h3 style={{ fontFamily: "inter" }}>Fixed Price Drop</h3>
            </div>
          </div>
          {/* NFT Cards */}
          <div className="row no-gutters w-100">
            <Grid container spacing={3}>
              {nftImage.map((i, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={2}
                  spacing={1}
                  direction="row"
                  key={index}
                >
                  <FixedDropNFTCard image={nftImage[index]} type={"Epic"} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedPriceDropNFTs;
