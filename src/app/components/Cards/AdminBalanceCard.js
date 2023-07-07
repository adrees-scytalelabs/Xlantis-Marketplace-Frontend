import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const AdminBalanceCard = (props) => {
  let balance = props.balanceUSD;
  let formattedBalance = Number(balance.toString().match(/^\d+(?:\.\d{0,2})?/)).toFixed(2);
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
          <div className="col justify-content-between" style={{padding:'20px'}}>
            {props.isLoadingBalance ? (
              <WhiteSpinner />
            ) : (
              <>
                <h4 className={props.hoverH4}>
                  USD($): {formattedBalance}
                </h4>
                {props.showMatic===true &&(
                  <h4 className={props.hoverH4}>
                  MATIC: {props.balanceMatic?.toFixed(4)}
                </h4>
                )}
                
              </>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default AdminBalanceCard;
