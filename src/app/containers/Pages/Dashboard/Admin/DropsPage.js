import { Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropsPageCard from "../../../../components/Cards/DropsPageCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { getMyDrop, reset } from "../../../../redux/getMyDropsSlice";
const styles = {
  root: {},
  media: {
    height: 0,
    paddingTop: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const cardStyles = {
  cardTheme: {
    boxShadow: "none",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: "0rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    fontSize: "1rem",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    fontWeight: "bold",
  },
};

function DropsPage(props) {
  const [tokenList, setTokenList] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDrops, setTotalDrops] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const { myDropsData, loading } = useSelector((store) => store.getMyDrops);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyDrops = async (status, start, end) => {
    handleShowBackdrop();
    dispatch(getMyDrop({ status, start, end, setTokenList, setTotalDrops }));
    if (loading === 1) {
      handleCloseBackdrop();
    }
    if (loading === 2) {
      handleCloseBackdrop();
    }
  };


  useEffect(() => {
    getMyDrops(props.status, 0, rowsPerPage);
  }, [loading]);

  // useEffect(() => {
  //   dispatch(reset())
  // }, [props.status])
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyDrops(
      props.status,
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyDrops(props.status, 0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="card-body" style={{}}>
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
          ) : totalDrops === 0 ? (
            <MessageCard msg="No items to display" />
          ) : (
            <Grid
              container
              direction="row"
              spacing={3}
              justifyContent="flex-start"
            >
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  {props.status === "draft" ? (
                    <Link
                      to={`/dashboard/newDrop/addNft`}
                      state={{
                        dropId: i._id,
                        saleType: i.saleType,
                        startTime: i.startTime,
                        endTime: i.endTime,
                        nftType: i.dropType,
                      }}
                    >
                      <DropsPageCard
                        dropDetails={i}
                        classes={styles}
                        cardClasses={cardStyles}
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/dashboard/myDrops/nfts`}
                      state={{
                        nftId: i.NFTIds,
                        dropId: i._id,
                        saleType: i.saleType,
                        status: i.status,
                      }}
                    >
                      <DropsPageCard
                        dropDetails={i}
                        classes={styles}
                        cardClasses={cardStyles}
                      />
                    </Link>
                  )}
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

export default DropsPage;
