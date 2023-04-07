import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyDropsCard from "../../../../components/Cards/MyDropsCard";
import MessageCard from "../../../../components/MessageCards.js/MessageCard";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
}));

function MyDrops(props) {
  const classes = useStyles();
  const [tokenList, setTokenList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDrops, setTotalDrops] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyDrops = (start, end) => {
    handleShowBackdrop();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    axios.get(`/drop/mydrops/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.Dropdata);
        setTotalDrops(response.data.Dropscount);
        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
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
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
    getMyDrops(0, rowsPerPage);

    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myCubes: "",
      myDrops: "active",
      mySeason: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyDrops(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyDrops(0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">My Drops</li>
      </ul>
      <div className="card-body">
        <div className="form-group">
          {open ? (
            <div align="center" className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#ff0000" }}
              ></Spinner>
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : tokenList.length === 0 ? (
            <MessageCard msg="No items to displayt" />
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
            >
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Link to={"myDrops/cubes/" + i._id}>
                    <MyDropsCard dropDetails={i} classes={classes} />
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
        count={totalDrops}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default MyDrops;
