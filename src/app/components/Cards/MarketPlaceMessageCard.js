import { Card, Typography } from "@material-ui/core";
import React from "react";

const MarketPlaceMessageCard = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "40px",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "#000",
        paddingTop: props.paddingTop ? props.paddingTop : "",
        marginLeft: props.marginLeft ? props.marginLeft : "",
      }}
    >
      <Typography
        variant="body2"
        className="text-center"
        component="p"
        style={{ color: "#fff" }}
      >
        <strong>{props.message}</strong>
      </Typography>
    </Card>
  );
};

export default MarketPlaceMessageCard;
