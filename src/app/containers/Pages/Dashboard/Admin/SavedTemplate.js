import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createMuiTheme, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import { useSnackbar } from "notistack";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TemplateDetails from "../../../../components/Modals/TemplateDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  noMaxWidth: {
    maxWidth: "none",
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
function SavedTemplate(props) {
  const classes = useStyles();
  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  let [isSaving, setIsSaving] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); // eslint-disable-next-line
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [templateData, setTemplateData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalState,setModalState] = useState(false);
  const [modalData,setModalData] = useState();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const handleOpen = (e,data) => {
    e.preventDefault();
    setModalData(data);
    setModalState(true);
  }
  const handleClose =() => {
    setModalState(false);
  }

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    // getUnverifiedAdmins(
    //   newPage * rowsPerPage,
    //   newPage * rowsPerPage + rowsPerPage
    // );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // getUnverifiedAdmins(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  let handleSavedTemplate = async () => {
    // e.preventDefault();
    handleShowBackdrop();

    // console.log("Properties : ", properties);
    // console.log("Title", title);

    // let templateData = {
    //   name: title,
    //   data: properties,
    // };

    // console.log("Template Data", templateData);
    try {
      axios.get("/super-admin/template").then(
        (response) => {
          setTemplateData(response.data.templates);
          console.log("response", response);
          console.log("size", response.data.templates[0].properties[0].key);
          console.log("Data of the state", templateData);
          handleCloseBackdrop();
          let variant = "success";
          enqueueSnackbar("Template loaded successfully", { variant });
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          handleCloseBackdrop();

          let variant = "error";
          enqueueSnackbar("Unable to Create Template", { variant });
        }
      );
    } catch (e) {
      console.log("Error in axios request to create template", e);
    }
  };
  let check = () => {
    console.log("Data of the state", templateData);
  };
  useEffect(() => {
    handleSavedTemplate();
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "active",
      template: "",
      saved: "active",
    }); // eslint-disable-next-line
  }, []);
  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Saved Template</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/superAdminDashboard/properties`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Properties
                </li>
              </Link>
              <li className="breadcrumb-item active">Saved Template</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row no-gutters">
        {/* <div className="col-md-12 col-lg-6"> */}
        <Table responsive>
          <thead>
            <tr>
              <th className={classes.tableHeader}>
                <div className="row no-gutters justify-content-start align-items-center">
                  Template Name
                </div>
              </th>
              <th className={classes.tableHeader}>
                <div className="row no-gutters justify-content-start align-items-center">
                  Properties
                </div>
              </th>
              <th className={classes.tableHeader}>
                <div className="row no-gutters justify-content-start align-items-center">
                  Delete/Edit
                </div>
              </th>
            </tr>
          </thead>
          {templateData.map((i, index) => (
            <tbody>
              <tr>
                <td className={classes.collectionTitle}>{i.name}</td>
                <td className={classes.collectionTitle}>
                  Total Number of Properties is {i.properties.length}
                  <br></br>
                  <button
                    className="btn submit-btn propsActionBtn ml-3"
                    // onClick={(e) => handleSaveTemplate(e)}
                    // style={{ float: "right" }}
                    onClick={(e) => handleOpen(e,i)}
                  >
                    View Properties
                  </button>
                </td>
                <td className={classes.collectionTitle}>
                  <span className="ml-5"><DeleteIcon color="action" style={{color:"red"}}></DeleteIcon></span>
                  <span className="ml-2"><EditIcon  style={{color:`green` }}></EditIcon></span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TemplateDetails
        show={modalState}
        handleClose={handleClose}
        templateData={modalData}
      ></TemplateDetails>
    </div>
  );
}

export default SavedTemplate;
