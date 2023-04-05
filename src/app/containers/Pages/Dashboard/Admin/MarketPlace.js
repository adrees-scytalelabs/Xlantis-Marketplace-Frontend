import {
  AppBar,
  Box,
  Card,
  CardHeader,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MarketPlacePage from "./MarketPlacePage";
import { Link } from "react-router-dom";


const paginationStyles = makeStyles({
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
});

const useStyles = makeStyles((theme) => ({
  root: {
    
    
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
      "&$disabled": {
        color: "#fff",
      },
    },
    Mui: {
      "&$disabled": {
        color: "#fff",
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
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      totalUserAccount: "",
      pendingUserAccount: "",
      newCube: "",
      myNFTs: "",
      newCollection: "",
      mySeason: "",
      tradeListOrders: "",
      myDrops: "",
      myCubes: "",
      referralEarnings: "",
      disputedOrders: "",
      resolvedDisputedOrders: "",
      settings: "",
      changePassword: "",
      newRandomDrop: "",
      marketPlace: "active",
    }); 
  }, []);

  return (
    <div className="backgroundDefault">
      
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">MarketPlace</h3>
            <ul className="breadcrumb">
            <li className="breadcrumb-item slash" >
                <Link style={{ color: "#777" }} to="/dashboard">Dashboard</Link>
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
                <Tab
                  label="Auction"
                  className={classes.tabsProps}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Fixed Price"
                  className={classes.tabsProps}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <MarketPlacePage saleType="auction" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MarketPlacePage saleType="fixed-price" />
              </TabPanel>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MarketPlace;
