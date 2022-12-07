// REACT
import React, {useState} from "react";
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
import TablePagination from "@material-ui/core/TablePagination";
// COMPONENTS
// import SwipeableViews from "react-swipeable-views";
import { Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import OnSaleCard from "../Cards/OnSaleCard";
import OnAuctionCard from "../Cards/OnAuctionCard";
import { nftImage, auctionImg } from "../../assets/js/images.js";

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
    borderRadius: 12,
    border: 0,
    color: "#04111D",
    padding: "0 30px",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  label: {
    textTransform: "capitalize",
  },
  body2: {
    fontWeight: "bold",
    fontFamily: "poppins",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#04111D",
    // backgroundImage:
    //   "linear-gradient(180deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
  },
}));

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#04111D",
    },
  },
  typography: {
    fontFamily: "poppins",
  },
  overrides: {
    MuiTablePagination: {
      caption: {
        fontWeight: "bold",
      },
      input: {
        fontWeight: "bold",
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

// COMPONENT FUNCTION
const MarketPlaceTabs = (props) => {
  const classes = useStyles();
  const paginationClasses = paginationStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  //   Handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="w-100" style={{ backgroundColor: "#fbfeff" }}>
      <ThemeProvider theme={customTheme}>
        <div className={classes.root}>
          {/* Tabs */}
          <div
            className="row no-gutters align-items-center justify-content-center"
            style={{
              backgroundColor: "#fbfeff",
              borderBottom: "1px solid rgb(251, 254, 255)",
            }}
          >
            <div className="col-12">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="trending and top collections"
                centered
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
            style={{ backgroundColor: "#fbfeff" }}
          >
            <div className="row no-gutters">
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {/* props.type === "fixedPriceDrops" ? ( */}
                {props.open ? (
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
                ) : props.cubeDataLength === 0 &&
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
                      color="textSecondary"
                      component="p"
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                ) : props.cubeDataLength !== 0 &&
                  props.cubeData !== "undefined" ? (
                  <div className="row no-gutters w-100 align-items-center position-relative">
                    <div className="my-3">
                      {props.cubeData.map((i, index) => (
                        <div
                          className="col-12 col-sm-6 col-lg-3 d-inline-block my-3"
                          key={index}
                        >
                          <OnSaleCard
                            i={i}
                            index={index}
                            userSaleData={props.userSaleData}
                            image={nftImage[index]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
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
                      color="textSecondary"
                      component="p"
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
                rowsPerPageOptions={[4, 8]}
                component="div"
                count={props.totalSaleCube}
                rowsPerPage={props.rowsPerPage}
                labelRowsPerPage={"Rows per page"}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
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
            style={{ backgroundColor: "#fbfeff" }}
          >
            <div className="row no-gutters">
              <div className="col-12">
                {/* <TrendingCollectionsHome /> */}
                {/* props.type === "bidableDrops" ? ( */}
                {props.open ? (
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
                ) : props.cubeDataLength === 0 &&
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
                      color="textSecondary"
                      component="p"
                    >
                      <strong>No items to display </strong>
                    </Typography>
                  </Card>
                ) : props.cubeAuctionDataLength !== 0 &&
                  props.cubeAuctionData !== "undefined" ? (
                  <div className="row no-gutters w-100 align-items-center position-relative">
                    <div className="my-3">
                      {props.cubeAuctionData.map((i, index) => (
                        <div
                          className="col-12 col-sm-6 col-lg-3 d-inline-block my-3"
                          key={index}
                        >
                          <OnAuctionCard
                            i={i}
                            index={index}
                            userAuctionData={props.userAuctionData}
                            image={auctionImg[index]}
                            marketTabs={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
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
                      color="textSecondary"
                      component="p"
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
                rowsPerPageOptions={[4, 8]}
                component="div"
                count={props.totalSaleCube}
                rowsPerPage={props.rowsPerPage}
                labelRowsPerPage={"Rows per page"}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
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
