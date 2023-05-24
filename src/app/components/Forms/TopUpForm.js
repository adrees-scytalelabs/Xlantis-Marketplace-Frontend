import React from "react";

function TopUpForm({ amount, setAmount, handleTopUpAmount, balance }) {
  return (
    <div className="card-body p-0">
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <label>Current Balance: {balance?.toFixed(5)} Matic</label>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <label>Select your Top Up Amount</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <input
            type="number"
            required
            value={amount}
            placeholder="Enter Top Up Amount"
            className="form-control newNftInput"
            min={0.1}
            step={0.1}
            style={{ backgroundColor: "#000", color: "white" }}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <button
            className="newTemplateBtn mb-3"
            onClick={(e) => handleTopUpAmount(e)}
            style={{ backgroundColor: "#000", float: "right" }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopUpForm;
