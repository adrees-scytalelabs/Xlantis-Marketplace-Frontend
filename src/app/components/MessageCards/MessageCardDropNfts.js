import React from "react";

import { Card, Typography } from '@mui/material';
const MessageCardDropNfts = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "40px",
        paddingTop: "80px",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "#000",
        marginLeft: "20%",
      }}
    >
      <Typography
        variant="body2"
        className="text-center"
        component="p"
        style={{ color: "#fff" }}
      >
        <strong>{props.msg}</strong>
      </Typography>
    </Card>
  );
};

export default MessageCardDropNfts;
