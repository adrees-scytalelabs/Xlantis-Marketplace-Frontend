import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
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
    fontFamily: "inter",
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
}));
function SuperAdminTable(props) {
  const classes = useStyles();
  useEffect(() => {
   console.log(props.admins);
  });
  return (
    <Table responsive>
      <thead>
        <tr>
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Username
            </div>
          </th>
          {props.ssoEnabled == true && (
            <th className={classes.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center ml-3">
                Email
              </div>
            </th>
          )}
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Wallet Address
            </div>
          </th>
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center ml-5">
              Details
            </div>
          </th>
          {props.ssoEnabled == true && props.walletEnabled == true && (
            <th className={classes.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center">
                Login Type
              </div>
            </th>
          )}
          {props.approval == true && (
            <th className={classes.tableHeader}>
              <div className="row no-gutters justify-content-center align-items-center">
                Approval Status
              </div>
            </th>
          )}
        </tr>
      </thead>
      {props.ssoEnabled == true &&
        props.admins.map((i, index) => {
          return (
            
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.username}</td>
                  <td className={classes.collectionTitle}>{i.email}</td>
                  <td className={classes.collectionTitle}>
                    {i.walletAddress != undefined ? (
                      <Tooltip
                        classes={{ tooltip: classes.noMaxWidth }}
                        leaveDelay={1500}
                        title={i.walletAddress}
                        arrow
                      >
                        <span className="ml-4">
                          {i.walletAddress.slice(0, 8)}...
                        </span>
                      </Tooltip>
                    ) : (
                      <label className="ml-4">N/A</label>
                    )}
                  </td>
                  <td className={classes.collectionTitle}>
                    <button
                      className="btn submit-btn propsActionBtn "
                      onClick={(e) => props.handleModalOpen(e, i)}
                    >
                      View
                    </button>
                  </td>
                  {props.ssoEnabled == true && props.walletEnabled == true && (
                    <td className={classes.collectionTitle}>
                      <span className="ml-1">
                        <label className="ml-5">SSO</label>
                      </span>
                    </td>
                  )}
                  {props.approval == true && (
                    <td>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          onClick={(e) => {
                            props.handleVerify(e, i._id);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              </tbody>
            )
        })}
      {props.walletEnabled == true &&
        props.walletAdmins.map((i, index) => {
          return (
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.username}</td>
                  {props.ssoEnabled == true && props.walletEnabled == true && (
                    <td className={classes.collectionTitle}>
                      <label className="ml-4">N/A</label>
                    </td>
                  )}
                  <td className={classes.collectionTitle}>
                    <Tooltip
                      classes={{ tooltip: classes.noMaxWidth }}
                      leaveDelay={1500}
                      title={i.walletAddress}
                      arrow
                    >
                      <span className="ml-4">
                        {i.walletAddress.slice(0, 8)}...
                      </span>
                    </Tooltip>
                  </td>
                  <td className={classes.collectionTitle}>
                    <button
                      className="btn submit-btn propsActionBtn "
                      onClick={(e) => props.handleModalOpen(e, i)}
                    >
                      View
                    </button>
                  </td>
                  {props.ssoEnabled == true && props.walletEnabled == true && (
                    <td className={classes.collectionTitle}>
                      <label className="ml-5">Wallet</label>
                    </td>
                  )}
                  {props.approval == true && (
                    <td>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className={classes.approveBtn}
                          onClick={(e) => {
                            props.handleVerifyWallet(e, i._id);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              </tbody>
            )
        })}
    </Table>
  );
}

export default SuperAdminTable;
