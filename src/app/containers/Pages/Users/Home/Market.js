import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrendingAndTop from "./TrendingAndTop";
import "../../../../assets/css/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function MarketPlace(props) {
  const classes = useStyles();
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
    let endpoint;
    if(version === undefined) {
      endpoint  = `/drop/saleType/fixed-price/${start}/${end}`;
    }
    else {
      endpoint = `/drop/saleType/fixed-price/${start}/${end}`
    }
    axios
      .get(endpoint)
      .then(
        (response) => {
          setFixedPriceDrop(response.data.data);
          handleCloseBackdrop();
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          handleCloseBackdrop();
        }
      );
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    let endpoint;

    if(version === undefined) {
      endpoint = `/drop/saleType/auction/${start}/${end}`;
    }
    else {
      endpoint = `/drop/saleType/auction/${start}/${end}`
    }
    axios.get(endpoint).then(
      (res) => {
        console.log("res >>> ", res)
        setBidableDrop(res.data.data);
        handleCloseBackdrop();
      },
      (err) => {
        console.log("could not get bidable drops ", err.response);
        handleCloseBackdrop();
      }
    );
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
