import { AppBar, Box, Card, CardHeader, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/styles';
import MyNFTs from './MyNFTs';

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


const MyNFTsTabs = (props) => {
    
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
        myNFTs: "active",
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
        marketPlace: ""
        });// eslint-disable-next-line
    }, []);


    return (
        <div className="card">
        <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
            <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">My NFTs</li>
        </ul>
            <div>
                {/* <AppBar position="static" color="white" elevation={0} style={{ width: "max-content", borderBottom: "1px solid #A70000" }} > */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="To Claim" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(0)} />
                    <Tab label="Owned" style={{ color: "rgb(167, 0, 0)" }} {...a11yProps(1)} />
                </Tabs>
                {/* </AppBar> */}
                <TabPanel value={value} index={0}>
                    <MyNFTs saleType="auction" />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyNFTs saleType="fixed-price" />
                </TabPanel>

            </div>
        </div >
    );
}
 
export default MyNFTsTabs;