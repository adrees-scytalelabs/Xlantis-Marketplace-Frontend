import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

function BatchCreateNft({
  isSaving,
  NFTType,
  tokenList,
  versionB,
  handleSubmitEvent,
  handleSubmitEventMetamask,
  handleFreeMint,
}) {
  return (
    <div>
      {isSaving ? (
        <div className="text-center">
          <CircularProgress sx={{ color: "#FFFFFF" }} />
        </div>
      ) : NFTType === "1155" ? (
        <div className="submit-section">
          {tokenList.length === 0 ? (
            <button
              type="button"
              disabled
              className="btn submit-btn propsActionBtn"
            >
              Batch create NFTs
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                versionB === "v1-sso"
                  ? handleSubmitEvent(e)
                  : handleSubmitEventMetamask(e);
              }}
              className="btn submit-btn propsActionBtn"
            >
              Batch create NFTs
            </button>
          )}
        </div>
      ) : (
        <div className="submit-section">
          <button
            type="button"
            onClick={(e) => handleFreeMint(e)}
            className="btn submit-btn propsActionBtn"
          >
            Free Mint
          </button>
        </div>
      )}
    </div>
  );
}

export default BatchCreateNft;
