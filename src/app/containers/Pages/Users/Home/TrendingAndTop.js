// REACT
import React, { useEffect, useState } from "react";
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
import { Card } from "@material-ui/core";
// COMPONENTS
import FixedPriceDrops from "./FixedPriceDrops";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
// import SwipeableViews from "react-swipeable-views";
import TrendingCollectionsHome from "../../../../components/tables/TrendingCollectionsHome";
import { Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import OnSaleCard from "../../../../components/Cards/OnSaleCard";
import OnAuctionCard from "../../../../components/Cards/OnAuctionCard";
import { nftImage, auctionImg } from "../../../../assets/js/images";

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

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1rem",
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
  },
  overrides: {
    MuiAlert: {
      message: {
        fontSize: 12,
      },
      icon: {
        fontSize: 16,
      },
    },
  },
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

// COMPONENT FUNCTIONS
const TrendingAndTop = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [activeFixedPriceDrops, setActiveFixedPriceDrops] = useState([]);
  const [pendingFixedPriceDrops, setPendingFixedPriceDrops] = useState([]);
  const [closedFixedPriceDrops, setClosedFixedPriceDrops] = useState([]);

  //   Handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  var activeFixedDrop = [];
  var pendingFixedDrop = [];
  var closedFixedDrop = [];
  if (props.fixedPriceDrop) {
    for (let i = 0; i < props.fixedPriceDrop.length; i++) {
      if (props.fixedPriceDrop[i].status === "active") {
        console.log(`index ${props.fixedPriceDrop[i].status}`);
        activeFixedDrop = [...activeFixedDrop, props.fixedPriceDrop[i]];
      } else if (props.fixedPriceDrop[i].status === "pending") {
        pendingFixedDrop = [...pendingFixedDrop, props.fixedPriceDrop[i]];
      } else {
        closedFixedDrop = [...closedFixedDrop, props.fixedPriceDrop[i]];
      }
    }
  }

  var activeAuctionDrop = [];
  var pendingAuctionDrop = [];
  var closedAuctionDrop = [];
  if (props.bidableDrop) {
    for (let i = 0; i < props.bidableDrop.length; i++) {
      if (props.bidableDrop[i].status === "active") {
        activeAuctionDrop = [...activeAuctionDrop, props.bidableDrop[i]];
      } else if (props.bidableDrop[i].status === "pending") {
        pendingAuctionDrop = [...pendingAuctionDrop, props.bidableDrop[i]];
      } else {
        closedAuctionDrop = [...closedAuctionDrop, props.bidableDrop[i]];
      }
    }
  }

  if (activeAuctionDrop.length !== 0) {
    console.log("A ", activeAuctionDrop);
  }

  // useEffect(() => {
  //   const controller = new AbortController();
  //   // setDropStatus();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [props]);

  return (
    <div className="w-100">
      <ThemeProvider theme={customTheme}>
        <div className={classes.root}>
          <div className="row no-gutters align-items-center justify-content-center tabsBorder">
            <div className="col-12">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="white"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="trending and top collections"
              >
                <Tab
                  label={
                    props.type === "fixedPriceDrops" ? "On Sale" : "On Auction"
                  }
                  {...a11yProps(0)}
                  className={classes.tabsProps}
                />
                <Tab
                  label={
                    props.type === "fixedPriceDrops"
                      ? "Sale Starting Soon"
                      : "Auction Starting Soon"
                  }
                  {...a11yProps(1)}
                  className={classes.tabsProps}
                />
                <Tab
                  label={
                    props.type === "fixedPriceDrops"
                      ? "Ended Sales"
                      : "Ended Auctions"
                  }
                  {...a11yProps(2)}
                  className={classes.tabsProps}
                />
              </Tabs>
            </div>
            {/* <div className="col-6 text-center">
              <h4 className="m-0 text-info">
                Space for adding filters and other search tools
              </h4>
            </div> */}
          </div>
          {/* <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            // style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="row no-gutters">
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : activeFixedDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No Drops on Sale</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {activeFixedDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnSaleCard i={i} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : props.type === "bidableDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : activeAuctionDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        <strong>No Drops On Auction</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {activeAuctionDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnAuctionCard i={i} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <Card
                    variant="outlined"
                    style={{
                      padding: "40px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="text-center"
                      // color="textSecondary"
                      component="p"
                      style={{ color: "#fff", backgroundColor: "black" }}
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                )}
              </div>
              {/* <div className="col-6">item 1.2</div>  */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="row no-gutters w-100">
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : pendingFixedDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        <strong>No Upcoming Drop Sales</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {pendingFixedDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnSaleCard i={i} />
                          </div>
                        ))}

                        {/* {props.fixedPriceDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnSaleCard i={i} />
                          </div>
                        ))} */}
                      </div>
                    </div>
                  )
                ) : props.type === "bidableDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : pendingAuctionDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        <strong>No Pending Drops For Auction</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {pendingAuctionDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnAuctionCard i={i} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <Card
                    variant="outlined"
                    style={{
                      padding: "40px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="text-center"
                      // color="textSecondary"
                      component="p"
                      style={{ color: "#fff", backgroundColor: "black" }}
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                )}
              </div>
              {/* <div className="col-6">item 1.2</div>  */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="row no-gutters">
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : closedFixedDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        <strong>No items to display</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {closedFixedDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 my-3 px-0 d-inline-block"
                            key={index}
                          >
                            <OnSaleCard
                              i={i}
                              // userSaleData={props.userSaleData}
                              // image={nftImage[index + 5]}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : props.type === "bidableDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : closedAuctionDrop.length === 0 ? (
                    <Card
                      variant="outlined"
                      style={{
                        padding: "40px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-center"
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        <strong>No items to display</strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {closedAuctionDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 px-0 d-inline-block my-3"
                            key={index}
                          >
                            <OnAuctionCard i={i} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <Card
                    variant="outlined"
                    style={{
                      padding: "40px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="text-center"
                      // color="textSecondary"
                      component="p"
                      style={{ color: "#fff", backgroundColor: "black" }}
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                )}
              </div>
              {/* <div className="col-6">item 1.2</div>  */}
            </div>
          </TabPanel>

          {/* </SwipeableViews> */}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TrendingAndTop;
