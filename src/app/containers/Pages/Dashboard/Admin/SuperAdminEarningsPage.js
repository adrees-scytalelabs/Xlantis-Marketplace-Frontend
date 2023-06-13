import { Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EarningsImage from "../../../../assets/img/EarningsImage.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LineChartComponent from "../../../../components/Charts/LineChartComponent";
import {
  getSuperAdminBalance,
  getSuperAdminEarnings,
} from "../../../../components/API/AxiosInterceptor";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";

const SuperAdminEarningsPage = (props) => {
  const [earnings, setEarnings] = useState(0);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  //for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];

  const getEarnings = () => {
    setIsLoadingEarnings(true);
    getSuperAdminEarnings()
      .then((response) => {
        // console.log("Response from getting super admin earnings: ", response);
        setEarnings(response?.data?.earnings);
        setIsLoadingEarnings(false);
      })
      .catch((error) => {
        console.log("Error from getting super admin earnings: ", error);
        setSnackbarMessage("Error Fetching Earnings");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsLoadingEarnings(false);
      });
  };

  const getBalance = () => {
    setIsLoadingBalance(true);
    getSuperAdminBalance()
      .then((response) => {
        // console.log("Response from getting super admin balance: ", response);
        setBalanceUSD(response.data?.superAdmin?.usd);
        setIsLoadingBalance(false);
      })
      .catch((error) => {
        console.log("Error from getting super admin balance: ", error);
        setSnackbarMessage("Error fetching balance");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsLoadingBalance(false);
      });
  };

  useEffect(() => {
    getBalance();
    getEarnings();
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
      adminStats: "",
      earnings: "active",
    });
  }, []);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Earnings</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Earnings</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="m-2">
        <div className="row">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <div
                className="text-white border border-white"
                style={{ backgroundColor: "#262626" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <img className="h-auto w-auto" src={EarningsImage} />
                  </div>
                  <div className="col-8 d-flex flex-column justify-content-end align-items-end">
                    <div>
                      {isLoadingBalance ? (
                        <div className="col">
                          <WhiteSpinner />
                        </div>
                      ) : (
                        <h1 className="col">
                          <span style={{ fontFamily: "Orbitron" }}>
                            ${balanceUSD.toFixed(2)}
                          </span>
                        </h1>
                      )}
                    </div>
                    <div>
                      <h1 className="col">
                        <span
                          style={{ fontFamily: "Inter", color: "#f64d04" }}
                          className="font-weight-light"
                        >
                          Current Balance
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="row">
          <Grid container spacing={1} className="mt-2">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <div className="border border-white">
                <div className="row">
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <TrendingUpIcon fontSize="large" className="h-75 w-75" />
                  </div>
                  <div className="col-10 d-flex flex-column justify-content-end align-items-end">
                    <div className="col-12 d-flex flex-column justify-content-end align-items-end">
                      <div>
                        {isLoadingEarnings ? (
                          <div className="col">
                            <WhiteSpinner />
                          </div>
                        ) : (
                          <h1 className="col">
                            <span
                              style={{ fontFamily: "Orbitron" }}
                              className="text-xl text-white font-weight-bold"
                            >
                              ${earnings}
                            </span>
                          </h1>
                        )}
                      </div>
                      <div>
                        <h1 className="col">
                          <span
                            style={{
                              fontFamily: "Inter",
                              color: "#f64d04",
                              fontSize: "30px",
                            }}
                            className="font-weight-light"
                          >
                            Total Earnings
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1} className="mt-2">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Tooltip
                placement="top"
                title={
                  <Typography fontSize={20} className="text-center">
                    Graph contains dummy data for temporary time
                  </Typography>
                }
                arrow
              >
                <div className="border border-white p-2">
                  <LineChartComponent
                    {...props}
                    data={initialData}
                    className="p-2"
                  />
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </div>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default SuperAdminEarningsPage;
