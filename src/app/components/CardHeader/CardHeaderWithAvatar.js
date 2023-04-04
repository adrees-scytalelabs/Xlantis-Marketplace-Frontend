import React from "react";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';



const CardHeaderWithAvatar = (props) => {
  return (
    <CardHeader
        avatar={<Avatar src={props.src} aria-label="Artist"  />}
        title={props.title}
        subheader={props.subheader}
    />
  );
};

export default CardHeaderWithAvatar;
