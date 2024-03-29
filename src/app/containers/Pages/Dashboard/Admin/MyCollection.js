import { Grid, TablePagination } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyCollectionsPaginatedMarketPlace } from "../../../../components/API/AxiosInterceptor";
import MyCollectionsCard from "../../../../components/Cards/MyCollectionsCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

const useStyles = {
  root: {
    minWidth: 250,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeight: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
};

function MyCollection(props) {
  const [collections, setCollections] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const [collectionCount, setCollectionCount] = useState(0);
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

  let getCollections = (start, end) => {
    setOpen(true);
    let marketplaceId = props.marketplaceId;
    getMyCollectionsPaginatedMarketPlace(start, end, marketplaceId)
      .then((response) => {
        console.log("Response from getting collections: ", response);
        setCollections(response?.data?.collectionData);
        setCollectionCount(response?.data?.collectionCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error from getting collection: ", error);
        setSnackbarMessage("Error Fetching Collections");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setOpen(false);
      });
  };
  useEffect(() => {
    getCollections(0, rowsPerPage);
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getCollections(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getCollections(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "active",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Collections</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Collections</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className="card-body page-height">
        <div sx={useStyles.root}>
          {open ? (
            <div align="center" className="text-center">
              <WhiteSpinner />
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : collections.length === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid container spacing={2} direction="row" justify="flex-start">
              {collections.map((i, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  direction="row"
                  key={index}
                >
                  <Link to={"/dashboard/collection/nfts/" + i._id}>
                    <MyCollectionsCard i={i} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={collectionCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default MyCollection;
