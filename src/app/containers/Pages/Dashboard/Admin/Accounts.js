import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import AccountsDefaultScreen from "./AccountsDefaultScreen";
import AccountsSSO from "./AccountsSSO";
import AccountsWallet from "./AccountsWallet";

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

function Accounts(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(props.tab===1){
      setValue(1);
      props.setTab(0);
    }
    if(props.tab===2){
      setValue(2);
      props.setTab(0);
    }
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "active",
      sso:"",
      wallet:"",
    }); // eslint-disable-next-line
  }, []);

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Accounts</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">Accounts</li>
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
                  label="All"
                  className={classes.tabsProps}
                  {...a11yProps(0)}
                />
                <Tab
                  label="SSO"
                  className={classes.tabsProps}
                  {...a11yProps(1)}
                />
                <Tab
                  label="Wallet"
                  className={classes.tabsProps}
                  {...a11yProps(2)}
                />
              </Tabs>
              {/* </AppBar> */}
              <TabPanel value={value} index={0} className="">
                <AccountsDefaultScreen
                  match={props.match}
                  setActiveTab={props.setActiveTab}
                />
              </TabPanel>
              <TabPanel className="" value={value} index={1}>
                <AccountsSSO
                  match={props.match}
                  setActiveTab={props.setActiveTab}
                />
              </TabPanel>
              <TabPanel value={value} index={2} className="">
                <AccountsWallet
                  match={props.match}
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

export default Accounts;
