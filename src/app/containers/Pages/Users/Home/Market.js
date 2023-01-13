import { Avatar, CardHeader, Grid, Paper } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
// COMPONENTS
import TrendingAndTop from "./TrendingAndTop";
import OnSaleCard from "../../../../components/Cards/OnSaleCard";
import OnAuctionCard from "../../../../components/Cards/OnAuctionCard";
import Cookies from "js-cookie";

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
  const [userSaleData, setUserSaledata] = useState([]);
  const [cubeData, setCubeData] = useState([]);
  const [userAuctionData, setUserAuctiondata] = useState([]);
  const [cubeAuctionData, setCubeAuctionData] = useState([]);
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
    axios
      .get(`/v1-sso/${version}/drop/saleType/fixed-price/${start}/${end}`)
      .then(
        (response) => {
          console.log("responseeeee", response);
          setCubeData(response.data.data);
          setUserSaledata(response.data.data);
          setCubeAuctionData(response.data.data);
          setUserAuctiondata(response.data.data);
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

  if (cubeData) {
    console.log("this is cube data hahaha: ", cubeData);
  }

  useEffect(() => {
    getCubes(0, 4); // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Header --> */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        {/* Section 1 - ON SALE */}
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          {/* On Sale */}
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Fixed Price Drops</h1>
          </div>
          {/* View Market Place */}
          <div className="col-12 col-md-6 text-md-right">
            <Link to="/marketPlace">
              <h4 className="marketLinkLeads">View All</h4>
            </Link>
          </div>
        </div>
        <hr className="m-0"></hr>
        <div className="row no-gutters w-100">
          {cubeData ? (
            <TrendingAndTop
              open={open}
              cubeData={cubeData}
              cubeDataLength={cubeData.length}
              cubeAuctionDataLength={cubeAuctionData.length}
              userSaleData={userSaleData}
              userAuctionData={userAuctionData}
              type={"fixedPriceDrops"}
            />
          ) : null}
          {/* {open ? (
            <div align="center" className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#ff0000" }}
              ></Spinner>
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : cubeData.length === 0 && cubeAuctionData.length === 0 ? (
            <Card
              variant="outlined"
              style={{
                padding: "40px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="body2"
                className="text-center"
                color="textSecondary"
                component="p"
              >
                <strong>No items to display </strong>
              </Typography>
            </Card>
          ) : (
            <div className="row no-gutters w-100">
              {cubeData.map((i, index) => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                  <OnSaleCard i={i} index={index} userSaleData={userSaleData} />
                </div>
              ))}
            </div>
          )} */}
        </div>
        {/* Section 2 ON AUCTION */}
        <div className="row no-gutters justify-content-between align-items-end mt-4 pt-3">
          {/* On Auction */}
          <div className="col-12 col-md-6">
            <h1 className="marketCatHeadings">Bidable Drops</h1>
          </div>
          {/* View Market Place */}
          <div className="col-12 col-md-6 text-md-right">
            <Link to="/marketPlace">
              <h4 className="marketLinkLeads">View All</h4>
            </Link>
          </div>
        </div>
        <hr className="m-0"></hr>
        {/* On Auction */}
        <div className="row no-gutters w-100">
          {cubeData ? (
            <TrendingAndTop
              open={open}
              cubeData={cubeData}
              cubeAuctionData={cubeAuctionData}
              cubeDataLength={cubeData.length}
              cubeAuctionDataLength={cubeAuctionData.length}
              userSaleData={userSaleData}
              userAuctionData={userAuctionData}
              type={"bidableDrops"}
            />
          ) : null}
          {/* {open ? (
            <div align="center" className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#ff0000" }}
              ></Spinner>
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : cubeData.length === 0 && cubeAuctionData.length === 0 ? (
            <Card
              variant="outlined"
              style={{
                padding: "40px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="body2"
                className="text-center"
                color="textSecondary"
                component="p"
              >
                <strong>No items to display </strong>
              </Typography>
            </Card>
          ) : (
            <div className="row no-gutters w-100">
              {cubeAuctionData.map((i, index) => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                  <OnAuctionCard
                    i={i}
                    index={index}
                    userAuctionData={userAuctionData}
                  />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;
