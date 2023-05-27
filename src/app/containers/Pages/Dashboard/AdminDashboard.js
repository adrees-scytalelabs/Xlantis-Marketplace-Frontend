import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Paper, Popper } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import { io } from "socket.io-client";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import NotificationList from "../../../components/Cards/NotificationList Card";
import { defaultProfile } from "../../../components/ImageURLs/URLs";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import TopUp from "../../../components/Topup/TopUp";
import { getHeaderNotification } from "../../../redux/getHeaderNotificationSlice";
import AddNFT from "./Admin/AddNFT";
import AdminDashboardDefaultScreen from "./Admin/AdminDashboardDefaultScreen";
import AdminEarnings from "./Admin/AdminEarnings";
import AdminSidebar from "./Admin/AdminSidebar";
import AuctionNFT from "./Admin/AuctionNFT";
import CollectionNfts from "./Admin/CollectionNfts";
import DropApproval from "./Admin/DropApproval";
import DropNfts from "./Admin/DropNfts";
import DropSingleNFT from "./Admin/DropSingleNFT";
import DropsCategories from "./Admin/DropsCategories";
import DropsInCategories from "./Admin/DropsInCategories";
import MarketPlace from "./Admin/MarketPlace";
import MyCollection from "./Admin/MyCollection";
import MyDropNFTs from "./Admin/MyDropNfts";
import MyDrops from "./Admin/MyDrops";
import MyNFTs from "./Admin/MyNFTs";
import NFTBuy from "./Admin/NFTBuy";
import NewCollection from "./Admin/NewCollection";
import NewDrop from "./Admin/NewDrop";
import NewNFT from "./Admin/NewNFT";
import TopupHistoryPageAdmin from "./Admin/TopupHistoryPageAdmin";
import SingleNftDetail from "./Admin/singleNftDetail";
import AdminSettings from "./AdminSettings";

