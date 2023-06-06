import {
  Box,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketPlacePage from "./MarketPlacePage";
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
};

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
  components: {
    MuiTablePagination: {
      styleOverrides: {
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
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        "&$disabled": {
          color: "#fff",
        },
      },
    },
    Mui: {
      styleOverrides: {
        "&$disabled": {
          color: "#fff",
        },
      },
    },
  },
});

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

const MarketPlace = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "active",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">MarketPlace</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash">
                <Link style={{ color: "#777" }} to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active">MarketPlace</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body page-height px-0">
        <ThemeProvider theme={customTheme}>
          <div className="row no-gutters">
            <div className="col-md-12">
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Auction" sx={styles.tabsProps} {...a11yProps(0)} />
                <Tab
                  label="Fixed Price"
                  sx={styles.tabsProps}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <MarketPlacePage
                  saleType="auction"
                  marketplaceId={props.marketplaceId}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MarketPlacePage
                  saleType="fixed-price"
                  marketplaceId={props.marketplaceId}
                />
              </TabPanel>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MarketPlace;
