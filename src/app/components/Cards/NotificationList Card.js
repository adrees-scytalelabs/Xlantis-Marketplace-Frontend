import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ListItem, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import "../../assets/css/notificationStyle.css";

export default function NotificationList(props) {
  function handleNotificationClick(event) {
    console.log("clicked");
  }
  function handleIconClick(e, id) {
    console.log("id", id);
    props.close(id);
    console.log("Icon clicked");
  }
  function Row({ index, style }) {
    useEffect(() => {});
    return (
      <ListItem
        divider
        style={{
          backgroundColor: "white",
          color: "white",
          border: "1px solid black",
        }}
        onClick={handleNotificationClick}
      >
        <ListItemText
          secondary={data[index].message}
          style={{ wordWrap: "break-word" }}
        />
        <CloseIcon
          style={{ fontSize: 15, color: grey[600] }}
          onClick={(e) => {
            handleIconClick(e, data[index]._id);
          }}
        />
      </ListItem>
    );
  }
  const [data, setData] = useState(props.notifications);

  useEffect(() => {
    setData(props.notifications);
    console.log("array", props.notifications);
  }, [props]);

  return props.notifications.length != 0 ? (
    <List
      className={props.notifications}
      height={300}
      itemCount={props.itemCount}
      itemSize={47}
      width={300}
      style={{ backgroundColor: "#000", color: "white" }}
    >
      {Row}
    </List>
  ) : (
    <div
      style={{
        width: "300px",
        backgroundColor: "white",
        color: "black",
      }}
      className="p-2 h-auto"
    >
      Notifications
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
