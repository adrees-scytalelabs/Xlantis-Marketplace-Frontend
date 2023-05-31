import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MarketPlaceTabs from "../../../components/Tabs/MarketPlaceTabs";
import {
  getMarketAuction,
  getMarketFixedPrice,
} from "../../../redux/getMarketPlaceDataSlice";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

function MarketPlace(props) {
  let location = useLocation();   
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [bidableDrop, setBidableDrop] = useState([]);
  const [open, setOpen] = useState(false);
  const { fixedPriceData, fixedPriceLoading, auctionLoading, auctionData } =
    useSelector((store) => store.getMarketPlaceData);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getCubes = (start, end) => {
    handleShowBackdrop();
    let marketplaceId = location.state.marketplaceId
    dispatch(getMarketFixedPrice({ start, end,marketplaceId }));
    if (fixedPriceLoading) {
      for (let i = 0; i < fixedPriceData.length; i++) {
        if (
          fixedPriceData[i].status === "active" ||
          fixedPriceData[i].status === "pending"
        ) {
          console.log("data of fixed price i received",fixedPriceData)
          setFixedPriceDrop((prevValue) => {
            return [...prevValue, fixedPriceData[i]];
          });
        }
      }
      // setFixedPriceDrop(fixedPriceData);
      handleCloseBackdrop();
    } else if (fixedPriceLoading === 2) {
      handleCloseBackdrop();
    }
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    dispatch(getMarketAuction({ start, end }));
    if (auctionLoading === 1) {
      setBidableDrop(auctionData);
      handleCloseBackdrop();
    } else if (auctionLoading === 2) {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    getBidableDrops(0, 4);
  }, [auctionLoading]);

  useEffect(() => {
    getCubes(0, 4);
  }, [fixedPriceLoading]);

  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} role={null} />
        </div>
        <div className="row no-gutters mt-5">
          <div className="container-fluid">
            <div className="row no-gutters w-100">
              <div className="w-100">
                <div
                  className="row no-gutters justify-content-center w-100"
                  style={{ minHeight: "75vh" }}
                >
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    item
                  >
                    <MarketPlaceTabs
                      fixedPriceDrop={fixedPriceDrop}
                      fixedPriceDropLength={fixedPriceDrop.length}
                      bidableDrop={bidableDrop}
                      bidableDropLength={bidableDrop.length}
                      marketplaceId={location.state.marketplaceId}
                      open={open}
                    />
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer position={"relative"} />
    </div>
  );
}

export default MarketPlace;
