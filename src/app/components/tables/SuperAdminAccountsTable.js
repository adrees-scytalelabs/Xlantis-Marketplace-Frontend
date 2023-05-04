import { Button, Tooltip } from "@mui/material";
import React from "react";
import Table from "react-bootstrap/Table";

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
}
function SuperAdminTable(props) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Username
            </div>
          </th>
          {props.ssoEnabled === true && (
            <th style={styles.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center ml-3">
                Email
              </div>
            </th>
          )}
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Wallet Address
            </div>
          </th>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center ml-5">
              Details
            </div>
          </th>
          {props.ssoEnabled === true && props.walletEnabled === true && (
            <th style={styles.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center">
                Login Type
              </div>
            </th>
          )}
          {props.approval === true && (
            <th style={styles.tableHeader}>
              <div className="row no-gutters justify-content-center align-items-center">
                Approval Status
              </div>
            </th>
          )}
          {props.manageAccounts === true && (
            <th style={styles.tableHeader}>
              <div className="row no-gutters justify-content-center align-items-center">
                Status
              </div>
            </th>
          )}
        </tr>
      </thead>

      {props.ssoEnabled === true &&
        props.admins.map((i, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td style={styles.collectionTitle}>{i.username}</td>
                <td style={styles.collectionTitle}>{i.email}</td>
                <td style={styles.collectionTitle}>
                  {i.walletAddress !== undefined ? (
                    <Tooltip
                      classes={{ tooltip: styles.noMaxWidth }}
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
                <td style={styles.collectionTitle}>
                  <button
                    className="btn submit-btn propsActionBtn "
                    onClick={(e) =>
                      props.handleModalOpen(
                        e,
                        i,
                        props.setShow,
                        props.setModalData
                      )
                    }
                  >
                    View
                  </button>
                </td>
                {props.ssoEnabled === true && props.walletEnabled === true && (
                  <td style={styles.collectionTitle}>
                    <span className="ml-1">
                      <label className="ml-5">SSO</label>
                    </span>
                  </td>
                )}
                {props.approval === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center">
                      <Button
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleVerify(
                            e,
                            i._id,
                            props.setOpen,
                            props.setAdmins,
                            props.setAdminCount,
                            props.rowsPerPage,
                            props.setVariant,
                            props.setLoad,
                            props.setNotificationData
                          );
                        }}
                      >
                        Approve
                      </Button>
                    </div>
                  </td>
                )}
                {props.statusEnable === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center ml-4">
                      <Button
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleDisable(
                            e,
                            i._id,
                          );
                        }}
                      >
                        Disable
                      </Button>
                    </div>
                  </td>
                )}
                {props.statusDisable === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center">
                      <Button
                        className='ml-4'
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleEnableSSO(
                            e,
                            i._id
                          );
                        }}
                      >
                        Enable
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          );
        })}
      {props.walletEnabled === true &&
        props.walletAdmins.map((i, index) => {
          return (
            <tbody>
              <tr>
                <td style={styles.collectionTitle}>{i.username}</td>
                {props.ssoEnabled === true && props.walletEnabled === true && (
                  <td style={styles.collectionTitle}>
                    <label className="ml-4">N/A</label>
                  </td>
                )}
                <td style={styles.collectionTitle}>
                  <Tooltip
                    classes={{ tooltip: styles.noMaxWidth }}
                    leaveDelay={1500}
                    title={i.walletAddress}
                    arrow
                  >
                    <span className="ml-4">
                      {i.walletAddress.slice(0, 8)}...
                    </span>
                  </Tooltip>
                </td>
                <td style={styles.collectionTitle}>
                  <button
                    className="btn submit-btn propsActionBtn "
                    onClick={(e) =>
                      props.handleModalOpen(
                        e,
                        i,
                        props.setShow,
                        props.setModalData
                      )
                    }
                  >
                    View
                  </button>
                </td>
                {props.ssoEnabled === true && props.walletEnabled === true && (
                  <td style={styles.collectionTitle}>
                    <label className="ml-5">Wallet</label>
                  </td>
                )}
                {props.approval === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center">
                      <Button
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleVerifyWallet(
                            e,
                            i._id,
                            props.setOpen,
                            props.setWalletAdmins,
                            props.setAdminCount,
                            props.rowsPerPage,
                            props.setVariant,
                            props.setLoad,
                            props.setNotificationData
                          );
                        }}
                      >
                        Approve
                      </Button>
                    </div>
                  </td>
                )}
                {props.statusEnable === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center ml-4">
                      <Button
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleWalletDisable(
                            e,
                            i._id,
                          );
                        }}
                      >
                        Disable
                      </Button>
                    </div>
                  </td>
                )}
                {props.statusDisable === true && (
                  <td>
                    <div className="row no-gutters justify-content-center align-items-center">
                      <Button
                        className='ml-4'
                        sx={styles.approveBtn}
                        onClick={(e) => {
                          props.handleEnableWallet(
                            e,
                            i._id
                          );
                        }}
                      >
                        Enable
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          );
        })}
    </Table>
  );
}

export default SuperAdminTable;
