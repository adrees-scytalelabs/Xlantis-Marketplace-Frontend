import { TablePagination } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import DateTimePicker from "react-datetime-picker";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CreateAuctionContract from "../../../../components/blockchain/Abis/CreateAuctionContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import CubeComponent1 from "../../../../components/Cube/CubeComponent1";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import { useHistory, useRouteMatch } from "react-router-dom";
import ipfs from "../../../../components/IPFS/ipfs";
import Table from "react-bootstrap/Table";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import Factory1155Contract from "../../../../components/blockchain/Abis/Factory1155.json";
import Factory721Contract from "../../../../components/blockchain/Abis/Factory721.json";

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

function Accounts(props) {
  const classes = useStyles();

  const [network, setNetwork] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let [admins, setAdmins] = useState([]);
  let [isSaving, setIsSaving] = useState(false);

  let [adminCount, setAdminCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); // eslint-disable-next-line
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const history = useHistory();

  useEffect(() => {
    getUnverifiedAdmins(0,rowsPerPage);
    // getMyCubes();
    props.setActiveTab({
      dashboard: "",
      manageAccounts : "",
      accountApproval : "",
      accounts: "active",
    }); // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getUnverifiedAdmins(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getUnverifiedAdmins(0, parseInt(event.target.value, 10));
    setPage(0);
  };

    let getUnverifiedAdmins = (start,end) => {
        // axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
        //     "Authorization"
        // )}`;
        setOpen(true);
        axios
            .get(`/super-admin/admins/${start}/${end}`)
            .then((response) => {
                console.log("response.data", response.data);
                setAdmins(response.data.Admins);
                setAdminCount(response.data.Admins.length)
                setOpen(false);
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.response.data !== undefined) {
                    if (error.response.data === "Unauthorized access (invalid token) !!") {
                        Cookies.remove("Authorization");
                        localStorage.removeItem("Address")
                        window.location.reload();
                    }
                }
                setOpen(false);
            });
    };

    let handleVerify = (e,verifyAdminId ) => { 
      e.preventDefault();
      setIsSaving(true);
      handleShowBackdrop();
      // setIsUploadingData(true);

      //sending data to backend
      let data ={
          adminId : verifyAdminId
      }

      console.log("data", data);

      axios.put(`super-admin/admin/verify/${verifyAdminId}}`, data).then(
          (response) => {
              console.log("admin verify response: ", response);
              let variant = "success";
              enqueueSnackbar('Admin Verified Successfully.', { variant });
              handleCloseBackdrop();
              setIsSaving(false);
              // setIsUploadingData(false);


          },
          (error) => {
              console.log("Error on status pending nft: ", error);      
              console.log("Error on status pending nft: ", error.response);                            

              // setIsUploadingData(false);

              handleCloseBackdrop();

              let variant = "error";
              enqueueSnackbar('Unable to Verify Admin.', { variant });
          }
      )
  }
    

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Accounts</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">Accounts</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="card-body">
        <div className="row">
          {/* <div className="col-md-12 col-lg-6"> */}
          <Table responsive>
            <thead>
              <tr>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Username
                  </div>
                </th>
                <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Email
                  </div>
                </th>
                {/* <th className={classes.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Verify
                  </div>
                </th> */}
              </tr>
            </thead>
            {admins.map((i, index) => (
              <tbody>
                <tr>
                  <td className={classes.collectionTitle}>{i.username}</td>
                  <td className={classes.collectionTitle}>{i.email}</td>
                  
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
      {/* </div> */}
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={adminCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Accounts;