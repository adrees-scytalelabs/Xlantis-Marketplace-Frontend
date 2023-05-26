import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopUpHistoryOfUser } from "../../../../components/API/AxiosInterceptor";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import TopupHistoryTable from "../../../../components/tables/TopupHistoryTabke";

const styles = {
  noMaxWidth: {
    maxWidth: "none",
  },
  title: {
    fontSize: 14,
  },
  tableHeader: {
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    // fontFamily: "inter",
  },
  approveBtn: {
    backgroundColor: "#F64D04",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&$hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
};

const TopupHistoryPageUser = (props) => {
  const [topupHistory, setTopupHistory] = useState([]);

  const getTopUpHistory = () => {
    getTopUpHistoryOfUser()
      .then((response) => {
        console.log("Response from getting top up history of user: ", response);
        setTopupHistory(response.data.topupHistory);
      })
      .catch((error) => {
        console.log("Error from getting top up history of user: ", error);
      });
  };

  useEffect(() => {
    getTopUpHistory();
    props.setActiveTab({
      dashboard: "",
      myNFTs: "",
      totalUserAccount: "",
      pendingUserAccount: "",
      resolvedDisputedOrders: "",
      tradeListOrders: "",
      earningsList: "",
      referralEarnings: "",
      settings: "",
      changePassword: "",
      newNFT: "",
      newCube: "",
      myDrops: "",
      newDrop: "",
      newSeason: "",
      newCollection: "",
      myCubes: "",
      newRandomDrop: "",
      topupHistory: "active",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Top-up History</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash">
                <Link style={{ color: "#777" }} to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active">Top-up History</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        {/* LOADING TABLE */}
        {topupHistory.length > 0 ? (
          <TopupHistoryTable topupHistory={topupHistory} styles={styles} />
        ) : (
          // IF THERE IS NOT ROW FOR TABLE
          <MessageCard msg="No history yet" />
        )}
      </div>
    </div>
  );
};

export default TopupHistoryPageUser;
