import { Typography } from '@mui/material';
import React from "react";



const TypographyText = (props) => {
  return (
    <Typography
      variant={props.variant}
      color={props.color}
      className={props.class ? props.class : null}
      component={props.component ? props.component : null}
      style={props.style ? props.style : null}
    >
      {props.key ? <strong>{props.key}</strong> : null}
      {props.isSpan ? <span style={props.spanStyle ? props.spanStyle : null}>{props.value}</span> : null}
      {props.value && !props.isSpan ? props.value : null}
    </Typography>


  );
};

export default TypographyText;

