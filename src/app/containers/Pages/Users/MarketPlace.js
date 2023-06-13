import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getMarketAuction,
  getMarketFixedPrice,
} from "../../../components/API/AxiosInterceptor";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MarketPlaceTabs from "../../../components/Tabs/MarketPlaceTabs";

function MarketPlace(props) {
  let location = useLocation();
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [bidableDrop, setBidableDrop] = useState([]);
  const [fixedPriceLoaderOpen, setFixedPriceLoaderOpen] = useState(false);
  const [auctionLoaderOpen, setAuctionLoaderOpen] = useState(false);

  const handleCloseFixedPriceBackdrop = () => {
    setFixedPriceLoaderOpen(false);
  };
  const handleShowFixedPriceBackdrop = () => {
    setFixedPriceLoaderOpen(true);
  };

  const handleCloseAuctionBackdrop = () => {
    setAuctionLoaderOpen(false);
  };
  const handleShowAuctionBackdrop = () => {
    setAuctionLoaderOpen(true);
  };

  let getCubes = (start, end) => {
    handleShowFixedPriceBackdrop();
    let marketplaceId = location.state.marketplaceId;
    getMarketFixedPrice(start, end, marketplaceId)
      .then((response) => {
        setFixedPriceDrop(response.data.data);
        handleCloseFixedPriceBackdrop();
      })
      .catch((error) => {
        console.log("Error in fixed price drop data", error.data);
        handleCloseFixedPriceBackdrop();
      });
  };

  let getBidableDrops = (start, end) => {
    handleShowAuctionBackdrop();
    getMarketAuction(start, end)
      .then((response) => {
        console.log("Response from getting auction drops: ", response);
        setBidableDrop(response.data.auctionData);
        handleCloseAuctionBackdrop();
      })
      .catch((error) => {
        console.log("Error from getting auction drops: ", error);
        handleCloseAuctionBackdrop();
      });
  };

  useEffect(() => {
    getBidableDrops(0, 4);
  }, []);

  useEffect(() => {
    getCubes(0, 4);
  }, []);

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
                      fixedPriceOpen={fixedPriceLoaderOpen}
                      auctionOpen={auctionLoaderOpen}
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
