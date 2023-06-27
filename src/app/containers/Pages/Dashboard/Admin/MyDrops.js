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
import { Link, useLocation } from "react-router-dom";
import DropsPage from "./DropsPage";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

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

const styles = {
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
  },
};

const MyDrops = (props) => {
  let location = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    if (location.state != null) {
      console.log("this is location of drop", location);
      setValue(location.state.value);
    }
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "active",
      topUp: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My Drops</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">My Drops</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} />
      )}
      <ThemeProvider theme={customTheme}>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Draft" sx={styles.tabsProps} {...a11yProps(0)} />
            <Tab label="Pending" sx={styles.tabsProps} {...a11yProps(1)} />
            <Tab label="Active" sx={styles.tabsProps} {...a11yProps(2)} />
            <Tab label="Close" sx={styles.tabsProps} {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DropsPage status="draft" marketplaceId={props.marketplaceId} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DropsPage status="pending" marketplaceId={props.marketplaceId} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DropsPage status="active" marketplaceId={props.marketplaceId} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DropsPage status="closed" marketplaceId={props.marketplaceId} />
          </TabPanel>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MyDrops;
