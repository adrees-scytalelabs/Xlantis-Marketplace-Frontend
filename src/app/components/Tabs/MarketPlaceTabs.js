// REACT
import React, { useState } from "react";
// STYLESHEETS
import "../../assets/css/mediaQueries.css";
// MUI
import PropTypes from "prop-types";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Card, Grid } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
// COMPONENTS
// import SwipeableViews from "react-swipeable-views";
import { Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import OnSaleCard from "../Cards/OnSaleCard";
import OnAuctionCard from "../Cards/OnAuctionCard";
import { nftImage, auctionImg } from "../../assets/js/images.js";
import WhiteSpinner from "../Spinners/WhiteSpinner";

// CONTENT
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const paginationStyles = makeStyles({
  base: {
    // borderRadius: 12,
    border: 0,
    color: "#fff",
    padding: "0 30px",
    fontWeight: "bold",
    fontFamily: "orbitron",
  },
  label: {
    textTransform: "capitalize",
    color: "#fff",
  },
  body2: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
  },
  tabPanelProps: {
    backgroundColor: "#000",
  },
}));

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "orbitron",
    color: "#fff",
  },
  overrides: {
    MuiTablePagination: {
      caption: {
        fontWeight: "bold",
        color: "#fff",
      },
      input: {
        fontWeight: "bold",
        color: "#fff",
      },
      selectIcon: {
        color: "#fff",
      },
      actions: {
        color: "#fff",
      },
    },
    MuiIconButton: {
      root: {
        color: "#fff",
      },
    },
    Mui: {
      "&$disabled": {
        color: "#fff",
      },
    },
    MuiAlert: {
      message: {
        fontSize: 12,
      },
      icon: {
        fontSize: 12,
      },
    },
  },
});

// COMPONENT FUNCTION
const MarketPlaceTabs = (props) => {
  const classes = useStyles();
  const paginationClasses = paginationStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [rowsPerSalePage, setRowsPerSalePage] = useState(6);
  const [salePage, setSalePage] = useState(0);
  const [rowsPerAuctionPage, setRowsPerAuctionPage] = useState(6);
  const [AuctionPage, setAuctionPage] = useState(0);

  const emptySaleRows =
    rowsPerSalePage -
    Math.min(
      rowsPerSalePage,
      props.fixedPriceDrop.length - salePage * rowsPerSalePage
    );

  //   Handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeSalePage = (event, newPage) => {
    setSalePage(newPage);
  };
  const handleChangeRowsPerSalePage = (event) => {
    setRowsPerSalePage(parseInt(event.target.value, 10));
    setSalePage(0);
  };

  const handleChangeAuctionPage = (event, newPage) => {
    setAuctionPage(newPage);
  };
  const handleChangeRowsPerAuctionPage = (event) => {
    setRowsPerAuctionPage(parseInt(event.target.value, 10));
    setAuctionPage(0);
  };

  return (
    <div className="w-100">
      <ThemeProvider theme={customTheme}>
        <div className={classes.root}>
          {/* Tabs */}
          <div
            className="row no-gutters align-items-center justify-content-center"
            style={{
              // borderBottom: "1px solid rgb(251, 254, 255)",
              backgroundColor: "#000",
            }}
          >
            <div className="col-auto">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="scrollable"
                scrollButtons="auto"
                aria-label="trending and top collections"
              >
                <Tab
                  label="Fixed Price Drops"
                  {...a11yProps(0)}
                  className={classes.tabsProps}
                />
                <Tab
                  label="Bidable Drops"
                  {...a11yProps(1)}
                  className={classes.tabsProps}
                />
              </Tabs>
            </div>
          </div>
          {/* Tabpanels */}
          {/* 1. Fixed Price Drops */}
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            // style={{ paddingLeft: "0px", paddingRight: "0px" }}
            className={classes.tabPanelProps}
          >
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {/* props.type === "fixedPriceDrops" ? ( */}
                {props.open ? (
                  <div className="row no-gutters align-items-center justify-content-center">
                    <div className="col-12">
                      <WhiteSpinner />
                    </div>
                  </div>
                ) : props.fixedPriceDropLength !== 0 &&
                  props.fixedPriceDrop !== "undefined" ? (
                  <div className="row no-gutters w-100 align-items-center position-relative">
                    {(rowsPerSalePage > 0
                      ? props.fixedPriceDrop.slice(
                          salePage * rowsPerSalePage,
                          salePage * rowsPerSalePage + rowsPerSalePage
                        )
                      : props.fixedPriceDrop
                    ).map((i, index) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-xl-3 d-inline-block xlColDropWidth"
                        key={index}
                      >
                        <OnSaleCard i={i} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card
                    variant="outlined"
                    style={{
                      padding: "40px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      backgroundColor: "#000",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="text-center"
                      // color="textSecondary"
                      component="p"
                      style={{ color: "#fff" }}
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                )}
              </div>
              {/* <div className="col-6">item 1.2</div>  */}
            </div>
            <div className="row no-gutters justify-content-center paginationBg mt-5">
              <TablePagination
                rowsPerPageOptions={[6, 12]}
                component="div"
                count={props.fixedPriceDropLength}
                rowsPerPage={rowsPerSalePage}
                labelRowsPerPage={"Drops per page"}
                page={salePage}
                onChangePage={handleChangeSalePage}
                onChangeRowsPerPage={handleChangeRowsPerSalePage}
                paginationClasses={{
                  base: classes.root,
                  label: classes.label,
                  body2: classes.body2,
                }}
              />
            </div>
          </TabPanel>
          {/* 2. Bidable Drops */}
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            className={classes.tabPanelProps}
          >
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {/* props.type === "bidableDrops" ? ( */}
                {props.open ? (
                  <div className="row no-gutters align-items-center justify-content-center">
                    <div className="col-12">
                      <WhiteSpinner />
                    </div>
                  </div>
                ) : props.bidableDropLength !== 0 &&
                  props.bidableDrop !== "undefined" ? (
                  <div className="row no-gutters w-100 align-items-center position-relative ">
                    {(rowsPerAuctionPage > 0
                      ? props.bidableDrop.slice(
                          AuctionPage * rowsPerAuctionPage,
                          AuctionPage * rowsPerAuctionPage + rowsPerAuctionPage
                        )
                      : props.bidableDrop
                    ).map((i, index) => (
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 d-inline-block  xlColDropWidth"
                        key={index}
                      >
                        <OnAuctionCard i={i} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card
                    variant="outlined"
                    style={{
                      padding: "40px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      backgroundColor: "#000",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="text-center"
                      // color="textSecondary"
                      component="p"
                      style={{ color: "#fff" }}
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                )}
              </div>
              {/* <div className="col-6">item 1.2</div>  */}
            </div>
            <div className="row no-gutters justify-content-center paginationBg mt-5">
              <TablePagination
                rowsPerPageOptions={[6, 12]}
                component="div"
                count={props.bidableDropLength}
                rowsPerPage={rowsPerAuctionPage}
                labelRowsPerPage={"Drops per page"}
                page={AuctionPage}
                onChangePage={handleChangeAuctionPage}
                onChangeRowsPerPage={handleChangeRowsPerAuctionPage}
                paginationClasses={{
                  base: classes.root,
                  label: classes.label,
                  body2: classes.body2,
                }}
              />
            </div>
          </TabPanel>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MarketPlaceTabs;
