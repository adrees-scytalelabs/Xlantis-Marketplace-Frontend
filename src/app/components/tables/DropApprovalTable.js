import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React from "react";
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
    "& th": {
      fontSize: "1.25rem",
      fontWeight: "bold",
      padding: "14px",
      color: "#000",
      backgroundColor: "white",
    },
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
};

function DropApprovalTable({
  collections,
  giveAuctionApproval,
  giveFixedPriceApproval,
}) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
      <Table>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>
              <div className="row no-gutters justify-content-start align-items-center">
                Collection
              </div>
            </TableCell>
            <TableCell>
              <div className="row no-gutters justify-content-center align-items-center">
                Auction
              </div>
            </TableCell>
            <TableCell>
              <div className="row no-gutters justify-content-center align-items-center">
                Fixed Price
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        {collections.map((i, index) => (
          <TableRow style={styles.collectionTitle}>
            <TableCell>{i.name}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
}

export default DropApprovalTable;
