
import { Box, Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SuperAdminDefaultScreen from "./SuperAdminDefaultScreen";
import SuperAdminSSOScreen from "./SuperAdminSSOScreen";
import SuperAdminWalletScreen from "./SuperAdminWalletScreen";
import { useResolvedPath } from 'react-router-dom';
const styles = {
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
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
        <Box style={{ padding: "24px 0px" }}>
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


function SuperAdminDashboardDefaultScreen(props) {
  const [value, setValue] = useState(0);
  const path = useResolvedPath("").pathname;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.setTab(0)
    props.setActiveTab({
      dashboard: "active",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);

  return (
    <>
      <div className="backgroundDefault">
        <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome SuperAdmin!</h3>
              <ul className="breadcrumb">
                <li
                  className="breadcrumb-item active"
                  style={{ color: "#999" }}
                >
                  Dashboard
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body page-height px-0">
          <ThemeProvider theme={customTheme}>
            <div className="row no-gutters">
              <div className="col-md-12 col-lg-12 col-xl-12">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    label="All"
                    sx={styles.tabsProps}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="SSO"
                    sx={styles.tabsProps}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Wallet"
                    sx={styles.tabsProps}
                    {...a11yProps(2)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <SuperAdminDefaultScreen
                    match={path}
                    setActiveTab={props.setActiveTab}
                    setTab={props.setTab}
                    tab={props.tab}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <SuperAdminSSOScreen
                    match={path}
                    setActiveTab={props.setActiveTab}
                    setTab={props.setTab}
                    tab={props.tab}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <SuperAdminWalletScreen
                    match={path}
                    setActiveTab={props.setActiveTab}
                    setTab={props.setTab}
                    tab={props.tab}
                  />
                </TabPanel>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default SuperAdminDashboardDefaultScreen;
