import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const DisplayNumbersAndContentCard = (props) => {
  return (
    <Card
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1rem",
      borderRadius: 0,
      height: "100%",
    }}

      id="totalNftsAdminDash"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <Link to={props.linkTo} state={props?.state}>
        <div className="row no-gutters justify-content-between">
          <div className="col align-self-end">
            <section>
              <h4 className={props.hoverH4}>
                <span>{props.icon}</span>
                {props.message}
              </h4>
            </section>
          </div>
          <div className="col">
            <h1 className={props.hoverH1}>{props.content}</h1>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default DisplayNumbersAndContentCard;
