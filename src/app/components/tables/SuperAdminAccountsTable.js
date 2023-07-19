import {
  Button,
  Tooltip,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import WarningModal from "../Modals/WarningModal";

const styles = {
  noMaxWidth: {
    maxWidth: "none",
  },
  title: {
    fontSize: 14,
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
    fontFamily: "inter",
    paddingTop: "10px",
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
function SuperAdminTable(props) {
  const [warningModalShow, setWarningModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [genericFunction, setGenericFunction] = useState(null);
  const handleVerify = (e, id, functionName) => {
    let message = "";
    let genericFunction = null;

    switch (functionName) {
      case "handleVerify":
        message = "Do you really want to approve this admin.";
        genericFunction = props.handleVerify;
        break;
      case "handleVerifyWallet":
        message = "Do you really want to approve this admin.";
        genericFunction = props.handleVerifyWallet;
        break;
      case "handleEnableSSO":
        message = "Do you really want to enable this admin.";
        genericFunction = props.handleEnableSSO;
        break;
      case "handleEnableWallet":
        message = "Do you really want to enable this admin.";
        genericFunction = props.handleEnableWallet;
        break;
      case "handleDelete":
        message = "Do you really want to delete this admin.";
        genericFunction = props.handleDelete;
        break;
      default:
        break;
    }

    setMessage(message);
    setId(id);
    setWarningModalShow(true);
    setGenericFunction(() => genericFunction);
  };
  const handleWarningModalClose = () => {
    setWarningModalShow(false);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
        <Table>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell>
                <div className="row no-gutters justify-content-start align-items-center">
                  Username
                </div>
              </TableCell>
              {props.ssoEnabled && (
                <TableCell>
                  <div className="row no-gutters justify-content-start align-items-center ml-3">
                    Email
                  </div>
                </TableCell>
              )}
              <TableCell>
                <div className="row no-gutters justify-content-start align-items-center">
                  Wallet Address
                </div>
              </TableCell>
              <TableCell>
                <div className="row no-gutters justify-content-start align-items-center ml-5">
                  Details
                </div>
              </TableCell>
              {props.ssoEnabled && props.walletEnabled && (
                <TableCell>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Login Type
                  </div>
                </TableCell>
              )}
              {props.approval && (
                <TableCell>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Approval Status
                  </div>
                </TableCell>
              )}
              {props.approval && (
                <TableCell>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Delete Account
                  </div>
                </TableCell>
              )}
              {props.manageAccounts && (
                <TableCell>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Status
                  </div>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {props.ssoEnabled === true &&
            props.admins.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell style={styles.collectionTitle}>
                    {i.username}
                  </TableCell>
                  <TableCell style={styles.collectionTitle}>
                    {i.email}
                  </TableCell>
                  <TableCell style={styles.collectionTitle}>
                    {i.walletAddress !== undefined ? (
                      <Tooltip
                        title={
                          <Typography fontSize={16}>
                            {i.walletAddress}
                          </Typography>
                        }
                      >
                        <span className="ml-4">
                          {i.walletAddress.slice(0, 8)}...
                        </span>
                      </Tooltip>
                    ) : (
                      <label className="ml-4">N/A</label>
                    )}
                  </TableCell>
                  <TableCell style={styles.collectionTitle}>
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
                  </TableCell>
                  {props.ssoEnabled === true &&
                    props.walletEnabled === true && (
                      <TableCell style={styles.collectionTitle}>
                        <span>
                          <label className="ml-4">SSO</label>
                        </span>
                      </TableCell>
                    )}
                  {props.approval === true && (
                    <TableCell>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          style={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleVerify");
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </TableCell>
                  )}
                  {props.approval === true && (
                    <TableCell>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          style={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleDelete");
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  )}
                  {props.statusEnable === true && (
                    <TableCell>
                      <div className="row no-gutters justify-content-center align-items-center ml-4">
                        <Button
                          style={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleDisable");
                          }}
                        >
                          Disable
                        </Button>
                      </div>
                    </TableCell>
                  )}
                  {props.statusDisable === true && (
                    <TableCell>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          className="ml-4"
                          style={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleEnableSSO");
                          }}
                        >
                          Enable
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          {props.walletEnabled === true &&
            props.walletAdmins.map((i, index) => {
              return (
                <tbody style={{ color: "white" }}>
                  <TableRow>
                    <TableCell style={styles.collectionTitle}>
                      {i.username}
                    </TableCell>
                    {props.ssoEnabled === true &&
                      props.walletEnabled === true && (
                        <TableCell style={styles.collectionTitle}>
                          <label className="ml-4">N/A</label>
                        </TableCell>
                      )}
                    <TableCell style={styles.collectionTitle}>
                      <Tooltip
                        title={
                          <Typography fontSize={16}>
                            {i.walletAddress}
                          </Typography>
                        }
                      >
                        <span className="ml-4">
                          {i.walletAddress.slice(0, 8)}...
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell style={styles.collectionTitle}>
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
                    </TableCell>
                    {props.ssoEnabled === true &&
                      props.walletEnabled === true && (
                        <TableCell style={styles.collectionTitle}>
                          <label className="ml-4">Wallet</label>
                        </TableCell>
                      )}
                    {props.approval === true && (
                      <TableCell>
                        <div className="row no-gutters justify-content-center align-items-center">
                          <Button
                            style={styles.approveBtn}
                            onClick={(e) => {
                              handleVerify(e, i._id, "handleVerifyWallet");
                            }}
                          >
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {props.approval === true && (
                      <TableCell>
                        <div className="row no-gutters justify-content-center align-items-center">
                          <Button
                            style={styles.approveBtn}
                            onClick={(e) => {
                              handleVerify(e, i._id, "handleDelete");
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {props.statusEnable === true && (
                      <TableCell>
                        <div className="row no-gutters justify-content-center align-items-center ml-4">
                          <Button
                            style={styles.approveBtn}
                            onClick={(e) => {
                              handleVerify(e, i._id, "handleWalletDisable");
                            }}
                          >
                            Disable
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {props.statusDisable === true && (
                      <TableCell>
                        <div className="row no-gutters justify-content-center align-items-center">
                          <Button
                            className="ml-4"
                            style={styles.approveBtn}
                            onClick={(e) => {
                              handleVerify(e, i._id, "handleWalletDisable");
                            }}
                          >
                            Enable
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                </tbody>
              );
            })}
        </Table>
      </TableContainer>
      <WarningModal
        show={warningModalShow}
        handleClose={handleWarningModalClose}
        text={message}
        handleApprove={genericFunction}
        id={id}
      />
    </>
  );
}

export default SuperAdminTable;
