import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/style.css";
import {
  getDropsInAuctionPaginated,
  getDropsInFixedPriceSalePaginated,
} from "../../../../components/API/AxiosInterceptor";
import TrendingAndTop from "./TrendingAndTop";

function MarketPlace(props) {
  const [bidableDrop, setBidableDrop] = useState([]);
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getCubes = (start, end) => {
    handleShowBackdrop();

    let version = Cookies.get("Version");
    getDropsInFixedPriceSalePaginated(start, end)
      .then((response) => {
        setFixedPriceDrop(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      });
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    getDropsInAuctionPaginated(start, end)
      .then((response) => {
        console.log("res >>> ", response);
        setBidableDrop(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("could not get bidable drops ", error.response);
        handleCloseBackdrop();
      });
  };

  useEffect(() => {
    getCubes(0, 4);
    getBidableDrops(0, 4);
  }, []);

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
