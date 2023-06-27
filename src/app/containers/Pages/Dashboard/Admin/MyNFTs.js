import {
  Grid,
  TablePagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNFTsPaginated } from "../../../../components/API/AxiosInterceptor";
import NFTCard from "../../../../components/Cards/NFTCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
const useStyles = {
  root: {
    borderRadius: 12,
    border: 0,
    color: "#04111D",
    padding: "0 30px",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  label: {
    textTransform: "capitalize",
  },
  body2: {
    fontWeight: "bold",
    fontFamily: "poppins",
  },
};

const makeTheme = createTheme({
  overrides: {
    MuiTablePagination: {
      caption: {
        fontWeight: "bold",
        color: "#fff",
      },
      base: {
        border: 0,
        color: "#fff",
        padding: "0 30px",
        fontWeight: "bold",
        fontFamily: "orbitron",
      },
      label: {
        textTransform: "capitalize",
        color: "#fff",
      },
      input: {
        fontWeight: "bold",
        color: "#fff",
      },
      body2: {
        fontWeight: "bold",
        color: "#fff",
        fontFamily: "orbitron",
      },
      selectIcon: {
        color: "#fff",
      },
    },
  },
});

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [, setVersionB] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyNFTs = (start, end) => {
    handleShowBackdrop();
    let marketplaceId = props.marketplaceId;

    getMyNFTsPaginated(start, end, marketplaceId)
      .then((response) => {
        console.log("Response from getting my nfts: ", response);
        let newState = response.data.NFTdata.map((obj) => {
          return { ...obj, isPlaying: false };
        });
        setTokenList(newState);
        setTotalNfts(response?.data?.NFTdata.length);
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("Error from getting my nfts: ", error);
        setSnackbarMessage("Error Fetching NFTs");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        handleCloseBackdrop();
      });
  };

  useEffect(() => {
    getMyNFTs(0, rowsPerPage);
  }, []);

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "active",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="backgroundDefault position-relative">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My NFTs</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">NFTs</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className={`card-body px-0 ${!tokenList.length && "page-height"}`}>
        <div className="form-group">
          {open ? (
            <div className="row no-gutters justify-content-center align-items-center">
              <div className="col-12">
                <WhiteSpinner />
              </div>
            </div>
          ) : tokenList.length === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid container spacing={2} direction="row" justify="flex-start">
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={4} lg={3} xl={2} key={index}>
                  <NFTCard data={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <ThemeProvider theme={makeTheme}>
        <div className="row no-gutters justify-content-center paginationBg">
          <TablePagination
            rowsPerPageOptions={[4, 8, 12, 24]}
            component="div"
            count={totalNfts}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={"Items per page"}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              root: useStyles.root,
              label: useStyles.label,
              body2: useStyles.body2,
            }}
          />
        </div>
      </ThemeProvider>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default MyNFTs;
