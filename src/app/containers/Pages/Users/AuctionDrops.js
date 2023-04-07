import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import OnAuctionDropCard from "../../../components/Cards/OnAuctionDropCard";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MessageCard from "../../../components/MessageCards.js/MessageCard";

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

function AuctionDrops() {
  const classes = useStyles();
  const [tokenList, setTokenList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(12);
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
    axios.get(`/drop/drops/${start}/${end}`).then(
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
        handleCloseBackdrop();
      }
    );
  };
  useEffect(() => {
    getMyDrops(0, rowsPerPage);
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
    <>
      <div className="main-wrapper">
        <div className="home-section home-full-height">
          <HeaderHome selectedNav={"Drops"} role={null} />
          <div className="card-body">
            <div
              className="form-group"
              style={{ minHeight: "500px", marginTop: "120px" }}
            >
              {open ? (
                <div align="center" className="text-center">
                  <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#ff0000" }}
                  />
                  <span style={{ color: "#ff0000" }} className="sr-only">
                    Loading...
                  </span>
                </div>
              ) : tokenList.length === 0 ? (
                <MessageCard msg="No items to display" />
              ) : (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="flex-start"
                >
                  {tokenList.map((i, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Link to={"/auctionDrops/DropCubes/" + i._id}>
                        <OnAuctionDropCard dropDetails={i} classes={classes} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </div>
          <TablePagination
            rowsPerPageOptions={[12, 24, 48]}
            component="div"
            count={totalDrops}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        <Footer position={"relative"} />
      </div>
    </>
  );
}

export default AuctionDrops;
