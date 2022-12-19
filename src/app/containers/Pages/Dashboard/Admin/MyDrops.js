import {
  AppBar,
  Box,
  Card,
  CardHeader,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DropsPage from "./DropsPage";

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
});

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
    //   backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
  },
  tabPanelProps: {
    backgroundColor: "#000",
  },
}));

const MyDrops = (props) => {
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
      myDrops: "active",
      myCubes: "",
      referralEarnings: "",
      disputedOrders: "",
      resolvedDisputedOrders: "",
      settings: "",
      changePassword: "",
      newRandomDrop: "",
      marketPlace: "",
    }); // eslint-disable-next-line
  }, []);

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My Drops</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">My Drops</li>
            </ul>
          </div>
        </div>
      </div>
      <ThemeProvider theme={customTheme}>
        <div>
          {/* <AppBar position="static" color="white" elevation={0} style={{ width: "max-content", borderBottom: "1px solid #A70000" }} > */}
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Draft"
              className={classes.tabsProps}
              {...a11yProps(0)}
            />
            <Tab
              label="Pending"
              className={classes.tabsProps}
              {...a11yProps(1)}
            />
            <Tab
              label="Active"
              className={classes.tabsProps}
              {...a11yProps(2)}
            />
            <Tab
              label="Close"
              className={classes.tabsProps}
              {...a11yProps(3)}
            />
          </Tabs>
          {/* </AppBar> */}
          <TabPanel value={value} index={0}>
            <DropsPage status="draft" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DropsPage status="pending" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DropsPage status="active" />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DropsPage status="closed" />
          </TabPanel>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MyDrops;
