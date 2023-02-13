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
import { useLocation } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MarketPlacePage from "./MarketPlacePage";
import { Link } from "react-router-dom";
import WalletEnabled from "./WalletEnabled";
import WalletDisabled from "./WalletDisabled";

// STYLING
const paginationStyles = makeStyles({
  base: {
    // borderRadius: 12,
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
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
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

// COMPONENT FUNCTION
const ManageAccountsWallet = (props) => {
  const location = useLocation();
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
    props.setTab(0);
    if (location.state != null) {
      if (location.state.current === "disabled") {
        setValue(1);
      }
    }
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "active",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "active",
    }); // eslint-disable-next-line
  }, []);

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Manage Accounts of Wallet Admin</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/superAdminDashboard/manageAccounts`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Manage Accounts
                </li>
              </Link>
              <li className="breadcrumb-item active">Wallet</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="card-body page-height px-0">
        <ThemeProvider theme={customTheme}>
          <div className="row no-gutters">
            <div className="col-md-12">
              {/* <AppBar position="static" color="white" elevation={0} style={{ width: "max-content", borderBottom: "1px solid #A70000" }} > */}
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab
                  label="Enabled"
                  className={classes.tabsProps}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Disabled"
                  className={classes.tabsProps}
                  {...a11yProps(1)}
                />
              </Tabs>
              {/* </AppBar> */}
              <TabPanel value={value} index={0}>
                <WalletEnabled />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <WalletDisabled />
              </TabPanel>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ManageAccountsWallet;