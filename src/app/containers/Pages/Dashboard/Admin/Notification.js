import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import { io } from "socket.io-client";
import RefreshIcon from "@mui/icons-material/Refresh";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState("");
  const open = Boolean(anchorEl);
  useEffect(() => {
    setSocket(io("https://raindrop-backend.herokuapp.com/"));
  }, []);
  const getNotification = (start, end) => {
    axios
      .get(`/notifications/${start}/${end}`)
      .then((response) => {
        setNotifications(response.data.notifications.reverse()); //showing latest notification first
        console.log("data", response.data);
      })
      .catch((err) =>
        console.log("error in fetching notification", err.response)
      );
  };
  const readNotification = (notificationId) => {
    let data = {
      notificationId,
    };

    axios.patch("/notifications/hide", data).then(
      (response) => {
        axios
          .get("/notifications/0/2000")
          .then((response) => {
            setNotifications(response.data.notifications);
            console.log("data", response.data);
          })
          .catch((err) =>
            console.log("error in fetching notification", err.response)
          );
        // getNotifications(0, 20000);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
      }
    );
  };
  const handleRefresh = () => {
    getNotification(0, 2000);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const formatDate = (date) => {
    const backendDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - backendDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    const mintueDifference = hoursDifference * 60;
    console.log("Hours Difference", hoursDifference);
    console.log("Mintue Difference", mintueDifference);
    if (mintueDifference < 60) {
      return `${Math.floor(mintueDifference)} min ago`;
    } else if (hoursDifference < 24) {
      if (hoursDifference < 2) {
        return `${Math.floor(hoursDifference)} hour ago`;
      } else {
        return `${Math.floor(hoursDifference)} hours ago`;
      }
    } else {
      const year = backendDate.getFullYear();
      const month = (backendDate.getMonth() + 1).toString().padStart(2, "0");
      const day = backendDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    console.log("user Id", userIdentity);
    console.log("user Id", userLogin);
    if (userLogin != null) {
      setUserId(userIdentity);
      if (userId !== "" && socket !== null) {
        console.log("in this condition", userId);
        socket.emit("user-logged-in", userIdentity);
        socket.on("Notification", (notification) => {
          console.log("notigic", notification);
          getNotification(0, 2000);
          // setNotificationsList((previousData) => [
          //   ...previousData,
          //   notification,
          // ]);
        });
      } else if (userIdentity === "" && socket !== null) {
        socket.emit("user-logged-out", userIdentity);
      }
    }
  }, [socket, userId]);
  useEffect(() => {
    console.log("notfication props", props);
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      getNotification(0, 2000);
    }
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myDrops: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
      notification: "active",
    });
  }, []);
  return (
    <div className="backgroundDefault position-relative">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Notifications</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Notifications</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard
          getOnboardingLink={props.getOnboardingLink}
          setIsStripeLogin={props.setIsStripeLogin}
        />
      )}
      <div className="notifications-container">
        <div
          className="notifications-heading"
          style={{
            backgroundColor: "white",
            color: "black",
            borderTop: "1px solid #ccc",
            padding: "10px",
          }}
        >
          Notifications
          <IconButton
            aria-label="refresh"
            onClick={handleRefresh}
            size="small"
            style={{ float: "right", marginTop: "-5px" }}
          >
            Refresh
            <RefreshIcon style={{ color: "black", marginLeft: "5px" }} />
          </IconButton>
        </div>

        <div className="notifications-list">
          {notifications !== undefined && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-card">
                {/* <div
                  className="notification-image"
                  style={{
                    marginRight: "10px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <img
                    // src={notification.image}
                    alt="notification"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div> */}
                <div className="notification-content" style={{ flexGrow: 1 }}>
                  <p className="ml-4 mt-4">{notification.message}</p>
                  <div
                    className="notification-timestamp"
                    style={{
                      textAlign: "right",
                      fontSize: "1px",
                      color: "gray",
                    }}
                  >
                    {formatDate(notification.createdAt)}
                  </div>
                </div>
                <div className="notification-options">
                  <div className="">
                    <IconButton
                      aria-label="more"
                      id={`notification-menu-${notification._id}`}
                      size="small"
                      onClick={handleClick}
                      style={{ position: "relative", top: "-8px" }}
                    >
                      <MoreVertIcon className="vertIcon" />
                    </IconButton>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        readNotification(notification._id);
                      }}
                    >
                      Mark as read
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        readNotification(notification._id);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ))
          ) : (
            <MessageCard msg="No Notfication" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
