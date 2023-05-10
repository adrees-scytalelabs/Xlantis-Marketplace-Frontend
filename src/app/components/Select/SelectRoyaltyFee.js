import { Tooltip, Typography } from "@mui/material";
import React from "react";

const styles = {
  tooltip: {
    fontSize: "16px",
  },
};
function SelectRoyaltyFee({ values, setRoyaltyFee, RoyaltyFeeText }) {
  return (
    <div>
      <div>
        <Tooltip
          title={<Typography fontSize={18}>{RoyaltyFeeText}</Typography>}
          classes={{ tooltip: styles.tooltip }}
          placement="top-start"
          arrow={true}
        >
          <label>
            Royalty Fee <i className="fa fa-info-circle" aria-hidden="true"></i>
          </label>
        </Tooltip>

        <small style={{ marginLeft: "5px" }}></small>
      </div>

      <div className="input-group form-group newNftWrapper">
        <div class="input-group-prepend">
          <span class="input-group-text">%</span>
        </div>
        <input
          type="number"
          required
          value={values}
          placeholder="0"
          className="form-control newNftInput"
          onChange={(e) => {
            if (e.target.value >= 0) {
              setRoyaltyFee(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default SelectRoyaltyFee;
