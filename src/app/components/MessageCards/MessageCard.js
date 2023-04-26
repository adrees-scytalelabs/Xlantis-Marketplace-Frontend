import { Card, Typography } from '@mui/material';
import React from "react";

const MessageCard = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "40px",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "black",
      }}
    >
      <Typography
        variant="body2"
        className="text-center"
        component="p"
        style={{ color: "#fff", backgroundColor: "black" }}
      >
        <strong>{props.msg}</strong>
      </Typography>
    </Card>

  );
};

export default MessageCard;
