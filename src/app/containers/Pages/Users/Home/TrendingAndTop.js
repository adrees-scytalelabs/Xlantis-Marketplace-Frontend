// REACT
import React from "react";
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
  const [value, setValue] = React.useState(0);

  //   Handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
                      ? "Top Sold Out"
                      : "Top Auctions"
                  }
                  {...a11yProps(1)}
                  className={classes.tabsProps}
                />
                <Tab
                  label={
                    props.type === "fixedPriceDrops"
                      ? "Sale Starting Soon"
                      : "Auction Starting Soon"
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
                  ) : props.fixedPriceDropLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.fixedPriceDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4  d-inline-block my-3"
                            key={index}
                          >
                            <OnSaleCard
                              i={i}
                              // userSaleData={props.userSaleData}
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
                  ) :
                    props.cubeAuctionDataLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.cubeAuctionData.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 my-3 d-inline-block"
                            key={index}
                          >
                            <OnAuctionCard
                              i={i}
                              index={index}
                              userAuctionData={props.userAuctionData}
                            />
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
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
                  ) : props.fixedPriceDropLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.fixedPriceDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 my-3 d-inline-block"
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
                  ) :
                    props.cubeAuctionDataLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.cubeAuctionData.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4  d-inline-block my-3"
                            key={index}
                          >
                            <OnAuctionCard
                              i={i}
                              userAuctionData={props.userAuctionData}
                              image={auctionImg[index + 7]}
                            />
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
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
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
                  ) : props.fixedPriceDropLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.fixedPriceDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 d-inline-block my-3"
                            key={index}
                          >
                            <OnSaleCard
                              i={i}
                              // userSaleData={props.userSaleData}
                              // image={nftImage[index + 7]}
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
                  ) :
                    props.cubeAuctionDataLength === 0 ? (
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
                        // color="textSecondary"
                        component="p"
                        style={{ color: "#fff" }}
                      >
                        <strong>No items to display </strong>
                      </Typography>
                    </Card>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {props.cubeAuctionData.map((i, index) => (
                          <div
                            className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4  d-inline-block my-3"
                            key={index}
                          >
                            <OnAuctionCard
                              i={i}
                              userAuctionData={props.userAuctionData}
                              image={auctionImg[index + 4]}
                            />
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
          </TabPanel>
          {/* </SwipeableViews> */}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TrendingAndTop;
