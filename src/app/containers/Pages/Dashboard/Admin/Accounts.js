import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  TablePagination,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useResolvedPath } from "react-router-dom";
import {
  disableAdminV1,
  enableAdminV1,
  getVerifiedAdminsV1Paginated,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import AdminFilterModal from "../../../../components/Modals/AdminFilterModal";
import AdminInformationModal from "../../../../components/Modals/AdminInformationModal";
import WarningModal from "../../../../components/Modals/WarningModal";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import {
  handleModalClose,
  handleModalOpen,
  handleWalletDisable,
} from "../../../../components/Utils/SuperAdminFunctions";

const theme = createTheme({
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
        selectIcon: {
          color: "white",
        },
        displayedRows: {
          color: "white",
          marginTop: "5px",
        },
        toolbar: {
          "& .MuiIconButton-root": {
            color: "white",
          },
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: "white",
      },
    },
  },
});

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
    fontFamily: "Orbitron",
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

function Accounts(props) {
  const [value, setValue] = useState(0);
  const [admins, setAdmins] = useState([]);
  const path = useResolvedPath("").pathname;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [walletSearch, setWalletSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState("");
  const [genericFunction, setGenericFunction] = useState(null);
  const [warningModalShow, setWarningModalShow] = useState(false);
  const [id, setId] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdminEnable = async (e, id) => {
    const body = { adminId: id };
    await enableAdminV1(body)
      .then((response) => {
        console.log("Response from enabling admin: ", response);
        let variant = "success";
        setSnackbarMessage("Admin Enabled Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      })
      .catch((error) => {
        console.log("Error from enabling admin: ", error);
        let variant = "error";
        setSnackbarMessage("Unable to enable Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      });
  };

  const handleApplyFilter = (enableList, typeList) => {
    const filtered = admins.filter((user) => {
      if (typeList.length > 0 && enableList.length > 0) {
        if (
          typeList.includes(user.userType) &&
          enableList.includes(String(user.isEnabled))
        ) {
          return true;
        }
      }
      if (typeList.length === 0 && enableList.length > 0) {
        if (enableList.includes(String(user.isEnabled))) {
          return true;
        }
      }
      if (typeList.length > 0 && enableList.length === 0) {
        if (typeList.includes(user.userType)) {
          return true;
        }
      }
      if (typeList.length === 0 && enableList.length === 0) {
        return true;
      }

      return false;
    });
    setFilteredAdmins(filtered);
    handleCloseFilterModal();
  };

  const handleAdminDisable = async (e, id) => {
    const body = { adminId: id };
    await disableAdminV1(body)
      .then((response) => {
        console.log("Response from disabling admin: ", response);
        let variant = "success";
        setSnackbarMessage("Admin Disabled Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      })
      .catch((error) => {
        let variant = "error";
        setSnackbarMessage("Unable to disable Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        console.log("Error from enabling admin: ", error);
      });
  };
  const handleWarningModalClose = () => {
    setWarningModalShow(false);
  };
  const handleWarningModalOpen = (e, id, functionName) => {
    if (functionName === "handleAdminDisable")
      setMessage("Do you really want to disable this admin.");
    else setMessage("Do you really want to enable this admin.");
    setId(id);
    setWarningModalShow(true);
    if (functionName === "handleAdminDisable")
      setGenericFunction(() => handleAdminDisableStatus);
    else setGenericFunction(() => handleAdminEnableStatus);
  };
  const handleAdminDisableStatus = async (e, id) => {
    await handleAdminDisable(e, id);
    getAllAdmins();
  };
  const handleAdminEnableStatus = async (e, id) => {
    await handleAdminEnable(e, id);
    getAllAdmins();
  };
  const getAllAdmins = async () => {
    setOpen(true);
    await getVerifiedAdminsV1Paginated(0, 1000)
      .then((response) => {
        console.log("Response from getting admins: ", response);
        setAdmins(response.data.verifiedAdmins);
        setFilteredAdmins(response.data.verifiedAdmins);
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error from getting admins: ", error);
        setOpen(false);
      });
  };

  useEffect(() => {
    getAllAdmins();
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "active",
      accountApproval: "",
      accounts: "",
      sso: "active",
      wallet: "active",
      properties: "",
      template: "",
      saved: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Accounts</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Accounts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body page-height px-0">
        <div className="d-flex align-items-center justify-content-end mb-3">
          <span className="m-3">Search By: </span>
          <input
            className="bg-transparent border border-white rounded text-white w-25 p-3"
            placeholder="Wallet Address"
            value={walletSearch}
            onChange={(e) => {
              setWalletSearch(e.target.value);
            }}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end mb-3 mr-3">
          Filter{" "}
          <FilterListIcon
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={handleOpenFilterModal}
          />
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-start align-items-center">
                  Username
                </div>
              </th>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Email
                </div>
              </th>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Wallet Address
                </div>
              </th>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Login Type
                </div>
              </th>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Status
                </div>
              </th>
              <th style={styles.tableHeader}>
                <div className="row no-gutters justify-content-center align-items-center">
                  Details
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins
              ?.filter((i) => i.walletAddress.includes(walletSearch))
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((i, index) => (
                <tr key={index}>
                  <td className="text-center" style={styles.collectionTitle}>
                    {i.username}
                  </td>
                  <td className="text-center" style={styles.collectionTitle}>
                    {i.email}
                  </td>
                  <td className="text-center" style={styles.collectionTitle}>
                    <Tooltip
                      placement="top"
                      title={
                        <Typography fontSize={16}>{i.walletAddress}</Typography>
                      }
                    >
                      <span className="text-center">
                        {i.walletAddress.slice(0, 6)}...
                      </span>
                    </Tooltip>
                  </td>
                  <td className="text-center" style={styles.collectionTitle}>
                    {i.userType === "v1" ? "SSO" : "Wallet"}
                  </td>
                  <td className="text-center" style={styles.collectionTitle}>
                    {i.isEnabled ? (
                      <Button
                        onClick={async (e) => {
                          // setFilteredAdmins([]);
                          handleWarningModalOpen(
                            e,
                            i._id,
                            "handleAdminDisable"
                          );
                          // await handleAdminDisable(e, i._id);
                          // getAllAdmins();
                        }}
                        sx={styles.approveBtn}
                      >
                        Disable
                      </Button>
                    ) : (
                      <Button
                        onClick={async (e) => {
                          // setFilteredAdmins([]);
                          handleWarningModalOpen(e, i._id, "handleAdminEnable");
                          // await handleAdminEnable(e, i._id);
                          // getAllAdmins();
                        }}
                        sx={styles.approveBtn}
                      >
                        Enable
                      </Button>
                    )}
                  </td>
                  <td className="text-center" style={styles.collectionTitle}>
                    <button
                      className="btn submit-btn propsActionBtn"
                      onClick={(e) => {
                        handleModalOpen(e, i, setShowModal, setModalData);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="text-white">
          <ThemeProvider theme={theme}>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 100]}
              count={admins.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </ThemeProvider>
        </div>
      </div>
      <CircularBackdrop open={open} />
      <AdminInformationModal
        show={showModal}
        handleClose={handleModalClose}
        adminData={modalData}
        setShow={setShowModal}
      />
      <AdminFilterModal
        show={openFilterModal}
        handleClose={handleCloseFilterModal}
        handleApplyFilter={handleApplyFilter}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <WarningModal
        show={warningModalShow}
        handleClose={handleWarningModalClose}
        text={message}
        handleApprove={genericFunction}
        id={id}
      />
    </div>
  );
}

export default Accounts;
