
import { Box, Tab, Tabs, ThemeProvider, Typography, createTheme, useTheme } from '@mui/material';
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import OnAuctionCard from "../../../../components/Cards/OnAuctionCard";
import OnSaleCard from "../../../../components/Cards/OnSaleCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
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

const styles = {
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1rem",
  },
};

const customTheme = createTheme({
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
    MuiSvgIcon: {
      root: {
        color: "white",
      },
    },
  },
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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

const TrendingAndTop = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [scrWidth, setScrWidth] = useState({});
  const [cntWidth, setCntWidth] = useState();
  const ref = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getWindowWidth = () => {
    const { innerWidth: width, innerHeight: height } = window;
    setScrWidth({
      width,
      height,
    });
  };

  const getContainerWidth = () => {
    let container = setCntWidth(container);
  };

  const handleClick = () => {
    setIsActive(!isActive);
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
        // console.log(`index ${props.fixedPriceDrop[i].status}`);
        activeFixedDrop = [...activeFixedDrop, props.fixedPriceDrop[i]];
      } else if (props.fixedPriceDrop[i].status === "pending") {
        pendingFixedDrop = [...pendingFixedDrop, props.fixedPriceDrop[i]];
      } else if (props.fixedPriceDrop[i].status === "closed") {
        closedFixedDrop = [...closedFixedDrop, props.fixedPriceDrop[i]];
      }
    }
  }

  var activeAuctionDrop = [];
  var pendingAuctionDrop = [];
  var closedAuctionDrop = [];
  if (props.bidableDrop) {
    for (let i = 0; i < props.bidableDrop.length; i++) {
      console.log([i])
      if (props.bidableDrop[i].status === "active") {
        activeAuctionDrop = [...activeAuctionDrop, props.bidableDrop[i]];
      } else if (props.bidableDrop[i].status === "pending") {
        pendingAuctionDrop = [...pendingAuctionDrop, props.bidableDrop[i]];
      } else if (props.bidableDrop[i].status === "closed") {
        closedAuctionDrop = [...closedAuctionDrop, props.bidableDrop[i]];
      }
    }
  }

  if (activeAuctionDrop.length !== 0) {
    console.log("A ", activeAuctionDrop);
  }

  useEffect(() => {
    const controller = new AbortController();
    getWindowWidth();

    const container = ref.current;
    //console.log("container: ", container);
    setCntWidth(container);

    return () => {
      controller.abort();
    };
  }, []);

  if (cntWidth) console.log("width: ", cntWidth);

  return (
    <div className="w-100">
      <ThemeProvider theme={customTheme}>
        <div>
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
                  sx={styles.tabsProps}
                />
                <Tab
                  label={
                    props.type === "fixedPriceDrops"
                      ? "Sale Starting Soon"
                      : "Auction Starting Soon"
                  }
                  {...a11yProps(1)}
                  sx={styles.tabsProps}
                />
                <Tab
                  label={
                    props.type === "fixedPriceDrops"
                      ? "Ended Sales"
                      : "Ended Auctions"
                  }
                  {...a11yProps(2)}
                  sx={styles.tabsProps}
                />
              </Tabs>
            </div>
          </div>

          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
          >
            <div className="row no-gutters">
              <div className="col-12">
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : activeFixedDrop.length === 0 ? (
                    <MessageCard msg="No Drops on Sale"></MessageCard>
                  ) : (
                    <div
                      className="row no-gutters w-100 align-items-center position-relative "
                      id="onSale"
                      ref={ref}
                    >
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
                    <MessageCard msg="This feature is coming soon"></MessageCard>
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

                  <MessageCard msg="No items to display"></MessageCard>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="row no-gutters w-100">
              <div className="col-12">
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : pendingFixedDrop.length === 0 ? (
                    <MessageCard msg="No Upcoming Drop Sales"></MessageCard>
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
                    <MessageCard msg="This feature is coming soon"></MessageCard>
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
                  <MessageCard msg="No items to display" />
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="row no-gutters">
              <div className="col-12">
                {props.type === "fixedPriceDrops" ? (
                  props.open ? (
                    <div className="row no-gutters">
                      <div className="col-12">
                        <WhiteSpinner />
                      </div>
                    </div>
                  ) : closedFixedDrop.length === 0 ? (
                    <MessageCard msg="No items to display"></MessageCard>
                  ) : (
                    <div className="row no-gutters w-100 align-items-center position-relative ">
                      <div className="saleCardSlider">
                        {closedFixedDrop.map((i, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 my-3 px-0 d-inline-block"
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
                  ) : closedAuctionDrop.length === 0 ? (
                    <MessageCard msg="This feature is coming soon"></MessageCard>
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
                  <MessageCard msg="No items to display"></MessageCard>
                )}
              </div>
            </div>
          </TabPanel>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TrendingAndTop;
