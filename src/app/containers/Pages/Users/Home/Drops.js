import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import OnAuctionDropCard from "../../../../components/Cards/OnAuctionDropCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";

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

function Drops() {
  const [tokenList, setTokenList] = useState([]);
  const [rowsPerPage] = useState(4);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  let getMyDrops = (start, end) => {
    setOpen(true);
    axios.get(`/drop/drops/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.Dropdata);
        setOpen(false);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setOpen(false);
      }
    );
  };
  useEffect(() => {
    getMyDrops(0, rowsPerPage);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
          <div className="card-body">
            <h3>
              <pre>
                Drops
                <Link
                  to="/auctionDrops"
                  style={{ float: "right", color: "#ff0000" }}
                >
                  View All{" "}
                </Link>
              </pre>
            </h3>
            <hr></hr>
            <div className="form-group">
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
        </div>
      </div>
    </>
  );
}

export default Drops;
