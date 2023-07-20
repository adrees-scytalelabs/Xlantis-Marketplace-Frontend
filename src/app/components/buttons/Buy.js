import { Grid, Tooltip } from "@mui/material";
import React from "react";

function BuyButton({
  isSold,
  startTime,
  endTime,
  versionB,
  handleOpenModal,
  handleBuy,
}) {
  return (
    <div>
      {isSold === false &&
      new Date() >= new Date(startTime) &&
      new Date() < new Date(endTime) ? (
        <Grid container spacing={1}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              textAlign: "center",
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                versionB === "v1-sso" ? handleOpenModal(e) : handleBuy(e);
              }}
              className="bidBtn"
            >
              Buy
            </button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              textAlign: "center",
            }}
          >
            <div data-tip data-for="registerTip">
              <Tooltip
                title={
                  isSold === true
                    ? "NFT Is Sold"
                    : new Date() < new Date(startTime)
                    ? "Sale Has Not Started Yet"
                    : new Date() > new Date(endTime)
                    ? "Sale Has Ended"
                    : null
                }
                placement="top"
                arrow
              >
                <button
                  type="button"
                  data-tip
                  data-for="registerTip"
                  disabled
                  onClick={(e) => handleBuy(e)}
                  className="bidBtn"
                >
                  Buy
                </button>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default BuyButton;
