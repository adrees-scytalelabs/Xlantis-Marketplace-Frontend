import { Button, createTheme } from "@mui/material";
import React from "react";
import Table from "react-bootstrap/Table";
const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  card: {
    minWidth: 250,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tableHeader: {
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
  },
  approveBtn: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&:hover": {
      background: "#f00",
    },
  },
}

const makeTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "#000",
        color: "#fff",
        padding: "10px 30px",
        border: "1px solid #F64D04",
        borderRadius: "0px 15px",
        "&$hover": {
          boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
        },
      },
    },
  },
});


function DropApprovalTable({
  collections,
  giveAuctionApproval,
  giveFixedPriceApproval
}) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Collection
            </div>
          </th>
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-center align-items-center">
              Auction
            </div>
          </th>
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-center align-items-center">
              Fixed Price
            </div>
          </th>
        </tr>
      </thead>
      {collections.map((i, index) => (
        <tbody>
          <tr>
            <td sx={styles.collectionTitle}>{i.name}</td>
            <td>

              {i.isAuctionDropVerified ? (
                <div className="row no-gutters justify-content-center align-items-center">
                  <Button disabled>
                    <span className="text-white">Approved </span>
                    <i
                      className="fas fa-check ml-2"
                      style={{ color: "green" }}
                    ></i>{" "}
                  </Button>
                </div>
              ) : (
                <div className="row no-gutters justify-content-center align-items-center">
                  <Button
                    sx={styles.approveBtn}

                    onClick={(e) => {
                      giveAuctionApproval(i);
                    }}
                  >
                    Approve
                  </Button>
                </div>
              )}

            </td>
            <td>
              {i.isFixedPriceDropVerified ? (
                <div className="row no-gutters justify-content-center align-items-center">
                  <Button disabled>
                    <span style={{ color: "#fff" }}>Approved</span>{" "}
                    <i
                      className="fas fa-check ml-2"
                      style={{ color: "green" }}
                    ></i>{" "}
                  </Button>
                </div>
              ) : (
                <div className="row no-gutters justify-content-center align-items-center">
                  <Button
                    sx={styles.approveBtn}
                    onClick={(e) => {
                      giveFixedPriceApproval(i);
                    }}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default DropApprovalTable;
