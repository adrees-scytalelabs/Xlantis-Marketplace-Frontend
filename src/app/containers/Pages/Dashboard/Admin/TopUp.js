import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";


function TopUp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState(0.1);
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "active",
    });
  }, []);
  const handleTopUpAmount = (e) => {
    e.preventDefault();
    let data = {
      amount: amount,
    };
    axios.post(`/usd-payments/admin/topup`, data).then(
      (response) => {
        window.location.replace(response.data.sessionUrl);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        }
      }
    );
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Top Up</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Top Up</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
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
              style={{ backgroundColor: "black", color: "white" }}
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
              style={{ backgroundColor: "black", float: "right" }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopUp;
