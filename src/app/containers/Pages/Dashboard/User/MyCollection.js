import { Card, CardActionArea, CardContent, CardMedia, Grid, TablePagination, Typography } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createCollection, getMyCollectionsPaginated } from "../../../../components/API/AxiosInterceptor";
import { defaultProfile } from '../../../../components/ImageURLs/URLs';
import MessageCard from "../../../../components/MessageCards/MessageCard";
import CreateNewCollectionModal from "../../../../components/Modals/CreateNewCollectionModal";
import NotificationSnackbar from '../../../../components/Snackbar/NotificationSnackbar';
const styles = {
  root: {
    minWidth: 250,
  },
  cardHeight: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
}

function MyCollection(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const [collections, setCollections] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const [collectionCount, setCollectionCount] = useState(0);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const handleCloseCollectionModal = () => {
    setOpenCollectionModal(false);
  };
  const handleShowCollectionModal = () => {
    setOpenCollectionModal(true);
  };

  let getCollections = (start, end) => {
    setOpen(true);
    getMyCollectionsPaginated(start, end)
      .then((response) => {
        console.log("response.data", response.data);
        setCollections(response.data.Collectiondata);
        setCollectionCount(response.data.CollectionCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response !== undefined && error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload(false);
          }
        }
        setOpen(false);
      });
  };

  let createCollections = (collectionTitle, collectionImage) => {
    setIsCreating(true);
    if (
      collectionTitle === "" ||
      collectionTitle === null ||
      collectionTitle === undefined
    ) {
      setIsCreating(false);
      let variant = "error";
      setSnackbarMessage("Collection Title cannot be empty.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      collectionImage === "" ||
      collectionImage === null ||
      collectionImage === undefined ||
      collectionImage === defaultProfile
    ) {
      setIsCreating(false);
      let variant = "error";
      setSnackbarMessage("Please Select Collection Image.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      let CollectionData = {
        collectiontitle: collectionTitle,
        artwork: collectionImage,
      };
      createCollection(CollectionData)
        .then((response) => {
          setIsCreating(false);
          console.log("response.data", response);
          let variant = "success";
          setSnackbarMessage("Collection Created Successfully.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          getCollections(0, rowsPerPage);
          handleCloseCollectionModal();
        })
        .catch((error) => {
          console.log(error.response);
          setIsCreating(false);
          let variant = "error";
          setSnackbarMessage("Unable to Create Collection.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        });
    }
  };
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
    getCollections(0, rowsPerPage);
    props.setActiveTab({
      dashboard: "",
      totalUserAccount: "",
      pendingUserAccount: "",
      newCube: "",
      myNFTs: "",
      newCollection: "active",
      mySeason: "",
      tradeListOrders: "",
      myDrops: "",
      myCubes: "",
      referralEarnings: "",
      disputedOrders: "",
      resolvedDisputedOrders: "",
      settings: "",
      changePassword: "",
      newRandomDrop: "",
    });
  }, []);
  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Collections</li>
      </ul>
      <div className="container">
        <button
          type="button"
          onClick={() => handleShowCollectionModal()}
          className="btn float-right submit-btn"
        >
          Create New Collection
        </button>
      </div>
      <div className="card-body">
        <div sx={styles.root}>
          {open ? (
            <div align="center" className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#ff0000" }}
              >
                {" "}
              </Spinner>
            </div>
          ) : collections.length === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid container spacing={2} direction="row" justify="flex-start">
              {collections.map((i, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Link to={"/dashboard/collection/nfts/" + i._id}>
                    <Card
                      style={{ height: "100%" }}
                      variant="outlined"
                      sx={styles.cardHeight}
                    >
                      <CardActionArea>
                        <CardMedia
                          sx={styles.media}
                          image={i.artwork}
                          title="Collection Image"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            className="text-center"
                            component="h2"
                          >
                            {i.collectiontitle}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
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
      <CreateNewCollectionModal
        show={openCollectionModal}
        handleClose={handleCloseCollectionModal}
        createCollections={createCollections}
        isCreating={isCreating}
      ></CreateNewCollectionModal>
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
    </div>
  );
}

export default MyCollection;
