import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/css/style.css";
import {
  getMarketAuction,
  getMarketFixedPrice,
} from "../../../../components/API/AxiosInterceptor";
import TrendingAndTop from "./TrendingAndTop";

function MarketPlace(props) {
  let navigate = useNavigate();
  let location = useLocation();
  const [bidableDrop, setBidableDrop] = useState([]);
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
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

  let getFixedPriceDrops = (start, end) => {
    handleShowFixedPriceBackdrop();
    let marketplaceId = location.state.marketplaceId;
    getMarketFixedPrice(start, end, marketplaceId)
      .then((response) => {
        console.log("fixed price data in marketplaceId", response);
        setFixedPriceDrop(response.data.data);
        handleCloseFixedPriceBackdrop();
      })
      .catch((error) => {
        console.log("Fixed Drop data endpoint error", error.response);
        handleCloseFixedPriceBackdrop();
      });
  };

  let getBidableDrops = (start, end) => {
    handleShowAuctionBackdrop();
    let marketplaceId = location.state.marketplaceId;
    getMarketAuction(start, end, marketplaceId)
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
    if (location.state === null || location.state === undefined) {
      navigate("/");
    } else {
      getBidableDrops(0, 4);
    }
  }, []);

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      navigate("/");
    } else {
      getFixedPriceDrops(0, 4);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Fixed Price Drops</h1>
          </div>
          <div className="col-12 col-md-6 text-md-right">
            <Link
              to={`marketPlace`}
              state={{ marketplaceId: location.state.marketplaceId }}
            >
              <h4 className="marketLinkLeads">View All</h4>
            </Link>
          </div>
        </div>
        <hr className="m-0"></hr>
        <div className="row no-gutters w-100">
          {fixedPriceDrop ? (
            <TrendingAndTop
              fixedPriceDrop={fixedPriceDrop}
              fixedPriceDropLength={fixedPriceDrop.length}
              open={fixedPriceLoaderOpen}
              type={"fixedPriceDrops"}
              marketplaceId={location.state.marketplaceId}
            />
          ) : null}
        </div>
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Bidable Drops</h1>
          </div>
          <div className="col-12 col-md-6 text-md-right">
            <Link to={`marketPlace`}>
              <h4 className="marketLinkLeads">View All</h4>
            </Link>
          </div>
        </div>
        <hr className="m-0"></hr>
        <div className="row no-gutters w-100">
          {bidableDrop ? (
            <TrendingAndTop
              bidableDrop={bidableDrop}
              bidableDropLength={bidableDrop.length}
              open={auctionLoaderOpen}
              type={"bidableDrops"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;
