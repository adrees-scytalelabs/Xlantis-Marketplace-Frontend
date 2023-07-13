import { Button, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import WarningModal from "../Modals/WarningModal";
import { handleVerify } from "../Utils/SuperAdminFunctions";

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
};
function SuperAdminTable(props) {
  const [warningModalShow, setWarningModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [genericFunction, setGenericFunction] = useState(null);
  const handleVerify = (e, id, functionName) => {
    if (
      functionName === "handleVerify" ||
      functionName === "handleVerifyWallet"
    )
      setMessage("Do you really want to approve this admin.");
    else if (
      functionName === "handleEnableSSO" ||
      functionName === "handleEnableWallet"
    )
      setMessage("Do you really want to enable this admin.");
    else if (functionName==="handleDelete") setMessage("Do you really want to delete this admin.");
    setId(id);
    setWarningModalShow(true);
    if (functionName === "handleVerify")
      setGenericFunction(() => props.handleVerify);
    else if (functionName === "handleVerifyWallet")
      setGenericFunction(() => props.handleVerifyWallet);
    else if (functionName === "handleDisable")
      setGenericFunction(() => props.handleDisable);
    else if (functionName === "handleEnableSSO")
      setGenericFunction(() => props.handleEnableSSO);
    else if (functionName === "handleDisable")
      setGenericFunction(() => props.handleDisable);
    else if (functionName === "handleWalletDisable")
      setGenericFunction(() => props.handleWalletDisable);
    else if (functionName === "handleEnableWallet")
      setGenericFunction(() => props.handleEnableWallet);
      else if (functionName === "handleDelete")
      setGenericFunction(() => props.handleDelete);
  };
  const handleWarningModalClose = () => {
    setWarningModalShow(false);
  };
  return (
    <>
      <Table responsive>
        <thead style={{ color: "black" }}>
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
             {props.approval === true && (
              <th sx={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Delete Account
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
              <tbody style={{ color: "white" }}>
                <tr>
                  <td sx={styles.collectionTitle}>{i.username}</td>
                  <td sx={styles.collectionTitle}>{i.email}</td>
                  <td sx={styles.collectionTitle}>
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
                  {props.ssoEnabled === true &&
                    props.walletEnabled === true && (
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
                            handleVerify(e, i._id, "handleVerify");
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  )}
                       {props.approval === true && (
                    <td>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          sx={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleDelete");
                          }}
                        >
                          Delete
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
                            handleVerify(e, i._id, "handleDisable");
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
                          className="ml-4"
                          sx={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleEnableSSO");
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
              <tbody style={{ color: "white" }}>
                <tr>
                  <td sx={styles.collectionTitle}>{i.username}</td>
                  {props.ssoEnabled === true &&
                    props.walletEnabled === true && (
                      <td sx={styles.collectionTitle}>
                        <label className="ml-4">N/A</label>
                      </td>
                    )}
                  <td sx={styles.collectionTitle}>
                    <Tooltip
                      title={
                        <Typography fontSize={16}>{i.walletAddress}</Typography>
                      }
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
                  {props.ssoEnabled === true &&
                    props.walletEnabled === true && (
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
                            handleVerify(e, i._id, "handleVerifyWallet");
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  )}
                    {props.approval === true && (
                    <td>
                      <div className="row no-gutters justify-content-center align-items-center">
                        <Button
                          sx={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleDelete");
                          }}
                        >
                          Delete
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
                            handleVerify(e, i._id, "handleWalletDisable");
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
                          className="ml-4"
                          sx={styles.approveBtn}
                          onClick={(e) => {
                            handleVerify(e, i._id, "handleWalletDisable");
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
