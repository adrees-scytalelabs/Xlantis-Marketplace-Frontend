import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        message: "Your NFT has been sold.",
        image: "https://via.placeholder.com/100",
        time: "2 hours ago",
      },
      {
        id: 2,
        message: "A new drop is available.",
        image: "https://via.placeholder.com/100",
        time: "5 hours ago",
      },
      {
        id: 3,
        message: "Your order has been processed.",
        image: "https://via.placeholder.com/100",
        time: "1 day ago",
      },
    ]);
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
        </div>
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div
                className="notification-image"
                style={{
                  marginRight: "10px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "50px",
                  height: "50px",
                }}
              >
                <img
                  src={notification.image}
                  alt="notification"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="notification-content" style={{ flexGrow: 1 }}>
                <p>{notification.message}</p>
                <div
                  className="notification-timestamp"
                  style={{ textAlign: "right" }}
                >
                  {notification.time}
                </div>
              </div>
              <div className="notification-options">
                <IconButton
                  aria-label="more"
                  id={`notification-menu-${notification.id}`}
                  size="small"
                  onClick={handleClick}
                  style={{ position: "relative", top: "-8px" }}
                >
                  <MoreVertIcon style={{color:'white'}}/>
                </IconButton>
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
                  <MenuItem>Mark as read</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
