import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import WhiteSpinner from "../Spinners/WhiteSpinner";
const SuperAdminBalanceCard = (props) => {
  return (
    <Card
      style={{
        padding: "1rem",
        borderRadius: 0,
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
                <span>{props.icon}</span> {props.message}
              </h4>
            </section>
          </div>
          {props.isLoadingBalance ? (
            <div className="col justify-content-between">
              <WhiteSpinner />
            </div>
          ) : (
            <div className="col justify-content-between">
              <h4 className={props.hoverH4}>
                USD($): {props.content?.usd?.toFixed(2)}
              </h4>
              <h4 className={props.hoverH4}>
                MATIC: {parseFloat(props.content?.matic?.inMatic).toFixed(4)}
              </h4>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default SuperAdminBalanceCard;
