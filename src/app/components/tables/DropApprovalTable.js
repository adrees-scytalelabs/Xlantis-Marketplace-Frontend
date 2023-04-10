import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 300,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    badge: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    card: {
      minWidth: 250,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
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
  }));
  
  const makeTheme = createMuiTheme({
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
  const classes = useStyles();
  return (
    <Table responsive>
    <thead>
        <tr>
        <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
            Collection
            </div>
        </th>
        <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-center align-items-center">
            Auction
            </div>
        </th>
        <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-center align-items-center">
            Fixed Price
            </div>
        </th>
        </tr>
    </thead>
    {collections.map((i, index) => (
        <tbody>
        <tr>
            <td className={classes.collectionTitle}>{i.name}</td>
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
                    className={classes.approveBtn}

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
                    className={classes.approveBtn}
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
