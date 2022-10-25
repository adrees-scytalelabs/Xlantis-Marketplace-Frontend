
import { AppBar, Box, Card, CardHeader, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/styles';
import DropsPage from './DropsPage';

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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    //   backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const MyDrops = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }

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
      marketPlace: ""
    });// eslint-disable-next-line
  }, []);


  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">My Drops</li>
      </ul>
      <div>
        {/* <AppBar position="static" color="white" elevation={0} style={{ width: "max-content", borderBottom: "1px solid #A70000" }} > */}
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Draft" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(0)} />
          <Tab label="Pending" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(1)} />
          <Tab label="Active" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(2)} />
          <Tab label="Close" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(3)} />


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
    </div >
  );
}

export default MyDrops;
