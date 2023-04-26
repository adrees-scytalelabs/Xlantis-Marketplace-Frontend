import React from 'react'
import WhiteSpinner from '../Spinners/WhiteSpinner';
import DateTimePicker from "react-datetime-picker";
import {
  TextField,
} from "@material-ui/core";


function BidValue({
    setBidExpiryTime,
    setBidExpiryTimeStamp,
    bidExpiryTime,
    biddingValue,
    handleChangeBiddingValue,
    versionB,
    handleOpenModal,
    handleBidSubmit,
}) {
  return (
    <div>
        <form>
        <label style={{ color: "#F64D04", marginTop: "10px" }}>
          Set Bid Expiry Time
        </label>
        <div className="form-group">
          <DateTimePicker
            className="form-control"
            onChange={(e) => {
              console.log(e);
              console.log("e.getTime()", Math.round(e.getTime()));
              setBidExpiryTime(e);
              setBidExpiryTimeStamp(
                Number(Math.round(e.getTime()))
              );
            }}
            value={bidExpiryTime}
            style={{ color: "white", backgroundColor: "black" }}
          />
        </div>
        <label>Bidding value</label>
        <div className="form-group">
          <div className="row no-gutters align-items-center">
            <TextField
              autoComplete="false"
              value={biddingValue}
              variant="outlined"
              type="number"
              color="secondary"
              onChange={(e) => {
                handleChangeBiddingValue(e);
              }}
            />
            <button
              className="bidBtn"
              onClick={(e) => {
                versionB === "v1-sso"
                  ? handleOpenModal(e)
                  : handleBidSubmit(e);
              }}
            >
              Bid
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BidValue