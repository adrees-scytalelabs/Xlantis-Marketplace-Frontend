import React, { useState } from "react";

function TopUpForm({ amount, setAmount, handleTopUpAmount }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  
  const changeAmount = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      setAmount(e.target.value);
      if (e.target.value < 0.5 || e.target.value > 999999.99) {
        setErrorMessage(
          "Value must be greater than $0.5 and less than $999,999.99"
        );
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div className="card-body p-0">
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <label>Select your Top Up Amount</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="row col-lg-6 col-md-6 col-sm-12 input-group form-group newNftWrapper">
          <div className="input-group-prepend">
            <span className="input-group-text bg-transparent text-white">$</span>
          </div>
          <input
            type="number"
            required
            value={amount}
            placeholder="Enter Top Up Amount"
            className="form-control newNftInput"
            min={0.5}
            step={0.1}
            style={{ backgroundColor: "#000", color: "white" }}
            onChange={(e) => {
              changeAmount(e);
            }}
          />
          {error && <span style={{ color: "red" }}>{errorMessage}</span>}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <button
            className="newTemplateBtn mb-3"
            onClick={(e) => handleTopUpAmount(e)}
            style={{ backgroundColor: "#000", float: "right" }}
            disabled={error}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopUpForm;
