import {
  Card,
  Grid,
  TablePagination,
  Typography
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyCollectionsCard from "../../../../components/Cards/MyCollectionsCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    backgroundColor: "black"
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
  cardHeight: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
});

function MyCollection(props) {
  
  const { enqueueSnackbar } = useSnackbar();
  let [collections, setCollections] = useState([]); 
  let [collection, setCollection] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); 
  let [isCreating, setIsCreating] = useState(false);
  let [open, setOpen] = useState(false);

  let [collectionCount, setCollectionCount] = useState(0);
  let [versionB, setVersionB] = useState("");

  const classes = useStyles();
  let getCollections = (start, end) => {
    const version = Cookies.get("Version");
    //console.log("version", version);


    setOpen(true);
    const url = `/collection/myCollections/${start}/${end}`;
    axios
      .get(url)
      .then((response) => {
       // console.log("response.data", response.data);
        setCollections(response.data.collectionData);
        setCollectionCount(response.data.collectionCount);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data !== undefined) {
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

   // console.log("Entered in my collection tab");
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

      <div className="card-body page-height">
        <div className={classes.root}>
          {open ? (
            <div align="center" className="text-center">
              <WhiteSpinner />
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : collections.length === 0 ? (
            <Card
              variant="outlined"
              style={{
                padding: "40px",
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "black"
              }}
            >
              <Typography
                variant="body2"
                className="text-center"
                component="p"
                style={{ color: "#fff" }}
              >
                <strong>No items to display </strong>
              </Typography>
            </Card>
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default MyCollection;
