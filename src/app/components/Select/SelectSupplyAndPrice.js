import React from "react";

function SelectSupplyAndPrice({
  price,
  nftType,
  nftTokenSupply,
  values,
  isDisabled,
  setSupply,
  saleType,
  setPrice,
  AlertMessage,
  setAlertMessage,
}) {
  return (
    <div>
      {nftType === "1155" ? (
        <span>
          <label>Supply</label>
          {/* <span style={{ float: "right", fontSize: "12px" }}>
            Out of ({nftTokenSupply})
          </span> */}
          <div className="form-group">
            <div style={{ display: "flex" }}>
              <input
                style={{
                  backgroundColor: "#000",
                  color: "white",
                  border:
                    nftTokenSupply === 0
                      ? "2 px solid white"
                      : nftTokenSupply >= values
                      ? "3px solid green"
                      : "3px solid red",
                }}
                type="number"
                placeholder="0"
                required
                disabled={true}
                // value={values ?? ""}
                value={nftTokenSupply}
                className="form-control"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    const regex = /^\d*$/;
                    if (regex.test(e.target.value)) {
                      if (e.target.value > nftTokenSupply) {
                        setAlertMessage(true);
                      } else {
                        setAlertMessage(false);
                      }
                      setSupply(e.target.value);
                    }
                  }
                }}
              />
              {/* <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSupply(nftTokenSupply);
                  setAlertMessage(false);
                }}
                style={{
                  backgroundColor: "#000",
                  marginLeft: "5px",
                  border: "1px solid white",
                }}
              >
                Max
              </button> */}
            </div>
            {AlertMessage ? (
              <span style={{ fontSize: "10px", color: "red" }}>
                Limit of supply is {nftTokenSupply}
              </span>
            ) : null}
          </div>
        </span>
      ) : null}

      {saleType === "auction" ? (
        <label>Floor Price (USD)</label>
      ) : (
        <label>Price (USD)</label>
      )}

      <div className="form-group">
        <div className="filter-widget newNftWrapper">
          <input
            disabled={isDisabled}
            value={price ?? ""}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "5px",
            }}
            type="number"
            required
            placeholder={0}
            className="form-control"
            onChange={(e) => {
              console.log("On change function: ", e.target.value);
              if (e.target.value >= 0) {
                setPrice(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectSupplyAndPrice;
