import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Divider, ListItem, ListItemText, Paper, List } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import "../../assets/css/notificationStyle.css";
import { formatDistanceToNow } from "date-fns";

export default function NotificationList(props) {
  function handleNotificationClick(event) {
    console.log("clicked");
  }
  function handleIconClick(e, id) {
    console.log("id", id);
    props.close(id);
    console.log("Icon clicked");
  }

  //function for format date to passed time till current time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const [data, setData] = useState(props.notifications);

  useEffect(() => {
    setData(props.notifications);
    console.log("array", props.notifications);
  }, [props]);

  return props.notifications.length != 0 ? (
    <div style={{ width: "370px", background: "white" }} className="h-auto">
      <div
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationsIcon sx={{ marginRight: "3px" }} />
        Notifications
      </div>
      <Divider />
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center">
          <Paper style={{ overflow: "auto" }}>
            <List
              sx={{
                overflow: "auto",
                maxWidth: 370,
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
              }}
              style={{ backgroundColor: "#FFF", color: "#00AEAE" }}
            >
              {data.map((row, index) => (
                <ListItem
                  key={index}
                  divider
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  onClick={handleNotificationClick}
                >
                  <ListItemText
                    primary={row.message}
                    secondary={formatDate(row.createdAt)}
                    style={{ wordWrap: "break-word" }}
                  />
                  <CloseIcon
                    style={{ fontSize: 15, color: grey[600] }}
                    sx={{ padding: "0px" }}
                    onClick={(e) => {
                      handleIconClick(e, row._id);
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        width: "370px",
        backgroundColor: "white",
        color: "black",
      }}
      className="p-2 h-auto"
    >
      <div
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationsIcon sx={{ marginRight: "3px" }} />
        Notifications
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center">
          <NotificationsIcon fontSize="large" />
        </div>
        <div className="d-flex justify-content-center">
          No Notifications yet
        </div>
      </div>
    </div>
  );
}
