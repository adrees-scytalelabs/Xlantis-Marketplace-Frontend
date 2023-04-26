import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { FixedSizeList as List } from "react-window";
import "../../assets/css/notificationStyle.css";
import { ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
export default function NotificationList(props) {
  function handleNotificationClick(event) {
    console.log("clicked");
  }
  function handleIconClick(id) {
    console.log("id", id);
    props.close(id);
    console.log("Icon clicked");
  }
  function Row({ index, style }) {
    let arr = props.notifications;
    console.log("array", arr);
    console.log("message", arr[index]);
    let read = [true, true, false, true, false, true, true, false, false, true];
    return (
      <ListItem
        divider
        className={arr[index].isRead ? "ListItemRead" : "ListItemUnread"}
        style={style}
        key={index}
        onClick={handleNotificationClick}
      >
        <ListItemText
          secondary={arr[index].message}

        />
        <CloseIcon
          style={{ fontSize: 15, color: grey[600] }}
          onClick={handleIconClick(arr[index]._id)}
        />
      </ListItem>
    );
  }
  return (
    <List
      className="List"
      height={400}
      itemCount={props.itemCount}
      itemSize={46}
      width={400}
    >
      {Row}
    </List>
  );
}