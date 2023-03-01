import React from "react";
import { FixedSizeList as List } from "react-window";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { grey } from "@material-ui/core/colors";

import "../../assets/css/notificationStyle.css";



export default function NotificationList(props) {
  function handleNotificationClick(event) {
    //move to a different link
    console.log("clicked");
  }
  function handleIconClick(id) {
    //delete notifications
    // event.stopPropagation();
    console.log("id", id);
    props.close(id);
    console.log("Icon clicked");
  }
  function Row({ index, style }) {
    let arr = props.notifications;
    console.log("array", arr);
    console.log("message", arr[index]);
    // let arr = [
    //   "Shabnam",
    //   "Altaf",
    //   "Nawaz",
    //   "Billo",
    //   "Parveen",
    //   "Papa ki Pari",
    //   "Bubbly",
    //   "PrinceMughal",
    //   "Princess32",
    //   "HansMukh",
    // ];
    let read = [true, true, false, true, false, true, true, false, false, true];
    return (
      <ListItem
        divider
        // className={arr[index].isRead ? "ListItemRead" : "ListItemUnread"}
  
        className={arr[index].isRead ? "ListItemRead" : "ListItemUnread"}
        style={style}
        key={index}
        onClick={handleNotificationClick}
      >
        <ListItemText
          // secondary={`Congratulations! ${arr[index]} accepted your bid`}
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