function AdminDashboard(props) {
  console.log("propsprops", props);
  // const path = useResolvedPath("").pathname;
  const path = useResolvedPath("").pathname;
  console.log("path", path);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const openPopper = Boolean(anchorElPopper);
  const [notificationsList, setNotificationsList] = useState({});
  const [menuOpenedClass, setMenuOpenedClass] = useState();
  const [slideNavClass, setSlideNavClass] = useState();
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const { notification, notificationLoading } = useSelector(
    (store) => store.getHeaderNotification
  );

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

  let jwtDecoded, jwt;
  jwt = sessionStorage.getItem("Authorization");
  if (jwt !== null) {
    jwtDecoded = jwtDecode(jwt);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(io("http://localhost:3000/"));
  }, []);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    //console.log("Admin Login Detail", userLogin);
    let userIdentity = sessionStorage.getItem("userId");
    //console.log("Admin ID", userIdentity);
    if (userLogin != null) {
      setUserId(userIdentity);
      if (userId !== "" && socket !== null) {
        socket.emit("user-logged-in", userIdentity);
        socket.on("Notification", (notification) => {
          setNotificationsList((previousData) => [
            ...previousData,
            notification,
          ]);
        });
      } else if (userIdentity === "" && socket !== null) {
        socket.emit("user-logged-out", userIdentity);
      }
    }
  }, [socket, userId]);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      getNotifications(0, 10);
    }
  }, [notificationLoading]);
  function getNotifications(start, end) {
    dispatch(getHeaderNotification({ start, end, setNotificationsList }));
    // setNotificationsList(notification);
    // setNotificationCount(notification.length);
  }
  function readNotification(notificationId) {
    let data = {
      notificationId,
    };

    axios.patch("/notifications/hide", data).then(
      (response) => {
        getNotifications(0, 10);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
      }
    );
  }

  let handleSlideNav = (e) => {
    e.preventDefault();
    if (slideNavClass !== "" && menuOpenedClass !== "") {
      setMenuOpenedClass("");
      setSlideNavClass("");
    } else {
      setMenuOpenedClass("menu-opened");
      setSlideNavClass("slide-nav");
    }
  };

  const [activeTab, setActiveTab] = useState({
    dashboard: "active",
    earnings: "",
    newCollection: "",
    myCollections: "",
    newNFT: "",
    myNFTs: "",
    marketplace: "",
    newDrop: "",
    myDrops: "",
    topUp: "",
    topupHistory: "",
    categories: "",
    allTransactions: "",
  });

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a href="/" className="navbar-brand logo" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="120"
              height="34"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
          <a href="/" className="logo logo-small" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="90"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
        </div>
        <a
          href="/"
          className="mobile_btn"
          id="mobile_btn"
          onClick={handleSlideNav}
        >
          <i className="fa fa-bars"></i>
        </a>
        <ul className="nav user-menu">
          <li>
            {jwtDecoded !== undefined ? (
              <div className="mt-4">
                <Badge
                  color="secondary"
                  badgeContent={notificationsList.length}
                >
                  <NotificationsIcon
                    type="button"
                    onClick={(event) => {
                      setAnchorElPopper(
                        anchorElPopper ? null : event.currentTarget
                      );
                    }}
                  />
                </Badge>
                <Popper
                  key={notificationsList}
                  id={openPopper ? "simple-popper" : undefined}
                  open={openPopper}
                  anchorEl={anchorElPopper}
                  placement="bottom-end"
                  style={{
                    zIndex: 2500,
                    paddingTop: 15,
                  }}
                >
                  <div>
                    <Paper
                      elevation={10}
                      variant="outlined"
                      square
                      className="rounded"
                    >
                      <NotificationList
                        itemCount={notificationsList.length}
                        notifications={notificationsList}
                        close={readNotification}
                      />
                    </Paper>
                  </div>
                </Popper>
              </div>
            ) : null}
          </li>
          <li className="nav-item dropdown has-arrow">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  border: "0",
                  paddingTop: "15px",
                }}
              >
                <span className="admin-img">
                  <img
                    className="avatar-sm rounded-circle"
                    src={defaultProfile}
                    width="50"
                    alt="Ryan Taylor"
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight="true"
                style={{ backgroundColor: "#000" }}
              >
                <Dropdown.Item>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={`${path}/admin/settings`} style={{ width: "100%" }}>
                    Profile Settings
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.clear();
                      sessionStorage.removeItem("Address");
                      Cookies.remove("PNT");
                      window.location.reload(false);
                    }}
                    to="/"
                    style={{ width: "100%" }}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>

      <AdminSidebar
        match={path}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route
              path={`/`}
              element={
                <AdminDashboardDefaultScreen
                  match={path}
                  setActiveTab={setActiveTab}
                />
              }
            />

            <Route
              path={`earnings`}
              element={<AdminEarnings setActiveTab={setActiveTab} />}
            />
            <Route
              path={`newNFT`}
              element={<NewNFT setActiveTab={setActiveTab} />}
            />
            <Route
              exact
              path={`myNFTs`}
              element={<MyNFTs setActiveTab={setActiveTab} />}
            />
            {/* <Route exact path={`allTransactions`} element={ <AllTransactions setActiveTab={setActiveTab} />}/> */}
            <Route
              exact
              path={`dropApproval`}
              element={<DropApproval setActiveTab={setActiveTab} />}
            />
            <Route
              exact
              path={`topUp`}
              element={<TopUp setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`newDrop`}
              element={<NewDrop setActiveTab={setActiveTab} />}
            />
            <Route
              exact
              path={`newDrop/addNft`}
              element={<AddNFT setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`myDrops`}
              element={<MyDrops setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`myDrops/nfts`}
              element={<MyDropNFTs setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`myDrops/nfts/singleNft`}
              element={<DropSingleNFT setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`createNewCollection`}
              element={
                <NewCollection
                  setActiveTab={setActiveTab}
                  handleSnackbarOpen={handleSnackbarOpen}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              }
            />
            <Route
              exact
              path={`myCollection`}
              element={<MyCollection setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`nftDetail/:nftId`}
              element={<SingleNftDetail setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`collection/nfts/:collectionId`}
              element={<CollectionNfts setActiveTab={setActiveTab} />}
            />
            <Route
              exact
              path={`marketPlace`}
              element={<MarketPlace setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`marketPlace/drops/nfts`}
              element={<DropNfts setActiveTab={setActiveTab} />}
            />
            <Route
              exact
              path={`marketPlace/drops/nfts/buy`}
              element={<NFTBuy setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`marketPlace/:dropId/:nftId`}
              element={<AuctionNFT setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`admin/settings`}
              element={<AdminSettings setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`topup-history`}
              element={<TopupHistoryPageAdmin setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`dropsCategories`}
              element={<DropsCategories setActiveTab={setActiveTab} />}
            />

            <Route
              exact
              path={`dropsCategories/drops/:category`}
              element={<DropsInCategories setActiveTab={setActiveTab} />}
            />

            <Route
              path={`/`}
              element={
                <AdminDashboardDefaultScreen
                  match={path}
                  setActiveTab={setActiveTab}
                />
              }
            />
          </Routes>
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
}

export default AdminDashboard;
