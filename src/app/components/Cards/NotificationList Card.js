import React from "react";
import { FixedSizeList as List } from "react-window";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { grey } from "@material-ui/core/colors";

import "../../assets/css/notificationStyle.css";
function handleNotificationClick(event) {
  //move to a different link
  console.log("clicked");
}
function handleIconClick(event) {
  //delete notifications
  event.stopPropagation();
  console.log("Icon clicked");
}

function Row({ index, style }) {
  let arr = [
    "Shabnam",
    "Altaf",
    "Nawaz",
    "Billo",
    "Parveen",
    "Papa ki Pari",
    "Bubbly",
    "PrinceMughal",
    "Princess32",
    "HansMukh",
  ];
  let read = [true, true, false, true, false, true, true, false, false, true];
  return (
    <ListItem
      divider
      className={read[index] ? "ListItemRead" : "ListItemUnread"}
      style={style}
      key={index}
      onClick={handleNotificationClick}
    >
      <ListItemText
        secondary={`Congratulations! ${arr[index]} accepted your bid`}
      />
      <CloseIcon
        style={{ fontSize: 15, color: grey[600] }}
        onClick={handleIconClick}
      />
    </ListItem>
  );
}

export default function NotificationList(props) {
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