import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/css/style.css";
import { getMarketFixedPrice } from "../../../../components/API/AxiosInterceptor";
import { getMarketAuction } from "../../../../redux/getMarketPlaceDataSlice";
import TrendingAndTop from "./TrendingAndTop";

function MarketPlace(props) {
  let navigate = useNavigate();
  let location = useLocation();
  const [bidableDrop, setBidableDrop] = useState([]);
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [open, setOpen] = useState(false);
  const { auctionLoading, auctionData } = useSelector(
    (store) => store.getMarketPlaceData
  );
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getCubes = (start, end) => {
    handleShowBackdrop();
    let marketplaceId = location.state.marketplaceId;
    getMarketFixedPrice(start, end, marketplaceId)
      .then((response) => {
        console.log("fixed price data in marketplaceId", response);
        setFixedPriceDrop(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("Fixed Drop data endpoint error", error.response);
        handleCloseBackdrop();
      });
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    //let marketplaceId = location.state.marketplaceId;
    // dispatch(getMarketAuction({ start, end, marketplaceId }));
    // if (auctionLoading === 1) {
    //   setBidableDrop(auctionData);
    //   handleCloseBackdrop();
    // } else if (auctionLoading === 2) {
    //   handleCloseBackdrop();
    // }
  };

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      navigate("/");
    } else {
      getBidableDrops(0, 4);
    }
  }, [auctionLoading]);
  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      navigate("/");
    } else {
      getCubes(0, 4);
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
              open={open}
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
