import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDropsPaginated } from "../../../../components/API/AxiosInterceptor";
import OnAuctionDropCard from "../../../../components/Cards/OnAuctionDropCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
function Drops() {
  const [tokenList, setTokenList] = useState([]);
  const [rowsPerPage] = useState(4);
  const [open, setOpen] = useState(false);
  let getMyDrops = (start, end) => {
    setOpen(true);
    getDropsPaginated(start, end)
      .then((response) => {
        console.log("response", response);
        setTokenList(response.data.Dropdata);
        setOpen(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setOpen(false);
      });
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
                  <WhiteSpinner />
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
