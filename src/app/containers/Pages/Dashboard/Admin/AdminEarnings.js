import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EarningsImage from "../../../../assets/img/Earnings.png";

const AdminEarnings = (props) => {
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      earnings: "active",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      topupHistory: "",
      categories: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Earnings</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Earnings</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-5 bg-white text-dark">
          <div className="row">
            <div className="col-2">
              <img src={EarningsImage} />
            </div>
            <div className="col-10 d-flex flex-column justify-content-end align-items-end">
              <div>
                <h1 className="col">
                  <span style={{ fontFamily: "Orbitron" }}>$1000</span>
                </h1>
              </div>
              <div>
                <h1 className="col">
                  <span
                    style={{ fontFamily: "Inter" }}
                    className="font-weight-light"
                  >
                    Current Balance
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 border border-white ml-1 h-80">Box 2</div>
        <div className="col-3 border border-white ml-1 h-80">Box 3</div>
      </div>
    </div>
  );
};

export default AdminEarnings;
