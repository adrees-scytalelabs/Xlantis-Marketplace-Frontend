import React from 'react'
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    tooltip: {
        fontSize: "16px",
      },

}));

function SelectRoyaltyFee({
        values,
        onChange,
        RoyaltyFeeText,
    }) {
  const classes = useStyles();
    

    

  return (
    <div>
        <div>
        <Tooltip
            title={RoyaltyFeeText}
            classes={{ tooltip: classes.tooltip }}
            placement="top-start"
            arrow={true}
        >
            <label>
            Royalty Fee{" "}
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            </label>
        </Tooltip>

        <small style={{ marginLeft: "5px" }}></small>
        </div>

        <div className="form-group newNftWrapper">
        <input
            type="number"
            required
            value={values}
            placeholder="Enter Royalty Fee"
            className="form-control newNftInput"
            onChange={(e) => {
            onChange(e.target.value);
            }}
        />
        </div>
    </div>
  )
}

export default SelectRoyaltyFee;