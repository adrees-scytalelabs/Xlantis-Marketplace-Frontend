import { Card, Typography } from "@mui/material";
import React from "react";

const MessageCard = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "40px",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "#000",
      }}
    >
      <Typography
        variant="body2"
        className="text-center"
        component="p"
        style={{
          color: "#fff",
          backgroundColor: "#000",
          fontFamily: "Orbitron",
        }}
      >
        <strong>{props.msg}</strong>
      </Typography>
    </Card>
  );
};

export default MessageCard;
