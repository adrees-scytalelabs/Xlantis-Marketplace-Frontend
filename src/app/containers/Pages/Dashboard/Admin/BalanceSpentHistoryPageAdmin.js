import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBalanceSpentHistory } from "../../../../components/API/AxiosInterceptor";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import BalanceSpentModal from "../../../../components/Modals/BalanceSpentModal";
import BalanceSpentHistoryTable from "../../../../components/tables/BalanceSpentHistoryTable";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

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

const BalanceSpentHistoryPageAdmin = (props) => {
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [showBalanceSpentModal, setShowBalanceSpentModal] = useState(false);
  const [balanceHistoryModalData, setBalanceHistoryModalData] = useState({});

  const handleCloseBalanceSpentModal = () => {
    setShowBalanceSpentModal(false);
  };

  const handleShowBalanceSpentModal = () => {
    setShowBalanceSpentModal(true);
  };

  const getBalanceHistory = () => {
    getBalanceSpentHistory()
      .then((response) => {
        // console.log("Response from getting admin's balance spent history: ", response);
        setBalanceHistory(response.data.history);
      })
      .catch((error) => {
        console.log(
          "Error from getting admin's balance spent history: ",
          error
        );
      });
  };

  useEffect(() => {
    getBalanceHistory();
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      topupHistory: "",
      balanceSpentHistory: "active",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Balance Spent History</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Balance Spent History</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className="card-body px-0">
        {/* LOADING TABLE */}
        {balanceHistory.length > 0 ? (
          <BalanceSpentHistoryTable
            balanceHistory={balanceHistory}
            styles={styles}
            handleShowBalanceSpentModal={handleShowBalanceSpentModal}
            setBalanceHistoryModalData={setBalanceHistoryModalData}
          />
        ) : (
          // IF THERE IS NOT ROW FOR TABLE
          <MessageCard msg="No history yet" />
        )}
      </div>
      <BalanceSpentModal
        show={showBalanceSpentModal}
        handleClose={handleCloseBalanceSpentModal}
        balanceHistoryModalData={balanceHistoryModalData}
      />
    </div>
  );
};

export default BalanceSpentHistoryPageAdmin;
