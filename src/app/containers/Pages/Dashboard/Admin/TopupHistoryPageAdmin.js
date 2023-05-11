import { Button, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

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

const TopupHistoryPageAdmin = (props) => {
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
      topUp: "",
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
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Top-up History</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Table responsive>
          <thead style={{ color: "black" }}>
            <tr>
              <th style={styles.tableHeader}>Tx No.</th>
              <th style={styles.tableHeader}>Amount (USD)</th>
              <th style={styles.tableHeader}>Amount (MATIC)</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody style={{ color: "white" }}>
            <tr>
              <td style={styles.collectionTitle}>1234567</td>
              <td style={styles.collectionTitle}>1000</td>
              <td style={styles.collectionTitle}>1000</td>
              <td style={styles.collectionTitle}>10-12-2023</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TopupHistoryPageAdmin;
