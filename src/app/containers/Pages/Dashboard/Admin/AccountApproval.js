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
import { Link, useResolvedPath } from "react-router-dom";
import AccountApprovalDefaultScreen from "./AccountApprovalDefaultScreen";
import AccountApprovalSSO from "./AccountApprovalSSO";
import AccountApprovalWallet from "./AccountApprovalWallet";
const styles = {
  tabsProps: {
    textTransform: "capitalize",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
  },
  tabPanelProps: {
    backgroundColor: "rgba(32,32,32,255)",
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

function AccountApproval(props) {
  const [value, setValue] = useState(0);
  const path = useResolvedPath("").pathname;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.tab === 1) {
      setValue(1);
      props.setTab(0);
    }
    if (props.tab === 2) {
      setValue(2);
      props.setTab(0);
    }
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "active",
      accountApproval: "",
      accounts: "",
      sso: "active",
      wallet: "active",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Account Approval</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Account Approval</li>
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
                <Tab label="All" sx={styles.tabsProps} {...a11yProps(0)} />
                <Tab label="SSO" sx={styles.tabsProps} {...a11yProps(1)} />
                <Tab label="Wallet" sx={styles.tabsProps} {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0} className="">
                <AccountApprovalDefaultScreen
                  match={path}
                  setActiveTab={props.setActiveTab}
                />
              </TabPanel>
              <TabPanel className="" value={value} index={1}>
                <AccountApprovalSSO
                  match={path}
                  setActiveTab={props.setActiveTab}
                />
              </TabPanel>
              <TabPanel value={value} index={2} className="">
                <AccountApprovalWallet
                  match={path}
                  setActiveTab={props.setActiveTab}
                />
              </TabPanel>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default AccountApproval;
