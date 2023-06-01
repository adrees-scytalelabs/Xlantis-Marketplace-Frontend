import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const AdminBalanceCard = (props) => {
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
          <div className="col-4 align-self-end">
            <section>
              <h4 className={props.hoverH4}>
                <span>{props.icon}</span> {props.message}
              </h4>
            </section>
          </div>
          <div className="col justify-content-between">
            {props.isLoadingBalance ? (
              <WhiteSpinner />
            ) : (
              <>
                <h4 className={props.hoverH4}>
                  USD($): {props.balanceUSD?.toFixed(2)}
                </h4>
                <h4 className={props.hoverH4}>
                  MATIC: {props.balanceMatic?.toFixed(4)}
                </h4>
              </>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default AdminBalanceCard;
