import { Avatar, CardHeader, Grid } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MarketPlaceTabs from "../../../components/Tabs/MarketPlaceTabs";

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

  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalNFTSale, setTotalNFTSale] = useState(0);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getCubes = (start, end) => {
    handleShowBackdrop();
    axios.get(`/drop/saleType/fixed-price/${start}/${end}`).then(
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
  // let getCubes2 = (start, end) => {
  //   handleShowBackdrop();
  //   axios.get(`/marketplace/tokenIds/${start}/${end}`).then(
  //     (response) => {
  //       console.log("responseeeee", response);
  //       setCubeData(response.data.data);
  //       setUserSaledata(response.data.data);
  //       setTotalSaleCube(response.data.Salecount);
  //       setCubeAuctionData(response.data.data);
  //       setUserAuctiondata(response.data.data);
  //       handleCloseBackdrop();
  //     },
  //     (error) => {
  //       if (process.env.NODE_ENV === "development") {
  //         console.log(error);
  //         console.log(error.response);
  //       }
  //       handleCloseBackdrop();
  //     }
  //   );
  // };

  useEffect(() => {
    getCubes(0, 12); // eslint-disable-next-line
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getCubes(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getCubes(0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} />
        </div>
        <div className="row no-gutters mt-5">
          <div className="container-fluid">
            <div
              className="row no-gutters w-100"
              // style={{ minHeight: "100vh" }}
            >
              <div className="w-100">
                <div
                  className="row no-gutters justify-content-center w-100"
                  style={{ minHeight: "75vh" }}
                >
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    item
                  >
                    <MarketPlaceTabs
                      open={open}
                      cubeData={cubeData}
                      cubeDataLength={cubeData.length}
                      cubeAuctionDataLength={cubeAuctionData.length}
                      userSaleData={userSaleData}
                      cubeAuctionData={cubeAuctionData}
                      userAuctionData={userAuctionData}
                      totalSaleCube={2}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      handleChangePage={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      page={page}
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
