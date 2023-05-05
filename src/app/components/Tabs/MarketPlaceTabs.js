import { Box, Tab, TablePagination, Tabs, ThemeProvider, Typography, createTheme, useTheme } from '@mui/material';
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/css/mediaQueries.css";
import OnAuctionCard from "../Cards/OnAuctionCard";
import OnSaleCard from "../Cards/OnSaleCard";
import MessageCard from "../MessageCards/MessageCard";
import WhiteSpinner from "../Spinners/WhiteSpinner";

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

const paginationStyles = {
  base: {
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
}

const styles = {
  root: {},
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
  },
  tabPanelProps: {
    backgroundColor: "#000",
  },
}

const customTheme = createTheme({
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

const MarketPlaceTabs = (props) => {
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
        <div sx={styles.root}>
          <div
            className="row no-gutters align-items-center justify-content-center"
            style={{
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
                  sx={styles.tabsProps}
                />
                <Tab
                  label="Bidable Drops"
                  {...a11yProps(1)}
                  sx={styles.tabsProps}
                />
              </Tabs>
            </div>
          </div>
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            sx={styles.tabPanelProps}
          >
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="col-12">
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
                      (i.status!='draft' && i.status!='closed' &&
                      <div
                        className="col-12 col-sm-6 col-md-4 col-xl-3 d-inline-block xlColDropWidth"
                        key={index}
                      >
                        <OnSaleCard i={i} />
                      </div>
                      )
                    ))}
                  </div>
                ) : (
                  <MessageCard msg="No items to display" />
                )}
              </div>
            </div>
            <div className="row no-gutters justify-content-center paginationBg mt-5">
              <TablePagination
                rowsPerPageOptions={[6, 12]}
                component="div"
                count={props.fixedPriceDropLength}
                rowsPerPage={rowsPerSalePage}
                labelRowsPerPage={"Drops per page"}
                page={salePage}
                onPageChange={handleChangeSalePage}
                onRowsPerPageChange={handleChangeRowsPerSalePage}
                paginationClasses={{
                  base: paginationStyles.root,
                  label: paginationStyles.label,
                  body2: paginationStyles.body2,
                }}
              />
            </div>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            sx={styles.tabPanelProps}
          >
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="col-12">
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
                  <MessageCard msg="This feature is coming soon" />
                )}
              </div>
            </div>
            <div className="row no-gutters justify-content-center paginationBg mt-5">
              <TablePagination
                rowsPerPageOptions={[6, 12]}
                component="div"
                count={props.bidableDropLength}
                rowsPerPage={rowsPerAuctionPage}
                labelRowsPerPage={"Drops per page"}
                page={AuctionPage}
                onPageChange={handleChangeAuctionPage}
                onRowsPerPageChange={handleChangeRowsPerAuctionPage}
                paginationClasses={{
                  base: styles.root,
                  label: styles.label,
                  body2: styles.body2,
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
