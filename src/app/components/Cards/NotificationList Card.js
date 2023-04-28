import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { grey } from "@material-ui/core/colors";

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
      style={{ backgroundColor: "black", color: "white" }}
    >
      {Row}
    </List>
  ) : (
   <div style={{backgroundColor:'black',color:'white'}}>No Notification</div>
  );
}
