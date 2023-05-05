import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import "../../../../assets/css/style.css";
import { getMarketAuction, getMarketFixedPrice } from "../../../../redux/getMarketPlaceDataSlice";
import TrendingAndTop from "./TrendingAndTop";


function MarketPlace(props) {
  const [bidableDrop, setBidableDrop] = useState([]);
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [open, setOpen] = useState(false);
  const { fixedPriceData, fixedPriceLoading, auctionLoading, auctionData } = useSelector((store) => store.getMarketPlaceData);
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getCubes = (start, end) => {
    handleShowBackdrop();
    dispatch(getMarketFixedPrice({ start, end }))
    if (fixedPriceLoading) {
      console.log("data of fixed price",fixedPriceData)
      setFixedPriceDrop(fixedPriceData);
      handleCloseBackdrop();
    }
    else if (fixedPriceLoading === 2) {
      handleCloseBackdrop();
    }
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    dispatch(getMarketAuction({ start, end }));
    if (auctionLoading === 1) {
      setBidableDrop(auctionData);
      handleCloseBackdrop();
    }
    else if (auctionLoading === 2) {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    console.log("i am in this")
    getBidableDrops(0, 4);
  }, [auctionLoading]);

  useEffect(() => {
    getCubes(0, 4);
  }, [fixedPriceLoading]);

  return (
    <div className="container-fluid">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Fixed Price Drops</h1>
          </div>
          <div className="col-12 col-md-6 text-md-right">
            <Link to="/marketPlace">
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
              open={open}
              type={"fixedPriceDrops"}
            />
          ) : null}
        </div>
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Bidable Drops</h1>
          </div>
          <div className="col-12 col-md-6 text-md-right">
            <Link to="/marketPlace">
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
              open={open}
              type={"bidableDrops"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;
