import { Avatar, CardHeader } from "@mui/material";
import React from "react";


const CardHeaderWithAvatar = (props) => {
  return (
    <CardHeader
      avatar={<Avatar src={props.src} aria-label="Artist" />}
      title={props.title}
      subheader={props.subheader}
    />
  );
};

export default CardHeaderWithAvatar;
