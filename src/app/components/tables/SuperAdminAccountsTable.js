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
      <thead style={{color:'black'}}>
        <tr>
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Username
            </div>
          </th>
          {props.ssoEnabled === true && (
            <th sx={styles.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center ml-3">
                Email
              </div>
            </th>
          )}
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Wallet Address
            </div>
          </th>
          <th sx={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center ml-5">
              Details
            </div>
          </th>
          {props.ssoEnabled === true && props.walletEnabled === true && (
            <th sx={styles.tableHeader}>
              <div className="row no-gutters justify-content-start align-items-center">
                Login Type
              </div>
            </th>
          )}
          {props.approval === true && (
            <th sx={styles.tableHeader}>
              <div className="row no-gutters justify-content-center align-items-center">
                Approval Status
              </div>
            </th>
          )}
          {props.manageAccounts === true && (
            <th sx={styles.tableHeader}>
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
            <tbody style={{color:'white'}}>
              <tr>
                <td sx={styles.collectionTitle}>{i.username}</td>
                <td sx={styles.collectionTitle}>{i.email}</td>
                <td sx={styles.collectionTitle}>
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
                <td sx={styles.collectionTitle}>
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
                  <td sx={styles.collectionTitle}>
                    <span>
                      <label className="ml-4">SSO</label>
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
            <tbody style={{color:'white'}}>
              <tr>
                <td sx={styles.collectionTitle}>{i.username}</td>
                {props.ssoEnabled === true && props.walletEnabled === true && (
                  <td sx={styles.collectionTitle}>
                    <label className="ml-4">N/A</label>
                  </td>
                )}
                <td sx={styles.collectionTitle}>
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
                <td sx={styles.collectionTitle}>
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
                  <td sx={styles.collectionTitle}>
                    <label className="ml-4">Wallet</label>
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